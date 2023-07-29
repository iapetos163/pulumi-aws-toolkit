import type { GetTableResult, Table } from '@pulumi/aws/dynamodb';
import type { PolicyStatement } from '@pulumi/aws/iam';
import { Input, all, interpolate } from '@pulumi/pulumi';

const readActions = [
  'dynamodb:BatchGetItem',
  'dynamodb:DescribeTable',
  'dynamodb:GetItem',
  'dynamodb:Scan',
  'dynamodb:Query',
];

/**
 * Get an IAM policy statement that grants access to
 * run read queries on the given DynamoDB tables
 */
export const dynamodbTableReadAccessStatement = (
  ...tables: Input<Table | GetTableResult>[]
): PolicyStatement => ({
  Effect: 'Allow',
  Resource: all(tables).apply((tables) =>
    tables.flatMap((s) => [s.arn, interpolate`${s.arn}/*`]),
  ),
  Action: readActions,
});

/**
 * Get an IAM policy statement that grants access to
 * run any query on the given DynamoDB tables
 */
export const dynamodbTableReadWriteAccessStatement = (
  ...tables: Input<Table | GetTableResult>[]
): PolicyStatement => ({
  Effect: 'Allow',
  Resource: all(tables).apply((tables) =>
    tables.flatMap((s) => [s.arn, interpolate`${s.arn}/*`]),
  ),
  Action: [
    ...readActions,
    'dynamodb:BatchGetItem',
    'dynamodb:DeleteItem',
    'dynamodb:PutItem',
    'dynamodb:UpdateItem',
  ],
});
