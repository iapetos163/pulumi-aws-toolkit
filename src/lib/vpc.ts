import {
  GetSecurityGroupResult,
  SecurityGroup,
  SecurityGroupRule,
} from '@pulumi/aws/ec2';
import { Input, output } from '@pulumi/pulumi';

export class AllowAllOutboundRule()

= (
  name: string,
  securityGroup: Input<SecurityGroup | GetSecurityGroupResult>,
) => {
  output(securityGroup).apply((securityGroup) => {
    new SecurityGroupRule(`${name}-ipv4`, {
      securityGroupId: securityGroup.id,
      type: 'egress',
      protocol: 'all',
      fromPort: -1,
      toPort: -1,
      cidrBlocks: ['0.0.0.0/0'],
    });
    new SecurityGroupRule(`${name}-ipv6`, {
      securityGroupId: securityGroup.id,
      type: 'egress',
      protocol: 'all',
      fromPort: -1,
      toPort: -1,
      ipv6CidrBlocks: ['::/0'],
    });
  });
};

export const allowPing = (
  name: string,
  securityGroup: Input<SecurityGroup | GetSecurityGroupResult>,
) => {
  output(securityGroup).apply((securityGroup) => {
    new SecurityGroupRule(`${name}-ipv4`, {
      securityGroupId: securityGroup.id,
      type: 'ingress',
      protocol: 'icmp',
      fromPort: -1,
      toPort: -1,
      cidrBlocks: ['0.0.0.0/0'],
    });
    new SecurityGroupRule(`${name}-ipv6`, {
      securityGroupId: securityGroup.id,
      type: 'ingress',
      protocol: 'icmp',
      fromPort: -1,
      toPort: -1,
      ipv6CidrBlocks: ['::/0'],
    });
  });
};
