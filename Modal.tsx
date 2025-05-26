
import React, { Fragment } from 'react';
// Using a headless UI approach for a basic modal, or can build from scratch.
// For simplicity, this is a basic modal. For production, consider Headless UI or Radix.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-darkest bg-opacity-75 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fadeIn"
          onClick={e => e.stopPropagation()} // Prevent click inside modal from closing it
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Optional: Icon can be added here */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                {title && <h3 className="text-lg leading-6 font-medium text-neutral-darkest" id="modal-title">{title}</h3>}
                <div className="mt-2">
                  {children}
                </div>
              </div>
            </div>
          </div>
          {footer && (
            <div className="bg-neutral-light px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
