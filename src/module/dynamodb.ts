export enum AttributeType {
  NUMBER = 'N',
  STRING = 'S',
  BINARY = 'B',
}

export {
  dynamodbTableReadAccessStatement,
  dynamodbTableReadWriteAccessStatement,
} from '../lib/dynamodb-iam';
