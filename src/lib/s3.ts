import type { Bucket } from '@pulumi/aws/s3';
import { interpolate, output, Input } from '@pulumi/pulumi';

/**
 * Get the ARNs for a bucket and objects in the bucket
 * @param bucket
 * @param objKeyPattern Glob pattern of object paths
 *   @default '*' (any object in the bucket)
 */
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
