import { getRepositoryOutput } from '@pulumi/aws/ecr';
import type { PolicyStatement } from '@pulumi/aws/iam';

export const ecrPullAccess = (repoName: string): PolicyStatement[] => [
  {
    Effect: 'Allow',
    Action: [
      'ecr:BatchCheckLayerAvailability',
      'ecr:BatchGetImage',
      'ecr:GetDownloadUrlForLayer',
    ],
    Resource: getRepositoryOutput({ name: repoName }).arn,
  },
  {
    Effect: 'Allow',
    Action: 'ecr:GetAuthorizationToken',
    Resource: '*',
  },
];
