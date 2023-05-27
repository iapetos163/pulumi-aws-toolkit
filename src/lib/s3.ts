import type { Bucket } from '@pulumi/aws/s3';
import { interpolate, output, Input } from '@pulumi/pulumi';

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
