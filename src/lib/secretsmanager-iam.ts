import type { PolicyStatement } from '@pulumi/aws/iam';
import type { GetSecretResult, Secret } from '@pulumi/aws/secretsmanager';
import { Input, all } from '@pulumi/pulumi';

/**
 * Policy statement that grants access
 * to get the values of the provided secrets
 */
export const secretValueReadAccessStatement = (
  ...secrets: Input<Secret | GetSecretResult>[]
): PolicyStatement => ({
  Effect: 'Allow',
  Resource: all(secrets).apply((secrets) => secrets.map((s) => s.arn)),
  Action: ['secretsmanager:DescribeSecret', 'secretsmanager:GetSecretValue'],
});
