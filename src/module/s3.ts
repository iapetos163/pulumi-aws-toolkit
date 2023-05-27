import type { PolicyStatement } from '@pulumi/aws/iam';
import type { Bucket } from '@pulumi/aws/s3';
import { interpolate, output, Input } from '@pulumi/pulumi';

const readActions = (entireBucket = false) => {
  const actions = ['s3:GetObject', 's3:GetObjectVersion'];
  if (entireBucket) {
    actions.push('s3:ListBucket');
  }
  return actions;
};

export const bucketAndObjectArns = (
  bucket: Input<Bucket>,
  objKeyPattern = '*',
) =>
  output(bucket)
    .apply((bucket) =>
      output({
        bucketArn: bucket.arn,
        objArn: interpolate`${bucket.arn}/${objKeyPattern}`,
      }),
    )
    .apply(({ bucketArn, objArn }) => [bucketArn, objArn]);

export const readAccess = (
  bucket: Input<Bucket>,
  objKeyPattern: Input<string> = '*',
) =>
  output(objKeyPattern).apply(
    (objKeyPattern): PolicyStatement => ({
      Effect: 'Allow',
      Resource: bucketAndObjectArns(bucket, objKeyPattern),
      Action: readActions(objKeyPattern === '*'),
    }),
  );

export const readWriteAccess = (
  bucket: Input<Bucket>,
  objKeyPattern: Input<string> = '*',
) =>
  output(objKeyPattern).apply(
    (objKeyPattern): PolicyStatement => ({
      Effect: 'Allow',
      Resource: bucketAndObjectArns(bucket, objKeyPattern),
      Action: [
        ...readActions(objKeyPattern === '*'),
        's3:PutObject',
        's3:PutObjectAcl',
        's3:DeleteObject',
      ],
    }),
  );
