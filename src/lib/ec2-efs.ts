import {
  SecurityGroupRuleArgs,
  SecurityGroupRule,
  SecurityGroup,
  GetSecurityGroupResult,
} from '@pulumi/aws/ec2';
import { Input, output } from '@pulumi/pulumi';

type ExcludedArgs =
  | 'type'
  | 'fromPort'
  | 'toPort'
  | 'protocol'
  | 'securityGroupId';

type AddedArgs = {
  mountTargetSecurityGroup: Input<SecurityGroup | GetSecurityGroupResult>;
};

export type EfsAccessRuleArgs = Omit<SecurityGroupRuleArgs, ExcludedArgs> &
  AddedArgs;

export class EfsAccessRule extends SecurityGroupRule {
  constructor(name: string, props: EfsAccessRuleArgs) {
    const { mountTargetSecurityGroup, ...restProps } = props;

    const securityGroupId = output(mountTargetSecurityGroup).apply((sg) =>
      output(sg.id),
    );

    super(name, {
      ...restProps,
      securityGroupId,
      type: 'ingress',
      fromPort: 2049,
      toPort: 2049,
      protocol: 'tcp',
    });
  }
}
