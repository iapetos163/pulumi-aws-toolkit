import type { GetRepositoryResult, Repository } from '@pulumi/aws/ecr';
import type { PolicyStatement } from '@pulumi/aws/iam';
import { Input, output } from '@pulumi/pulumi';

/**
 * Get IAM policy statements that grant permission
 * to pull images from the given repository.
 *
 * @example ```
 * import { TaskDefinition } from '@pulumi/aws/ecs';
 * import { Repository } from '@pulumi/aws/ecr';
 * import { Role } from '@pulumi/aws/iam';
 * import { policyDocument, assumeRolePolicyDocument } from 'pulumi-aws-toolkit/iam';
 *
 * const repo = new Repository('task-image-repo');
 * const taskExecutionRole = new Role(`task-exec-role`, {
 *   assumeRolePolicy: assumeRolePolicyDocument({ services: ['ecs-tasks'] }),
 *   inlinePolicies: [
 *     {
 *       name: 'ExecPolicy',
 *       policy: policyDocument(ecrPullAccessStatements(repo)),
 *     },
 *   ],
 * });
 *
 * new TaskDefinition('my-task-definition', {
 *   family: 'my-task',
 *   requiresCompatibilities: ['FARGATE'],
 *   networkMode: 'awsvpc',
 *   cpu: '512',
 *   memory: '1024',
 *   containerDefinitions: fargateContainerDefinitions([
 *TODO
 *   ]),
 *   executionRoleArn: taskExecutionRole.arn,
 * });
 * ```
 */
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
