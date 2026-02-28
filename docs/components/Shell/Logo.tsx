import logoSrc from '../../assets/logo-256.png';

export function Logo({ height = 30 }: { height?: number }) {
  return <img src={logoSrc.src} height={height} alt="Logo" />;
}
