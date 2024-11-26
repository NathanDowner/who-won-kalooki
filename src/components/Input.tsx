import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'search' | 'textarea';
  rows?: number;
  cols?: number;
  label?: string;
  name?: string;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  smallText?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>,
  ) => void;
  leftIcon?: React.ComponentType<{ className?: string }>;
  rightIcon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      type = 'text',
      name,
      value,
      onChange,
      placeholder,
      smallText,
      hasError = false,
      disabled = false,
      onBlur,
      ...props
    },
    ref,
  ) => {
    return (
      <label className="form-control w-full">
        {label && (
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
        )}
        {type === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            onChange={onChange}
            onBlur={onBlur}
            rows={props.rows}
            name={name}
            value={value}
            placeholder={placeholder}
            className={clsx('textarea textarea-bordered', {
              'input-error': hasError,
            })}
            disabled={disabled}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            className={clsx('input input-bordered w-full', {
              'input-error': hasError,
            })}
            disabled={disabled}
          />
        )}
        <div className="label -mt-1">
          <span
            className={clsx('label-text-alt', { 'text-red-500': hasError })}
          >
            {smallText}
          </span>
        </div>
      </label>
    );
  },
);

export default Input;
