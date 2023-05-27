[pulumi-aws-toolkit](../README.md) / [Modules](../modules.md) / ecs

# Module: ecs

## Table of contents

### References

- [ecrPullAccessStatements](ecs.md#ecrpullaccessstatements)

### Classes

- [RunEcsTaskTrigger](../classes/ecs.RunEcsTaskTrigger.md)

### Interfaces

- [RunEcsTaskArgs](../interfaces/ecs.RunEcsTaskArgs.md)
- [RunEcsTaskTriggerArgs](../interfaces/ecs.RunEcsTaskTriggerArgs.md)

### Functions

- [fargateContainerDefinitions](ecs.md#fargatecontainerdefinitions)
- [runEcsTaskAccessStatements](ecs.md#runecstaskaccessstatements)

## References

### ecrPullAccessStatements

Re-exports [ecrPullAccessStatements](ecr.md#ecrpullaccessstatements)

## Functions

### fargateContainerDefinitions

▸ **fargateContainerDefinitions**(`definitions`): `Output`<`string`\>

Get formatted container definitions for a Fargate task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `definitions` | `Input`<`ContainerDefinition`\>[] |

#### Returns

`Output`<`string`\>

#### Defined in

[src/module/ecs.ts:23](https://github.com/iapetos163/pulumi-aws-toolkit/blob/f4261c5/src/module/ecs.ts#L23)

___

### runEcsTaskAccessStatements

▸ **runEcsTaskAccessStatements**(`taskDef`, `args?`): `Output`<`PolicyStatement`[]\>

Get IAM policy statements that grant permission to run a task
from the given task definition

#### Parameters

| Name | Type |
| :------ | :------ |
| `taskDef` | `Input`<`GetTaskDefinitionResult` \| `TaskDefinition`\> |
| `args` | [`RunEcsTaskArgs`](../interfaces/ecs.RunEcsTaskArgs.md) |

#### Returns

`Output`<`PolicyStatement`[]\>

#### Defined in

[src/lib/ecs-iam.ts:22](https://github.com/iapetos163/pulumi-aws-toolkit/blob/f4261c5/src/lib/ecs-iam.ts#L22)
