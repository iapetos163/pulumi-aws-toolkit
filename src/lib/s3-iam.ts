import type { PolicyStatement } from '@pulumi/aws/iam';
import type { Bucket } from '@pulumi/aws/s3';
import { output, Input } from '@pulumi/pulumi';
import { bucketAndObjectArns } from './s3';

const readActions = (entireBucket = false) => {
  const actions = ['s3:GetObject', 's3:GetObjectVersion'];
  if (entireBucket) {
    actions.push('s3:ListBucket');
  }
  return actions;
};

/**
 * Get IAM policy statements that grant permission
 * to read objects matching the given pattern
 * @param bucket
 * @param objKeyPattern Glob pattern of objects that can be read
 *   @default '*' (any object in the bucket)
 */
export const s3ObjectReadAccessStatements = (
  bucket: Input<Bucket>,
  objKeyPattern: Input<string> = '*',
) =>
  output(objKeyPattern).apply((objKeyPattern): PolicyStatement[] => [
    {
      Effect: 'Allow',
      Resource: bucketAndObjectArns(bucket, objKeyPattern),
      Action: readActions(objKeyPattern === '*'),
    },
  ]);

/**
 * Get IAM policy statements that grant permission
 * to read, write, and delete objects matching the given pattern
 * @param bucket
 * @param objKeyPattern Glob pattern of objects that can be accessed
 *   @default '*' (any object in the bucket)
 */
export const s3ObjectReadWriteAccessStatements = (
  bucket: Input<Bucket>,
  objKeyPattern: Input<string> = '*',
) =>
  output(objKeyPattern).apply((objKeyPattern): PolicyStatement[] => [
    {
      Effect: 'Allow',
      Resource: bucketAndObjectArns(bucket, objKeyPattern),
      Action: [
        ...readActions(objKeyPattern === '*'),
        's3:PutObject',
        's3:PutObjectAcl',
        's3:DeleteObject',
      ],
    },
  ]);
