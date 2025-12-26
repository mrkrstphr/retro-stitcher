import type { ImgHTMLAttributes } from 'react';
import { BASE_PATH } from '../config';

export type RespImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  srcDark: string;
};

export default function RespImage({ src, srcDark, ...other }: RespImageProps) {
  return (
    <picture>
      <source srcSet={`${BASE_PATH}${srcDark}`} media="(prefers-color-scheme: dark)" />
      <img src={`${BASE_PATH}${src}`} {...other} />
    </picture>
  );
}
