[pulumi-aws-toolkit](../README.md) / [Modules](../modules.md) / iam

# Module: iam

## Table of contents

### References

- [RunTaskArgs](iam.md#runtaskargs)
- [runEcsTaskAccessStatements](iam.md#runecstaskaccessstatements)

### Interfaces

- [AssumeRolePrincipals](../interfaces/iam.AssumeRolePrincipals.md)

### Functions

- [assumeRolePolicyDocument](iam.md#assumerolepolicydocument)
- [policyDocument](iam.md#policydocument)
- [s3ObjectReadAccessStatements](iam.md#s3objectreadaccessstatements)
- [s3ObjectReadWriteAccessStatements](iam.md#s3objectreadwriteaccessstatements)

## References

### RunTaskArgs

Renames and re-exports [RunEcsTaskArgs](../interfaces/ecs.RunEcsTaskArgs.md)

___

### runEcsTaskAccessStatements

Re-exports [runEcsTaskAccessStatements](ecs.md#runecstaskaccessstatements)

## Functions

### assumeRolePolicyDocument

▸ **assumeRolePolicyDocument**(`principals`): `Output`<`string`\>

Get a formatted Assume Role Policy (a.k.a. Trust Policy)
for an IAM Role

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `principals` | [`AssumeRolePrincipals`](../interfaces/iam.AssumeRolePrincipals.md) | The services, users, roles, or accounts allowed to assume the role |

#### Returns

`Output`<`string`\>

#### Defined in

[src/lib/policy.ts:48](https://github.com/iapetos163/pulumi-aws-toolkit/blob/f4261c5/src/lib/policy.ts#L48)

___

### policyDocument

▸ **policyDocument**(`statements`): `Output`<`string`\>

Get a formatted IAM policy document with the given statements

#### Parameters

| Name | Type |
| :------ | :------ |
| `statements` | `Input`<`Input`<`PolicyStatement`\>[]\> |

#### Returns

`Output`<`string`\>

#### Defined in

[src/lib/policy.ts:15](https://github.com/iapetos163/pulumi-aws-toolkit/blob/f4261c5/src/lib/policy.ts#L15)

___

### s3ObjectReadAccessStatements

▸ **s3ObjectReadAccessStatements**(`bucket`, `objKeyPattern?`): `Output`<`PolicyStatement`\>

Get IAM policy statements that grant permission
to read objects matching the given pattern

**`Default`**

```ts
'*' (any object in the bucket)
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bucket` | `Input`<`Bucket`\> | `undefined` |  |
| `objKeyPattern` | `Input`<`string`\> | `'*'` | Glob pattern of objects that can be read |

#### Returns

`Output`<`PolicyStatement`\>

#### Defined in

[src/lib/s3-iam.ts:21](https://github.com/iapetos163/pulumi-aws-toolkit/blob/f4261c5/src/lib/s3-iam.ts#L21)

___

### s3ObjectReadWriteAccessStatements

▸ **s3ObjectReadWriteAccessStatements**(`bucket`, `objKeyPattern?`): `Output`<`PolicyStatement`\>

Get IAM policy statements that grant permission
to read, write, and delete objects matching the given pattern

**`Default`**

```ts
'*' (any object in the bucket)
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bucket` | `Input`<`Bucket`\> | `undefined` |  |
| `objKeyPattern` | `Input`<`string`\> | `'*'` | Glob pattern of objects that can be accessed |

#### Returns

`Output`<`PolicyStatement`\>

#### Defined in

[src/lib/s3-iam.ts:40](https://github.com/iapetos163/pulumi-aws-toolkit/blob/f4261c5/src/lib/s3-iam.ts#L40)
