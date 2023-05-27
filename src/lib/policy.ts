import {
  PolicyStatement,
  PolicyDocument,
  Principal,
  User,
  Role,
  GetUserResult,
  GetRoleResult,
} from '@pulumi/aws/iam';
import { Input, all, interpolate, jsonStringify, output } from '@pulumi/pulumi';

/**
 * Get a formatted IAM policy document with the given statements
 */
export const policyDocument = (statements: Input<Input<PolicyStatement>[]>) => {
  const policy: PolicyDocument = {
    Version: '2012-10-17',
    Statement: output(statements),
  };
  return jsonStringify(policy);
};

export interface AssumeRolePrincipals {
  /**
   * Slugs for the AWS services that can assume the role, without .amazonaws.com
   * @example ['ec2', 'lambda']
   */
  readonly services?: string[];
  /**
   * IAM users that can assume the role
   */
  readonly users?: Input<Input<User | GetUserResult>[]>;
  /**
   * IDs for the AWS accounts that can assume the role
   */
  readonly accounts?: Input<Input<string>[]>;
  /**
   * IAM roles that can assume the role
   */
  readonly roles?: Input<Input<Role | GetRoleResult>[]>;
}

/**
 * Get a formatted Assume Role Policy (a.k.a. Trust Policy)
 * for an IAM Role
 * @param principals The services, users, roles, or accounts allowed to assume the role
 */
export const assumeRolePolicyDocument = (principals: AssumeRolePrincipals) => {
  const principalDocs: Principal[] = [];

  if (principals.services) {
    principalDocs.push({
      Service: principals.services.map((s) => `${s}.amazonaws.com`),
    });
  }

  return all([principals.users, principals.roles, principals.accounts]).apply(
    ([users, roles, accounts]) => {
      if (users || roles || accounts) {
        const principalArns: Input<string>[] = [];
        if (users) {
          principalArns.push(...users.map((user) => user.arn));
        }
        if (roles) {
          principalArns.push(...roles.map((role) => role.arn));
        }
        if (accounts) {
          principalArns.push(
            ...accounts.map((id) => interpolate`arn:aws:iam::${id}:root`),
          );
        }

        principalDocs.push({
          AWS: principalArns,
        });
      }

      const policy: PolicyDocument = {
        Version: '2012-10-17',
        Statement: principalDocs.map((principal) => ({
          Effect: 'Allow',
          Principal: principal,
          Action: ['sts:AssumeRole'],
        })),
      };
      return jsonStringify(policy);
    },
  );
};
