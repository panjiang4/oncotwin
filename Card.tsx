
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  actions?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, title, className = '', titleClassName = '', bodyClassName = '', actions }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`}>
      {(title || actions) && (
        <div className={`px-4 py-4 sm:px-6 flex justify-between items-center border-b border-neutral-light ${title ? '' : 'border-none'}`}>
          {title && <h3 className={`text-lg leading-6 font-semibold text-neutral-darkest ${titleClassName}`}>{title}</h3>}
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      )}
      <div className={`px-4 py-5 sm:p-6 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};
