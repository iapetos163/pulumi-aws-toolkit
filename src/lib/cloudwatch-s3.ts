import { cloudwatch } from '@pulumi/aws';
import type { Bucket, GetBucketResult } from '@pulumi/aws/s3';
import { Input, jsonStringify, output } from '@pulumi/pulumi';

export interface AssetChangeEventRuleArgs {
  readonly assetKey: Input<string>;
  readonly assetBucket: Input<Bucket | GetBucketResult>;
}

class AssetChangeEventRule extends cloudwatch.EventRule {
  constructor(name: string, args: AssetChangeEventRuleArgs) {
    const { assetKey, assetBucket } = args;
    const bucketName = output(assetBucket).apply((bucket) => bucket.bucket);

    super(name, {
      eventPattern: jsonStringify({
        source: ['aws.s3'],
        'detail-type': ['AWS API Call via CloudTrail'],
        detail: {
          eventSource: ['s3.amazonaws.com'],
          eventName: ['PutObject'],
          requestParameters: {
            bucketName: [bucketName],
            key: [assetKey],
          },
        },
      }),
    });
  }
}

export default AssetChangeEventRule;
