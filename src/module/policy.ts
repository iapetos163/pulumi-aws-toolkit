import type { PolicyStatement, PolicyDocument } from '@pulumi/aws/iam';
import { Input, jsonStringify, output } from '@pulumi/pulumi';

export const makePolicyDocument = (
  statements: Input<Input<PolicyStatement>[]>,
) => {
  const policy: PolicyDocument = {
    Version: '2012-10-17',
    Statement: output(statements),
  };
  return jsonStringify(policy);
};

/**
 * @param services Service slug, without .amazonaws.com
 */
export const makeAssumeRolePolicy = (services: string[]) => {
  const policy: PolicyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: {
          Service: services.map((svc) => `${svc}.amazonaws.com`),
        },
        Action: ['sts:AssumeRole'],
      },
    ],
  };
  return jsonStringify(policy);
};
