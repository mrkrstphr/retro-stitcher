export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type Color = {
  id: string;
  name: string;
  hex: string;
};
export type ColorMap = Record<string, Color>;

export type Category = {
  title: string;
  items: Array<{
    title: string;
    file: string;
  }>;
};

export type Sheet = {
  title: string;
  maxPerRow?: number;
  patterns: string[];
};

export type Pattern = {
  title: string;
  colorMap: Record<string, string>;
  pattern: Array<Array<string>>;
  source?: string;
};
