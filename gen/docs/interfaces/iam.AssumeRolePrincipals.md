[pulumi-aws-toolkit](../README.md) / [Exports](../modules.md) / [iam](../modules/iam.md) / AssumeRolePrincipals

# Interface: AssumeRolePrincipals

[iam](../modules/iam.md).AssumeRolePrincipals

## Table of contents

### Properties

- [accounts](iam.AssumeRolePrincipals.md#accounts)
- [roles](iam.AssumeRolePrincipals.md#roles)
- [services](iam.AssumeRolePrincipals.md#services)
- [users](iam.AssumeRolePrincipals.md#users)

## Properties

### accounts

• `Optional` `Readonly` **accounts**: `Input`<`Input`<`string`\>[]\>

IDs for the AWS accounts that can assume the role

#### Defined in

[src/lib/policy.ts:36](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/policy.ts#L36)

___

### roles

• `Optional` `Readonly` **roles**: `Input`<`Input`<`Role` \| `GetRoleResult`\>[]\>

IAM roles that can assume the role

#### Defined in

[src/lib/policy.ts:40](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/policy.ts#L40)

___

### services

• `Optional` `Readonly` **services**: `string`[]

Slugs for the AWS services that can assume the role, without .amazonaws.com

**`Example`**

```ts
['ec2', 'lambda']
```

#### Defined in

[src/lib/policy.ts:28](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/policy.ts#L28)

___

### users

• `Optional` `Readonly` **users**: `Input`<`Input`<`GetUserResult` \| `User`\>[]\>

IAM users that can assume the role

#### Defined in

[src/lib/policy.ts:32](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/policy.ts#L32)
