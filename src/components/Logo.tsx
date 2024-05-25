import React from 'react';
import logo from '../assets/who-won-no-txt.png';
type LogoProps = {
  className?: React.HTMLAttributes<HTMLImageElement>['className'];
};
const Logo = ({ className }: LogoProps) => {
  return <img alt="who won logo" className={className} src={logo} />;
};

export default Logo;
