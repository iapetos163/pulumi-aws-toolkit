import {
  GetSecurityGroupResult,
  SecurityGroup,
  SecurityGroupRule,
} from '@pulumi/aws/ec2';
import {
  ComponentResource,
  ComponentResourceOptions,
  Input,
  output,
} from '@pulumi/pulumi';

export type { EfsAccessRuleArgs } from '../lib/ec2-efs';

export { EfsAccessRule } from '../lib/ec2-efs';

/**
 * Set of security group rules that allow all outbound traffic
 */
export class AllowAllOutbound extends ComponentResource {
  constructor(
    name: string,
    securityGroup: Input<SecurityGroup | GetSecurityGroupResult>,
    opts?: ComponentResourceOptions,
  ) {
    super('pulumi-aws-toolkit:ec2:AllowAllOutbound', name, opts);

    output(securityGroup).apply((securityGroup) => {
      new SecurityGroupRule(
        `${name}-ipv4`,
        {
          securityGroupId: securityGroup.id,
          type: 'egress',
          protocol: 'all',
          fromPort: -1,
          toPort: -1,
          cidrBlocks: ['0.0.0.0/0'],
        },
        { parent: this },
      );
      new SecurityGroupRule(
        `${name}-ipv6`,
        {
          securityGroupId: securityGroup.id,
          type: 'egress',
          protocol: 'all',
          fromPort: -1,
          toPort: -1,
          ipv6CidrBlocks: ['::/0'],
        },
        { parent: this },
      );
    });
  }
}
