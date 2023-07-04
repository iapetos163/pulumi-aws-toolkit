import {
  SecurityGroupRuleArgs,
  SecurityGroupRule,
  SecurityGroup,
  GetSecurityGroupResult,
} from '@pulumi/aws/ec2';
import { CustomResourceOptions, Input, output } from '@pulumi/pulumi';

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
 *
 * @example ```
 * import { SecurityGroup } from '@pulumi/aws/ec2';
 * import { FileSystem, MountTarget } from '@pulumi/aws/efs';
 * import { AllowAllOutbound, EfsAccessRule } from 'pulumi-aws-toolkit/ec2';
 *
 * const mountTargetSecurityGroup = new SecurityGroup('fs-sg', { vpcId: myVpcId });
 * // This allows network traffic out from the volume
 * new AllowAllOutbound('fs-sg-outbound', mountTargetSecurityGroup);
 *
 * // This security group will be assigned to an EC2 instance that mounts the EFS volume
 * const instanceSecurityGroup = new SecurityGroup('instance-sg', { vpcId: myVpcId });
 *
 * const filesystem = new FileSystem('fs');
 * new MountTarget('fs-target', {
 *   fileSystemId: filesystem.id,
 *   subnetId: myVpcSubnetId,
 *   securityGroups: [mountTargetSecurityGroup.id],
 * });
 *
 * // This allows the EC2 instance to mount the filesystem
 * new EfsAccessRule('fs-sg-access', {
 *   mountTargetSecurityGroup,
 *
 *   // This can be replaced with cidrBlocks or ipv6CidrBlocks
 *   sourceSecurityGroupId: instanceSecurityGroup.id,
 * });
 *
 * // EC2 instance declaration here ...
 * ```
 */
export class EfsAccessRule extends SecurityGroupRule {
  constructor(
    name: string,
    props: EfsAccessRuleArgs,
    opts?: CustomResourceOptions,
  ) {
    const { mountTargetSecurityGroup, ...restProps } = props;

    const securityGroupId = output(mountTargetSecurityGroup).apply((sg) =>
      output(sg.id),
    );

    super(
      name,
      {
        ...restProps,
        securityGroupId,
        type: 'ingress',
        fromPort: 2049,
        toPort: 2049,
        protocol: 'tcp',
      },
      opts,
    );
  }
}
