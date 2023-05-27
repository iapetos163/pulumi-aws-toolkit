[pulumi-aws-toolkit](../README.md) / [Exports](../modules.md) / [ec2](../modules/ec2.md) / AllowAllOutbound

# Class: AllowAllOutbound

[ec2](../modules/ec2.md).AllowAllOutbound

Set of security group rules that allow all outbound traffic

## Hierarchy

- `ComponentResource`

  ↳ **`AllowAllOutbound`**

## Table of contents

### Constructors

- [constructor](ec2.AllowAllOutbound.md#constructor)

### Properties

- [urn](ec2.AllowAllOutbound.md#urn)

### Methods

- [getData](ec2.AllowAllOutbound.md#getdata)
- [getProvider](ec2.AllowAllOutbound.md#getprovider)
- [initialize](ec2.AllowAllOutbound.md#initialize)
- [registerOutputs](ec2.AllowAllOutbound.md#registeroutputs)
- [isInstance](ec2.AllowAllOutbound.md#isinstance)

## Constructors

### constructor

• **new AllowAllOutbound**(`name`, `securityGroup`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `securityGroup` | `Input`<`GetSecurityGroupResult` \| `SecurityGroup`\> |

#### Overrides

ComponentResource.constructor

#### Defined in

[src/module/ec2.ts:16](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/module/ec2.ts#L16)

## Properties

### urn

• `Readonly` **urn**: `Output`<`string`\>

urn is the stable logical URN used to distinctly address a resource, both before and after
deployments.

#### Inherited from

ComponentResource.urn

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:18

## Methods

### getData

▸ `Protected` **getData**(): `Promise`<`any`\>

Retrieves the data produces by [initialize].  The data is immediately available in a
derived class's constructor after the `super(...)` call to `ComponentResource`.

#### Returns

`Promise`<`any`\>

#### Inherited from

ComponentResource.getData

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:367

___

### getProvider

▸ **getProvider**(`moduleMember`): `undefined` \| `ProviderResource`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleMember` | `string` |

#### Returns

`undefined` \| `ProviderResource`

#### Inherited from

ComponentResource.getProvider

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:20

___

### initialize

▸ `Protected` **initialize**(`args`): `Promise`<`any`\>

Can be overridden by a subclass to asynchronously initialize data for this Component
automatically when constructed.  The data will be available immediately for subclass
constructors to use.  To access the data use `.getData`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Inputs` |

#### Returns

`Promise`<`any`\>

#### Inherited from

ComponentResource.initialize

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:362

___

### registerOutputs

▸ `Protected` **registerOutputs**(`outputs?`): `void`

registerOutputs registers synthetic outputs that a component has initialized, usually by
allocating other child sub-resources and propagating their resulting property values.

ComponentResources can call this at the end of their constructor to indicate that they are
done creating child resources.  This is not strictly necessary as this will automatically be
called after the `initialize` method completes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `outputs?` | `Inputs` \| `Promise`<`Inputs`\> \| `Output`<`Inputs`\> |

#### Returns

`void`

#### Inherited from

ComponentResource.registerOutputs

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:376

___

### isInstance

▸ `Static` **isInstance**(`obj`): obj is ComponentResource<any\>

Returns true if the given object is an instance of CustomResource.  This is designed to work even when
multiple copies of the Pulumi SDK have been loaded into the same process.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

obj is ComponentResource<any\>

#### Inherited from

ComponentResource.isInstance

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:342
