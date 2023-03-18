export default function RespImage({ src, srcDark, ...other }) {
  return (
    <picture>
      <source srcSet={srcDark} media="(prefers-color-scheme: dark)" />
      <img src={src} {...other} />
    </picture>
  );
}
