import type { GetRepositoryResult, Repository } from '@pulumi/aws/ecr';
import type { PolicyStatement } from '@pulumi/aws/iam';
import { Input, output } from '@pulumi/pulumi';

export const ecrPullAccessStatements = (
  repository: Input<Repository | GetRepositoryResult>,
): PolicyStatement[] => [
  {
    Effect: 'Allow',
    Action: [
      'ecr:BatchCheckLayerAvailability',
      'ecr:BatchGetImage',
      'ecr:GetDownloadUrlForLayer',
    ],
    Resource: output(repository).arn,
  },
  {
    Effect: 'Allow',
    Action: 'ecr:GetAuthorizationToken',
    Resource: '*',
  },
];
