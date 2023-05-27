[pulumi-aws-toolkit](../README.md) / [Exports](../modules.md) / [ec2](../modules/ec2.md) / EfsAccessRule

# Class: EfsAccessRule

[ec2](../modules/ec2.md).EfsAccessRule

Security group rule that grants access to mount an EFS volume

**`Example`**

```
import { SecurityGroup } from '@pulumi/aws/ec2';
import { FileSystem, MountTarget } from '@pulumi/aws/efs';
import { AllowAllOutbound, EfsAccessRule } from 'pulumi-aws-toolkit/ec2';

const mountTargetSecurityGroup = new SecurityGroup('fs-sg', { vpcId: myVpcId });
// This allows network traffic out from the volume
new AllowAllOutbound('fs-sg-outbound', mountTargetSecurityGroup);

// This security group will be assigned to an EC2 instance that mounts the EFS volume
const instanceSecurityGroup = new SecurityGroup('instance-sg', { vpcId: myVpcId });

const filesystem = new FileSystem('fs');
new MountTarget('fs-target', {
  fileSystemId: filesystem.id,
  subnetId: myVpcSubnetId,
  securityGroups: [mountTargetSecurityGroup.id],
});

// This allows the EC2 instance to mount the filesystem
new EfsAccessRule('fs-sg-access', {
  mountTargetSecurityGroup,

  // This can be replaced with cidrBlocks or ipv6CidrBlocks
  sourceSecurityGroupId: instanceSecurityGroup.id,
});

// EC2 instance declaration here ...
```

## Hierarchy

- `SecurityGroupRule`

  ↳ **`EfsAccessRule`**

## Table of contents

### Constructors

