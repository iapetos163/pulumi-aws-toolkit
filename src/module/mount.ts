import { FileSystem, GetFileSystemResult } from '@pulumi/aws/efs';
import { Input, all, interpolate, output } from '@pulumi/pulumi';

export const fstabLine = (
  dev: Input<string>,
  dir: Input<string>,
  type: Input<string>,
  opts: Input<string[]>,
  unload: Input<number>,
  order: Input<number>,
) =>
  all([dev, dir, type, opts, unload, order]).apply(
    ([dev, dir, type, opts, unload, order]) =>
      [dev, dir, type, opts.join(','), String(unload), String(order)].join(
        '\t',
      ),
  );
export const fstabLineEscape = (
  dev: Input<string>,
  dir: Input<string>,
  type: Input<string>,
  opts: Input<string[]>,
  unload: Input<number>,
  order: Input<number>,
) =>
  all([dev, dir, type, opts, unload, order]).apply(
    ([dev, dir, type, opts, unload, order]) =>
      [dev, dir, type, opts.join(','), String(unload), String(order)].join(
        '\\t',
      ),
  );

export const mountEfsCommands = (
  mountpoint: Input<string>,
  fileSystem: Input<FileSystem | GetFileSystemResult>,
  fsMountDir: Input<string> = '/',
) => [
  interpolate`mkdir -p '${mountpoint}'`,
  output(fileSystem).apply(
    (fileSystem) =>
      interpolate`echo '${fstabLine(
        interpolate`${fileSystem.id}:${fsMountDir}`,
        mountpoint,
        'efs',
        ['_netdev', 'noresvport', 'tls'],
        0,
        2,
      )}' >> /etc/fstab`,
  ),
  interpolate`mount '${mountpoint}'`,
];
