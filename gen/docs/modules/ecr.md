[pulumi-aws-toolkit](../README.md) / [Modules](../modules.md) / ecr

# Module: ecr

## Table of contents

### Functions

- [ecrPullAccessStatements](ecr.md#ecrpullaccessstatements)

## Functions

### ecrPullAccessStatements

▸ **ecrPullAccessStatements**(`repository`): `PolicyStatement`[]

Get IAM policy statements that grant permission
to pull images from the given repository.
Useful to add to ECS task execution policies.

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository` | `Input`<`GetRepositoryResult` \| `Repository`\> |

#### Returns

`PolicyStatement`[]

#### Defined in

[src/lib/ecr.ts:10](https://github.com/iapetos163/pulumi-aws-toolkit/blob/f4261c5/src/lib/ecr.ts#L10)
