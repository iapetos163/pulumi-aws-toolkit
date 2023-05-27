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
  readonly cluster: Input<Cluster | GetClusterResult>;
  readonly networkConfiguration: Input<input.cloudwatch.EventTargetEcsTargetNetworkConfiguration>;
  readonly rule: Input<cloudwatch.EventRule>;
  readonly taskDefinition: Input<TaskDefinition | GetTaskDefinitionResult>;
  readonly containerOverrides?: Input<Input<object>[]>;
  readonly taskRole?: Input<Role | GetRoleResult>;
  readonly taskExecutionRole?: Input<Role | GetRoleResult>;
}

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
        taskDefinitionArn: output(taskDefinition).arn,
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
