import clsx from 'clsx';
import { useContext } from 'react';
import { getTextColor } from '../lib';
import { ColorContext } from './ColorContext';

function countStitches(symbol, pattern) {
  return pattern.reduce((acc, curr) => {
    return curr.reduce((accX, currX) => (currX === symbol ? accX + 1 : accX), acc);
  }, 0);
}

export default function Pattern({ className, pattern, style }) {
  const colors = useContext(ColorContext);

  return (
    <div className={clsx('flex flex-col items-center justify-center', className)} style={style}>
      <div className="flex flex-1 flex-col mb-8 w-max">
        <div className="flex">
          {pattern.pattern[0].map((_, c) => (
            <div className="w-4 h-4 text-2xs align-center flex justify-end">
              {(c + 1) % 10 === 0 ? c + 1 : ''}
            </div>
          ))}
        </div>

        {pattern.pattern.map((row, r) => (
          <div className="flex" key={`row-${r}`}>
            <div className="w-4 h-4 text-2xs align-center flex justify-center border-gray-40 dark:border-gray-600">
              {(r + 1) % 10 === 0 ? r + 1 : ''}
            </div>
            {row.map((col, c) => (
              <div
                className={clsx(
                  'w-4 h-4 text-2xs align-center flex justify-center border-gray-400 dark:border-gray-600',
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

      <table className="mb-8 divide-y divide-gray-200 divide-y-2">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="text-left px-2">Symbol</th>
            <th className="text-left px-2">ID</th>
            <th className="text-left px-2">Name*</th>
            <th className="text-right px-2"># stitches</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Object.entries(pattern.colorMap).map(([symbol, id]) => (
            <tr key={`key-dmc-${id}`} className="divide-x divide-gray-200">
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
