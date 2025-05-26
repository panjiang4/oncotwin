
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string; // Added placeholder prop
}

export const Select: React.FC<SelectProps> = ({ label, id, error, containerClassName = '', className = '', options, ...props }) => {
  const baseSelectStyle = "mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-medium focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white shadow-sm";
  const errorSelectStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-neutral-darkest">{label}</label>}
      <select
        id={id}
        className={`${baseSelectStyle} ${error ? errorSelectStyle : ''} ${className}`}
        {...props}
      >
        {props.placeholder && <option value="" disabled>{props.placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
