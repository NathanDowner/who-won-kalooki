import React from 'react';
import logo from '../assets/who-won-no-txt.png';
import logoWText from '../assets/who-won.png';
type LogoProps = {
  className?: React.HTMLAttributes<HTMLImageElement>['className'];
  withText?: boolean;
};
const Logo = ({ className, withText = false }: LogoProps) => {
  return (
    <img
      alt="who won logo"
      className={className}
      src={withText ? logoWText : logo}
    />
  );
};

export default Logo;
