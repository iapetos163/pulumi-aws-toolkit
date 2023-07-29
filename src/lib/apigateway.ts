import { cloudwatch } from '@pulumi/aws';
import { Api, ApiMapping, Stage } from '@pulumi/aws/apigatewayv2';
import type { ComponentResourceOptions } from '@pulumi/pulumi';

const CLF_LOG_FORMAT =
  '$context.identity.sourceIp - - [$context.requestTime] "$context.httpMethod $context.routeKey $context.protocol" $context.status $context.responseLength $context.requestId';

export interface HttpApiArgs {
  /**
   * Domain name for the API
   * @default AWS-assigned domain
   */
  readonly domainName?: string;
}

/**
 * HTTP API Gateway with a single stage and CloudWatch logs
 */
export class HttpApi extends Api {
  constructor(
    name: string,
    args: HttpApiArgs = {},
    opts?: ComponentResourceOptions,
  ) {
    const { domainName } = args;

    super(name, { protocolType: 'HTTP' }, opts);

    const logGroup = new cloudwatch.LogGroup(
      `${name}-logs`,
      {},
      { parent: this },
    );

    const stage = new Stage(
      `${name}-stage`,
      {
        apiId: this.id,
        autoDeploy: true,
        name: '$default',
        accessLogSettings: {
          destinationArn: logGroup.arn,
          format: CLF_LOG_FORMAT,
        },
      },
      { parent: this },
    );

    if (domainName) {
      new ApiMapping(
        `${name}-mapping`,
        {
          apiId: this.id,
          domainName,
          stage: stage.name,
        },
        { parent: this },
      );
    }
  }
}
