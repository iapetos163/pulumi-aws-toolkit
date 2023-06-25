import { cloudwatch } from '@pulumi/aws';
import type {
  Cluster,
  GetClusterResult,
  GetTaskDefinitionResult,
  TaskDefinition,
} from '@pulumi/aws/ecs';
import { GetRoleResult, Role } from '@pulumi/aws/iam';
import type * as input from '@pulumi/aws/types/input';
import {
  ComponentResource,
  Input,
  jsonStringify,
  output,
} from '@pulumi/pulumi';
import { runEcsTaskAccessStatements } from './ecs-iam';
import { assumeRolePolicyDocument, policyDocument } from './policy';

export interface RunEcsTaskTriggerArgs {
  /**
   * Cluster in which the task should run
   */
  readonly cluster: Input<Cluster | GetClusterResult>;
  /**
   * VPC network configuration for the task
   */
  readonly networkConfiguration: Input<input.cloudwatch.EventTargetEcsTargetNetworkConfiguration>;
  /**
   * The EventBridge rule to trigger running the ECS task
   */
  readonly rule: Input<cloudwatch.EventRule>;
  /**
   * ECS task definition
   */
  readonly taskDefinition: Input<TaskDefinition | GetTaskDefinitionResult>;
  /**
   * Overrides for the task definition's containers
   * @see https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_ContainerOverride.html
   * @example
   * ```
   * [
   *   {
   *     name: 'containername',
   *     environment: [{ name: 'ADDITIONAL_ENV_VAR', value: 'something'}],
   *   }
   * ]
   * ```
   */
  readonly containerOverrides?: Input<Input<object>[]>;
  /**
   * Override the task definition's task role
   */
  readonly taskRole?: Input<Role | GetRoleResult>;
  /**
   * Override the task definition's task execution role
   */
  readonly taskExecutionRole?: Input<Role | GetRoleResult>;
}

/**
 * Set up an EventBridge target to run an ECS task
 * whenever the provided Event Rule is triggered
 */
export class RunEcsTaskTrigger extends ComponentResource {
  constructor(name: string, props: RunEcsTaskTriggerArgs) {
    super('pulumi-aws-toolkit:cloudwatch:RunEcsTaskTrigger', name);

    const {
      cluster,
      rule,
      taskDefinition,
      containerOverrides,
      networkConfiguration,
      taskRole,
      taskExecutionRole,
    } = props;

    const role = new Role(`${name}-role`, {
      assumeRolePolicy: assumeRolePolicyDocument({ services: ['events'] }),
      inlinePolicies: [
        {
          name: 'RunTask',
          policy: policyDocument(
            runEcsTaskAccessStatements(taskDefinition, {
              executionRoleOverride: taskExecutionRole,
              taskRoleOverride: taskRole,
            }),
          ),
        },
      ],
    });

    const eventTargetProps: cloudwatch.EventTargetArgs = {
      arn: output(cluster).arn,
      rule: output(rule).name,
      roleArn: role.arn,
      ecsTarget: {
        taskDefinitionArn: output(taskDefinition).arnWithoutRevision,
        networkConfiguration,
        launchType: 'FARGATE',
      },
    };

    const input: any = {};
    if (containerOverrides) {
      input.containerOverrides = containerOverrides;
    }
    if (taskRole) {
      input.taskRoleArn = output(taskRole).arn;
    }
    if (taskExecutionRole) {
      input.executionRoleArn = output(taskExecutionRole).arn;
    }

    if (Object.keys(input).length > 0) {
      eventTargetProps.input = jsonStringify(input);
    }

    new cloudwatch.EventTarget(`${name}-target`, eventTargetProps);
  }
}
