
import React from 'react';
import { NavLink } from 'react-router-dom';
import { APP_NAME } from '../constants';

interface SidebarProps {
  onLogout: () => void;
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: (p:any) => <HomeIcon {...p} /> },
  // Patient Workspace will be accessed via Dashboard, not a direct main nav item for all patients.
  // Could add a "Recent Patients" section here if needed.
  { name: 'Glossary', path: '/glossary', icon: (p:any) => <BookOpenIcon {...p} /> },
  { name: 'Help & FAQs', path: '/help', icon: (p:any) => <QuestionMarkCircleIcon {...p} /> },
  { name: 'About OncoTwin®', path: '/about', icon: (p:any) => <InformationCircleIcon {...p} /> },
];

// Placeholder icons (inline SVGs for simplicity)
// Fix: Changed strokeWidth to number to resolve arithmetic type error.
const HomeIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
// Fix: Changed strokeWidth to number to resolve arithmetic type error.
const BookOpenIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m0 0A8.966 8.966 0 013.75 15.75V6.253m8.25 11.494A8.966 8.966 0 0019.5 15.75V6.253m-7.5 11.494V6.253" /></svg>;
// Fix: Changed strokeWidth to number to resolve arithmetic type error.
const QuestionMarkCircleIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.755 4 3.92 0 1.21-.734 2.343-1.844 3.033-.204.123-.407.264-.602.424l-1.448 1.188A.75.75 0 0112 16.5v.002M12 18h.008v.008H12V18zm0-9.75h.008v.008H12V8.25z" /></svg>;
// Fix: Changed strokeWidth to number to resolve arithmetic type error.
const InformationCircleIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>;
// Fix: Changed strokeWidth to number to resolve arithmetic type error.
const ArrowLeftOnRectangleIcon: React.FC<{className?: string}> = ({className}) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>;


export const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const activeClassName = "bg-primary-dark text-white";
  const inactiveClassName = "text-neutral-lightest hover:bg-primary hover:text-white";
  const baseClassName = "group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-150";

  return (
    <div className="w-64 bg-neutral-darkest flex flex-col h-screen sticky top-0">
      <div className="flex items-center justify-center h-16 border-b border-neutral-dark">
        <span className="text-white text-xl font-semibold">{APP_NAME}</span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}
          >
            <item.icon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-2 border-t border-neutral-dark">
        <button
          onClick={onLogout}
          className={`${baseClassName} ${inactiveClassName} w-full`}
        >
          <ArrowLeftOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
};
