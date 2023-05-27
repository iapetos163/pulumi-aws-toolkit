[pulumi-aws-toolkit](../README.md) / [Exports](../modules.md) / [ecs](../modules/ecs.md) / RunEcsTaskTriggerArgs

# Interface: RunEcsTaskTriggerArgs

[ecs](../modules/ecs.md).RunEcsTaskTriggerArgs

## Table of contents

### Properties

- [cluster](ecs.RunEcsTaskTriggerArgs.md#cluster)
- [containerOverrides](ecs.RunEcsTaskTriggerArgs.md#containeroverrides)
- [networkConfiguration](ecs.RunEcsTaskTriggerArgs.md#networkconfiguration)
- [rule](ecs.RunEcsTaskTriggerArgs.md#rule)
- [taskDefinition](ecs.RunEcsTaskTriggerArgs.md#taskdefinition)
- [taskExecutionRole](ecs.RunEcsTaskTriggerArgs.md#taskexecutionrole)
- [taskRole](ecs.RunEcsTaskTriggerArgs.md#taskrole)

## Properties

### cluster

• `Readonly` **cluster**: `Input`<`Cluster` \| `GetClusterResult`\>

Cluster in which the task should run

#### Defined in

[src/lib/cloudwatch-ecs.ts:23](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/cloudwatch-ecs.ts#L23)

___

### containerOverrides

• `Optional` `Readonly` **containerOverrides**: `Input`<`Input`<`object`\>[]\>

Overrides for the task definition's containers

**`See`**

https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_ContainerOverride.html

**`Example`**

```
[
  {
    name: 'containername',
    environment: [{ name: 'ADDITIONAL_ENV_VAR', value: 'something'}],
  }
]
```

#### Defined in

[src/lib/cloudwatch-ecs.ts:49](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/cloudwatch-ecs.ts#L49)

___

### networkConfiguration

• `Readonly` **networkConfiguration**: `Input`<`EventTargetEcsTargetNetworkConfiguration`\>

VPC network configuration for the task

#### Defined in

[src/lib/cloudwatch-ecs.ts:27](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/cloudwatch-ecs.ts#L27)

___

### rule

• `Readonly` **rule**: `Input`<`EventRule`\>

The EventBridge rule to trigger running the ECS task

#### Defined in

[src/lib/cloudwatch-ecs.ts:31](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/cloudwatch-ecs.ts#L31)

___

### taskDefinition

• `Readonly` **taskDefinition**: `Input`<`GetTaskDefinitionResult` \| `TaskDefinition`\>

ECS task definition

#### Defined in

[src/lib/cloudwatch-ecs.ts:35](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/cloudwatch-ecs.ts#L35)

___

### taskExecutionRole

• `Optional` `Readonly` **taskExecutionRole**: `Input`<`Role` \| `GetRoleResult`\>

Override the task definition's task execution role

#### Defined in

[src/lib/cloudwatch-ecs.ts:57](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/cloudwatch-ecs.ts#L57)

___

### taskRole

• `Optional` `Readonly` **taskRole**: `Input`<`Role` \| `GetRoleResult`\>

Override the task definition's task role

#### Defined in

[src/lib/cloudwatch-ecs.ts:53](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/cloudwatch-ecs.ts#L53)
