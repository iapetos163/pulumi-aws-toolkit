import type { Secret as EcsSecret } from '@pulumi/aws/ecs';
import type { PolicyStatement } from '@pulumi/aws/iam';
import {
  getSecretOutput,
  GetSecretResult,
  Secret,
} from '@pulumi/aws/secretsmanager';
import { all, Input, interpolate, output, Output } from '@pulumi/pulumi';

export type SecretsMap = {
  [variable: string]: ContainerSecret;
};

export class ContainerSecret {
  private readonly secretName: Output<string>;
  private readonly jsonKey: string | undefined;
  public readonly secretOutput: Output<GetSecretResult | Secret>;

  constructor(
    secret: Input<string | Secret | GetSecretResult>,
    jsonKey?: string,
  ) {
    this.secretName = output(secret).apply((s) =>
      typeof s === 'string' ? output(s) : output(s.name),
    );
    this.jsonKey = jsonKey;
    this.secretOutput = output(secret).apply((s) =>
      typeof s === 'string' ? getSecretOutput({ name: s }) : output(s),
    );
  }

  public get arn() {
    if (typeof this.jsonKey === 'string') {
      return interpolate`${this.secretOutput.arn}:${this.jsonKey}::`;
    }
    return this.secretOutput.arn;
  }

  /**
   * Pipe of AWS cli and JQ commands that outputs the secret value
   */
  public get getValueCommand() {
    const getSecret = interpolate`aws secretsmanager get-secret-value --region us-west-2 --secret-id '${this.secretName}'`;
    const jqGetFullSecret = 'jq -r .SecretString';
    const jqGetKey = `jq -r '.${this.jsonKey}'`;
    return interpolate`${getSecret} | ${jqGetFullSecret}${
      this.jsonKey ? ` | ${jqGetKey}` : ''
    }`;
  }

  public get accessStatement(): PolicyStatement {
    return secretValueAccess(this.secretOutput);
  }
}

type SecretEntry = { name: string; secret: ContainerSecret };

export class ContainerSecretSet {
  private readonly secretEntries: SecretEntry[];

  constructor(secrets: SecretsMap = {}) {
    this.secretEntries = Object.entries(secrets).map(([name, secret]) => ({
      name,
      secret,
    }));
  }

  public addSecret(variable: string, secret: ContainerSecret) {
    this.secretEntries.push({ name: variable, secret });
  }

  public get containerSecretsDefinition() {
    return this.secretEntries.map(
      ({ name, secret }): EcsSecret => ({
        name,
        valueFrom: secret.arn,
      }),
    );
  }

  public get accessStatement(): PolicyStatement {
    return secretValueAccess(
      ...this.secretEntries.map(({ secret }) => secret.secretOutput),
    );
  }
}

export const secretValueAccess = (
  ...secrets: Input<Secret | GetSecretResult>[]
): PolicyStatement => ({
  Effect: 'Allow',
  Resource: all(secrets).apply((secrets) => secrets.map((s) => s.arn)),
  Action: ['secretsmanager:DescribeSecret', 'secretsmanager:GetSecretValue'],
});
