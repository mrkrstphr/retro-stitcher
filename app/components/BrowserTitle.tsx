import { APP_NAME } from '../config';

export function BrowserTitle({ title }: { title?: string }) {
  const formattedTitle = [title, APP_NAME].filter(Boolean).join(' | ');

  return <title>{formattedTitle}</title>;
}
