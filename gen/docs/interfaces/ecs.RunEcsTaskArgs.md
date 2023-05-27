[pulumi-aws-toolkit](../README.md) / [Exports](../modules.md) / [ecs](../modules/ecs.md) / RunEcsTaskArgs

# Interface: RunEcsTaskArgs

[ecs](../modules/ecs.md).RunEcsTaskArgs

## Table of contents

### Properties

- [executionRoleOverride](ecs.RunEcsTaskArgs.md#executionroleoverride)
- [taskRoleOverride](ecs.RunEcsTaskArgs.md#taskroleoverride)

## Properties

### executionRoleOverride

• `Optional` `Readonly` **executionRoleOverride**: `Input`<`Role` \| `GetRoleResult`\>

Execution role with which the task will be run.
Only required if different from the task definition's execution role.

#### Defined in

[src/lib/ecs-iam.ts:10](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/ecs-iam.ts#L10)

___

### taskRoleOverride

• `Optional` `Readonly` **taskRoleOverride**: `Input`<`Role` \| `GetRoleResult`\>

Role with which the task will be run.
Only required if different from the task definition's task role.

#### Defined in

[src/lib/ecs-iam.ts:15](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/ecs-iam.ts#L15)
