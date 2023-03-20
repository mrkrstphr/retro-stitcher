import { useHref } from 'react-router';
import ColorDisclaimer from './ColorDisclaimer';
import PatternLoader from './PatternLoader';

export default function SpriteSheet({ details }) {
  const url = useHref();

  const maxPerRow = details.maxPerRow ?? 3;

  const classes =
    maxPerRow === 2
      ? 'grid grid-cols-1 lg:grid-cols-2 gap-4'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

  return (
    <div>
      <h2 className="text-2xl">{details.title}</h2>

      <div className={classes}>
        {details.patterns.map((pattern, index) => (
          <PatternLoader
            className={`mr-2 mt-2 h-full`}
            file={`${url.replace('/index', '')}/${pattern}`}
            key={`pattern-${pattern}`}
            style={{
              pageBreakAfter: index < details.patterns.length - 1 ? 'always' : 'auto',
              pageBreakBefore: index > 0 ? 'always' : 'auto',
            }}
          />
        ))}
      </div>

      <ColorDisclaimer className="mt-8" />
    </div>
  );
}
