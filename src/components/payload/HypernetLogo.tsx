export default function HypernetLogo() {
  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet="/brand/hypernet-wordmark-dark.webp" />
      <img src="/brand/hypernet-wordmark-light.webp" alt="Hypernet" width={320} height={121} />
    </picture>
  )
}
