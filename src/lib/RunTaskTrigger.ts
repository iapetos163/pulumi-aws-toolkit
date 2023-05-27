import {
  EventTarget,
  EventRule,
  EventTargetArgs,
} from '@pulumi/aws/cloudwatch';
import type { TaskDefinition } from '@pulumi/aws/ecs';
import { Role } from '@pulumi/aws/iam';
import { ComponentResource, Input, jsonStringify } from '@pulumi/pulumi';
import { runTaskAccess } from '../lib/ecs';
import { makeAssumeRolePolicy, makePolicyDocument } from '../lib/policy';
import declareVpc from '../module/aws-vpc';
import declareCluster from '../module/ecs-cluster';

export interface RunTaskTriggerProps {
  readonly rule: EventRule;
  readonly taskDefinition: TaskDefinition;
  readonly containerOverrides?: Input<object>[];
  readonly taskRole?: Role;
  readonly taskExecutionRole?: Role;
}

class RunTaskTrigger extends ComponentResource {
  constructor(name: string, props: RunTaskTriggerProps) {
    super('pkg:index:RunTaskTrigger', name);

    const cluster = declareCluster();

    const {
      rule,
      taskDefinition,
      containerOverrides,
      taskRole,
      taskExecutionRole,
    } = props;

    const role = new Role(`${name}-role`, {
      assumeRolePolicy: makeAssumeRolePolicy(['events']),
      inlinePolicies: [
        {
          name: 'RunTask',
          policy: makePolicyDocument(
            runTaskAccess(taskDefinition, {
              executionRoleOverride: taskExecutionRole,
              taskRoleOverride: taskRole,
            }),
          ),
        },
      ],
    });
    declareVpc().then(({ publicSubnets }) => {
      const eventTargetProps: EventTargetArgs = {
        arn: cluster.arn,
        rule: rule.name,
        roleArn: role.arn,
        ecsTarget: {
          taskDefinitionArn: taskDefinition.arn,
          networkConfiguration: {
            subnets: publicSubnets.ids,
            assignPublicIp: true,
          },
          launchType: 'FARGATE',
        },
      };

      const input: any = {};
      if (containerOverrides) {
        input.containerOverrides = containerOverrides;
      }
      if (taskRole) {
        input.taskRoleArn = taskRole.arn;
      }
      if (taskExecutionRole) {
        input.executionRoleArn = taskExecutionRole.arn;
      }

      if (Object.keys(input).length > 0) {
        eventTargetProps.input = jsonStringify(input);
      }

      new EventTarget(`${name}-target`, eventTargetProps);
    });
  }
}

export default RunTaskTrigger;
