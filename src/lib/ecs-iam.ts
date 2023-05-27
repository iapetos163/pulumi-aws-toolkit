import type { GetTaskDefinitionResult, TaskDefinition } from '@pulumi/aws/ecs';
import type { GetRoleResult, PolicyStatement, Role } from '@pulumi/aws/iam';
import { Input, all, output } from '@pulumi/pulumi';

export interface RunEcsTaskArgs {
  readonly executionRoleOverride?: Input<Role | GetRoleResult>;
  readonly taskRoleOverride?: Input<Role | GetRoleResult>;
}

export const runEcsTaskAccessStatements = (
  taskDef: Input<TaskDefinition | GetTaskDefinitionResult>,
  args: RunEcsTaskArgs = {},
) => {
  return output(taskDef).apply((taskDef) => {
    const statements: PolicyStatement[] = [
      {
        Effect: 'Allow',
        Action: 'ecs:RunTask',
        Resource: taskDef.arn,
      },
    ];

    const { executionRoleOverride, taskRoleOverride } = args;

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
  });
};
