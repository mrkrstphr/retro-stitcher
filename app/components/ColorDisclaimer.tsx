import type { DetailedHTMLProps, HTMLAttributes } from 'react';

export type ColorDisclaimerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function ColorDisclaimer(props: ColorDisclaimerProps) {
  return (
    <div {...props}>
      * DMC does not publish official names for their colors. Different sources will use different
      names.
    </div>
  );
}
