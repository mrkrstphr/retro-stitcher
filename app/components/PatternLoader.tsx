import { type HTMLAttributes } from 'react';
import type { Pattern as PatternType } from '~/types';
import { useFetch } from '../hooks/useFetch';
import Pattern from './Pattern';

export type PatternLoaderProps = HTMLAttributes<HTMLDivElement> & {
  file: string;
};

export default function PatternLoader({ className, file, style }: PatternLoaderProps) {
  const { data: pattern } = useFetch<PatternType>(file);

  if (!pattern) return null;

  return <Pattern className={className} pattern={pattern} style={style} />;
}
