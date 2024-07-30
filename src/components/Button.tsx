import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  type?: 'button' | 'submit';
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn btn-primary"
      disabled={disabled || loading}
    >
      {loading && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default Button;
