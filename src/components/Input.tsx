import clsx from 'clsx';
import React from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'search' | 'text' | 'textarea';
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  smallText?: string;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  smallText,
  hasError = false,
  disabled = false,
}: InputProps) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      {type === 'textarea' ? (
        <textarea
          onChange={onChange}
          name={name}
          value={value}
          placeholder={placeholder}
          className={clsx('input input-bordered w-full max-w-xs', {
            'input-error': hasError,
          })}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          className={clsx('input input-bordered w-full', {
            'input-error': hasError,
          })}
          disabled={disabled}
        />
      )}
      <div className="label -mt-1">
        <span className={clsx('label-text-alt', { 'text-red-500': hasError })}>
          {smallText}
        </span>
      </div>
    </label>
  );
};

export default Input;
