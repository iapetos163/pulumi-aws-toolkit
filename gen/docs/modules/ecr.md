[pulumi-aws-toolkit](../README.md) / [Exports](../modules.md) / ecr

# Module: ecr

## Table of contents

### Functions

- [ecrPullAccessStatements](ecr.md#ecrpullaccessstatements)

## Functions

### ecrPullAccessStatements

▸ **ecrPullAccessStatements**(`repository`): `PolicyStatement`[]

Get IAM policy statements that grant permission
to pull images from the given repository.

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository` | `Input`<`GetRepositoryResult` \| `Repository`\> |

#### Returns

`PolicyStatement`[]

#### Defined in

[src/lib/ecr.ts:9](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/ecr.ts#L9)
