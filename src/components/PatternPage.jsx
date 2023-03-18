import { useEffect, useState } from 'react';
import ColorDisclaimer from './ColorDisclaimer';
import Pattern from './Pattern';

export default function PatternPage({ className, file }) {
  const [pattern, setPattern] = useState();

  useEffect(() => {
    fetch(file)
      .then((data) => data.json())
      .then(setPattern);
  }, [file]);

  if (!pattern) return null;

  return (
    <div>
      <h2 className="text-3xl">{pattern.title}</h2>
      <Pattern className={className} pattern={pattern} />
      <ColorDisclaimer />
    </div>
  );
}
