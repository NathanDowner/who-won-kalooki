import clsx from 'clsx';

interface SelectProps<T> {
  label?: string;
  name?: string;
  value: T | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: T[];
  valueSelector: (value: T) => string;
  labelSelector: (value: T) => string;
  onSelect?: (value: T) => void;
  hasError?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  smallText?: string;
  placeholder?: string;
}

const Select = <T,>({
  value,
  valueSelector,
  labelSelector,
  options,
  onChange,
  onSelect,
  onBlur,
  hasError = false,
  disabled = false,
  smallText,
  name,
  label,
  placeholder = 'Pick one',
}: SelectProps<T>) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <select
        className={clsx('select select-bordered', hasError && 'input-error')}
        onBlur={onBlur}
        onChange={onChange}
        value={value ? valueSelector(value) : ''}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, idx) => (
          <option
            key={idx}
            value={valueSelector(option)}
            onClick={() => onSelect && onSelect(option)}
          >
            {labelSelector(option)}
          </option>
        ))}
      </select>
      <div className="label -mt-1">
        <span className={clsx('label-text-alt', hasError && 'text-red-500')}>
          {smallText}
        </span>
      </div>
    </label>
  );
};

export default Select;
