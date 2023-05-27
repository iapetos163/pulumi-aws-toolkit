import type { TaskDefinition } from '@pulumi/aws/ecs';
import type { PolicyStatement, Role } from '@pulumi/aws/iam';
import { Input, all, output } from '@pulumi/pulumi';

export const containerDefinitionBase = {
  cpu: 0,
  mountPoints: [],
  portMappings: [],
  user: '0',
  volumesFrom: [],
};

export interface RunTaskAccessOptions {
  executionRoleOverride?: Input<Role>;
  taskRoleOverride?: Input<Role>;
}

export const runTaskAccess = (
  taskDef: TaskDefinition,
  options: RunTaskAccessOptions = {},
) => {
  const statements: PolicyStatement[] = [
    {
      Effect: 'Allow',
      Action: 'ecs:RunTask',
      Resource: taskDef.arn,
    },
  ];

  const { executionRoleOverride, taskRoleOverride } = options;

  return all([
    output(executionRoleOverride).apply((r) => r?.arn),
    output(taskRoleOverride).apply((r) => r?.arn),
    taskDef.executionRoleArn,
    taskDef.taskRoleArn,
  ]).apply((roleArns): PolicyStatement[] => {
    const allRoleArns = roleArns.filter((r): r is string => !!r);

    if (allRoleArns.length === 0) {
      return statements;
    }

    return [
      ...statements,
      {
        Effect: 'Allow',
        Action: 'iam:PassRole',
        Resource: allRoleArns,
      },
    ];
  });
};
