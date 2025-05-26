
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, containerClassName = '', className = '', ...props }) => {
  const baseInputStyle = "mt-1 block w-full px-3 py-2 bg-white border border-neutral-medium rounded-md text-sm shadow-sm placeholder-neutral-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";
  const errorInputStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-neutral-darkest">{label}</label>}
      <input
        id={id}
        className={`${baseInputStyle} ${error ? errorInputStyle : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, error, containerClassName = '', className = '', ...props }) => {
  const baseInputStyle = "mt-1 block w-full px-3 py-2 bg-white border border-neutral-medium rounded-md text-sm shadow-sm placeholder-neutral-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";
  const errorInputStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-neutral-darkest">{label}</label>}
      <textarea
        id={id}
        className={`${baseInputStyle} ${error ? errorInputStyle : ''} ${className}`}
        rows={3}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
