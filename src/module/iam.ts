export type { RunEcsTaskArgs as RunTaskArgs } from '../lib/ecs-iam';
export type { AssumeRolePrincipals } from '../lib/policy';

export {
  dynamodbTableReadAccessStatement,
  dynamodbTableReadWriteAccessStatement,
} from '../lib/dynamodb-iam';
export { runEcsTaskAccessStatements } from '../lib/ecs-iam';
export { policyDocument, assumeRolePolicyDocument } from '../lib/policy';
export {
  s3ObjectReadAccessStatements,
  s3ObjectReadWriteAccessStatements,
} from '../lib/s3-iam';
export { secretValueReadAccessStatement } from '../lib/secrets-iam';
