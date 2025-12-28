import { useContext } from 'react';
import type { ColorMap, Pattern as PatternType } from '~/types';
import { classNames, getTextColor } from '../lib';
import { ColorContext } from './ColorContext';

function countStitches(symbol: string, pattern: string[][]): number {
  return pattern.reduce((acc, curr) => {
    return curr.reduce((accX, currX) => (currX === symbol ? accX + 1 : accX), acc);
  }, 0);
}

function countTotalStitches(pattern: string[][]): number {
  return pattern.reduce((acc, curr) => acc + curr.filter((v) => v !== '').length, 0);
}

export type PatternProps = {
  className?: string;
  pattern: PatternType;
  style?: React.CSSProperties;
};

export default function Pattern({ className, pattern, style }: PatternProps) {
  const colors: ColorMap = useContext(ColorContext);

  return (
    <div
      className={classNames('flex flex-col items-center justify-center', className)}
      style={style}
    >
      <div className="mb-4 text-center">
        <h3 className="text-lg">{pattern.title}</h3>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {pattern.pattern.length}x{pattern.pattern[0].length}{' '}
          <span className="text-slate-300 dark:text-slate-600">|</span>{' '}
          {countTotalStitches(pattern.pattern)} stitches{' '}
          <span className="text-slate-300 dark:text-slate-600">|</span>{' '}
          {Object.keys(pattern.colorMap).length} colors
        </div>
      </div>
      <div className="flex flex-1 flex-col mb-8 w-max">
        <div className="flex">
          {pattern.pattern[0].map((_, c) => (
            <div
              key={`header-row-col-${c}`}
              className={`w-4 h-4 text-2xs items-center flex justify-center ${
                c > 1 && (c - 1) % 10 === 0
                  ? 'border-slate-400 dark:border-slate-600 border-l-2'
                  : ''
              }`}
            >
              {/* the first column is our axis label, so no need to c - 1 */}
              {c > 0 && c % 10 === 0 ? c : ''}
            </div>
          ))}
        </div>

        {pattern.pattern.map((row, r) => (
          <div className="flex" key={`row-${r}`}>
            <div
              className={`w-4 h-4 text-2xs items-center flex justify-center ${
                r > 1 && (r + 1) % 10 === 0
                  ? 'border-slate-400 dark:border-slate-600 border-b-2'
                  : ''
              }`}
            >
              {(r + 1) % 10 === 0 ? r + 1 : ''}
            </div>
            {row.map((col, c) => (
              <div
                className={classNames(
                  'w-4 h-4 text-2xs items-center flex justify-center border-slate-400 dark:border-slate-600',
                  c > 0 && 'border-l',
                  c > 0 && c % 10 === 0 && 'border-l-2',
                  r < pattern.pattern.length - 1 && 'border-b',
                  r > 0 && (r + 1) % 10 === 0 && 'border-b-2',
                )}
                key={`row-${r}-${c}`}
                style={{
                  backgroundColor:
                    col in pattern.colorMap
                      ? colors[pattern.colorMap[col]].hex.trim()
                      : 'transparent',
                  color: getTextColor(
                    col in pattern.colorMap
                      ? colors[pattern.colorMap[col]].hex.trim()
                      : 'transparent',
                  ),
                }}
              >
                <span>{col}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <table className="mb-8 divide-slate-400 dark:divide-slate-600 divide-y-2">
        <thead>
          <tr className="divide-x divide-slate-400 dark:divide-slate-600">
            <th className="text-left px-2">Symbol</th>
            <th className="text-left px-2">ID</th>
            <th className="text-left px-2">Name*</th>
            <th className="text-right px-2"># stitches</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-400 dark:divide-slate-600">
          {Object.entries(pattern.colorMap).map(([symbol, id]) => (
            <tr key={`key-dmc-${id}`} className="divide-x divide-slate-400 dark:divide-slate-600">
              <td className="px-2">
                <div className="flex items-center justify-center">
                  <div
                    className="w-4 h-4 text-2xs flex items-center justify-center"
                    style={{
                      backgroundColor:
                        symbol in pattern.colorMap
                          ? colors[pattern.colorMap[symbol]].hex.trim()
                          : 'transparent',
                      color: getTextColor(
                        symbol in pattern.colorMap
                          ? colors[pattern.colorMap[symbol]].hex.trim()
                          : 'transparent',
                      ),
                    }}
                  >
                    <span>{symbol}</span>
                  </div>
                </div>
              </td>
              <td className="px-2">DMC-{id}</td>
              <td className="px-2">{colors[id].name}</td>
              <td className="text-right px-2">{countStitches(symbol, pattern.pattern)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