- [constructor](ec2.EfsAccessRule.md#constructor)

### Properties

- [cidrBlocks](ec2.EfsAccessRule.md#cidrblocks)
- [description](ec2.EfsAccessRule.md#description)
- [fromPort](ec2.EfsAccessRule.md#fromport)
- [id](ec2.EfsAccessRule.md#id)
- [ipv6CidrBlocks](ec2.EfsAccessRule.md#ipv6cidrblocks)
- [prefixListIds](ec2.EfsAccessRule.md#prefixlistids)
- [protocol](ec2.EfsAccessRule.md#protocol)
- [securityGroupId](ec2.EfsAccessRule.md#securitygroupid)
- [securityGroupRuleId](ec2.EfsAccessRule.md#securitygroupruleid)
- [self](ec2.EfsAccessRule.md#self)
- [sourceSecurityGroupId](ec2.EfsAccessRule.md#sourcesecuritygroupid)
- [toPort](ec2.EfsAccessRule.md#toport)
- [type](ec2.EfsAccessRule.md#type)
- [urn](ec2.EfsAccessRule.md#urn)

### Methods

- [getProvider](ec2.EfsAccessRule.md#getprovider)
- [get](ec2.EfsAccessRule.md#get)
- [isInstance](ec2.EfsAccessRule.md#isinstance)

## Constructors

### constructor

• **new EfsAccessRule**(`name`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `props` | [`EfsAccessRuleArgs`](../modules/ec2.md#efsaccessruleargs) |

#### Overrides

SecurityGroupRule.constructor

#### Defined in

[src/lib/ec2-efs.ts:62](https://github.com/iapetos163/pulumi-aws-toolkit/blob/e0762b2/src/lib/ec2-efs.ts#L62)

## Properties

### cidrBlocks

• `Readonly` **cidrBlocks**: `Output`<`undefined` \| `string`[]\>

List of CIDR blocks. Cannot be specified with `sourceSecurityGroupId` or `self`.

#### Inherited from

SecurityGroupRule.cidrBlocks

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:144

___

### description

• `Readonly` **description**: `Output`<`undefined` \| `string`\>

Description of the rule.

#### Inherited from

SecurityGroupRule.description

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:148

___

### fromPort

• `Readonly` **fromPort**: `OutputInstance`<`number`\>

Start port (or ICMP type number if protocol is "icmp" or "icmpv6").

#### Inherited from

SecurityGroupRule.fromPort

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:152

___

### id

• `Readonly` **id**: `Output`<`string`\>

id is the provider-assigned unique ID for this managed resource.  It is set during
deployments and may be missing (undefined) during planning phases.

#### Inherited from

SecurityGroupRule.id

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:293

___

### ipv6CidrBlocks

• `Readonly` **ipv6CidrBlocks**: `Output`<`undefined` \| `string`[]\>

List of IPv6 CIDR blocks. Cannot be specified with `sourceSecurityGroupId` or `self`.

#### Inherited from

SecurityGroupRule.ipv6CidrBlocks

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:156

___

### prefixListIds

• `Readonly` **prefixListIds**: `Output`<`undefined` \| `string`[]\>

List of Prefix List IDs.

#### Inherited from

SecurityGroupRule.prefixListIds

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:160

___

### protocol

• `Readonly` **protocol**: `Output`<`string`\>

Protocol. If not icmp, icmpv6, tcp, udp, or all use the [protocol number](https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml)

#### Inherited from

SecurityGroupRule.protocol

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:164

___

### securityGroupId

• `Readonly` **securityGroupId**: `Output`<`string`\>

Security group to apply this rule to.

#### Inherited from

SecurityGroupRule.securityGroupId

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:168

___

### securityGroupRuleId

• `Readonly` **securityGroupRuleId**: `Output`<`string`\>

If the `aws.ec2.SecurityGroupRule` resource has a single source or destination then this is the AWS Security Group Rule resource ID. Otherwise it is empty.

#### Inherited from

SecurityGroupRule.securityGroupRuleId

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:172

___

### self

• `Readonly` **self**: `OutputInstance`<`undefined` \| `boolean`\>

Whether the security group itself will be added as a source to this ingress rule. Cannot be specified with `cidrBlocks`, `ipv6CidrBlocks`, or `sourceSecurityGroupId`.

#### Inherited from

SecurityGroupRule.self

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:176

___

### sourceSecurityGroupId

• `Readonly` **sourceSecurityGroupId**: `Output`<`string`\>

Security group id to allow access to/from, depending on the `type`. Cannot be specified with `cidrBlocks`, `ipv6CidrBlocks`, or `self`.

#### Inherited from

SecurityGroupRule.sourceSecurityGroupId

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:180

___

### toPort

• `Readonly` **toPort**: `OutputInstance`<`number`\>

End port (or ICMP code if protocol is "icmp").

#### Inherited from

SecurityGroupRule.toPort

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:184

___

### type

• `Readonly` **type**: `Output`<`string`\>

Type of rule being created. Valid options are `ingress` (inbound)
or `egress` (outbound).

#### Inherited from

SecurityGroupRule.type

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:189

___

### urn

• `Readonly` **urn**: `Output`<`string`\>

urn is the stable logical URN used to distinctly address a resource, both before and after
deployments.

#### Inherited from

SecurityGroupRule.urn

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:18

## Methods

### getProvider

▸ **getProvider**(`moduleMember`): `undefined` \| `ProviderResource`

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleMember` | `string` |

#### Returns

`undefined` \| `ProviderResource`

#### Inherited from

SecurityGroupRule.getProvider

#### Defined in

node_modules/@pulumi/pulumi/resource.d.ts:20

___

### get

▸ `Static` **get**(`name`, `id`, `state?`, `opts?`): `SecurityGroupRule`

Get an existing SecurityGroupRule resource's state with the given name, ID, and optional extra
properties used to qualify the lookup.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The _unique_ name of the resulting resource. |
| `id` | `Input`<`string`\> | The _unique_ provider ID of the resource to lookup. |
| `state?` | `SecurityGroupRuleState` | Any extra arguments used during the lookup. |
| `opts?` | `CustomResourceOptions` | Optional settings to control the behavior of the CustomResource. |

#### Returns

`SecurityGroupRule`

#### Inherited from

SecurityGroupRule.get

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:135

___

### isInstance

▸ `Static` **isInstance**(`obj`): obj is SecurityGroupRule

Returns true if the given object is an instance of SecurityGroupRule.  This is designed to work even
when multiple copies of the Pulumi SDK have been loaded into the same process.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

obj is SecurityGroupRule

#### Inherited from

SecurityGroupRule.isInstance

#### Defined in

node_modules/@pulumi/aws/ec2/securityGroupRule.d.ts:140
