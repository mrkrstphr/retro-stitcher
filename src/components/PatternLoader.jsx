import { useEffect, useState } from 'react';
import Pattern from './Pattern';

export default function PatternLoader({ className, file, style }) {
  const [pattern, setPattern] = useState();

  useEffect(() => {
    fetch(file)
      .then((data) => data.json())
      .then(setPattern);
  }, [file]);

  if (!pattern) return null;

  return <Pattern className={className} pattern={pattern} style={style} />;
}
