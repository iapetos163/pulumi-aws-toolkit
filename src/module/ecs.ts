import type { ContainerDefinition } from '@pulumi/aws/ecs';
import { Input, jsonStringify, output } from '@pulumi/pulumi';

export type { RunEcsTaskTriggerArgs } from '../lib/cloudwatch-ecs';
export type { RunEcsTaskArgs } from '../lib/ecs-iam';

export { RunEcsTaskTrigger } from '../lib/cloudwatch-ecs';
export { ecrPullAccessStatements } from '../lib/ecr';
export { runEcsTaskAccessStatements } from '../lib/ecs-iam';

const containerDefinitionBase = {
  cpu: 0,
  mountPoints: [],
  portMappings: [],
  user: '0',
  volumesFrom: [],
  environment: [],
};

/**
 * Get formatted container definitions for a Fargate task.
 */
export const fargateContainerDefinitions = (
  definitions: Input<ContainerDefinition>[],
) =>
  jsonStringify(
    definitions.map((defInput) =>
      output(defInput).apply((definition) => ({
        ...containerDefinitionBase,
        definition,
      })),
    ),
  );
