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
  /**
   * Security group in use for the file system's mount targets
   */
  readonly mountTargetSecurityGroup: Input<
    SecurityGroup | GetSecurityGroupResult
  >;
};

export type EfsAccessRuleArgs = Omit<SecurityGroupRuleArgs, ExcludedArgs> &
  AddedArgs;

/**
 * Security group rule that grants access to mount an EFS volume
 */
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
