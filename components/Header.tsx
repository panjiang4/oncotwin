
import React, { useState } from 'react';
import { OncoTwinLogo, BellIcon, UserIcon } from '../constants';
import { AppNotification } from '../types';
import { Link } from 'react-router-dom';

interface HeaderProps {
  notifications: AppNotification[];
  markAsRead: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ notifications, markAsRead }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0">
              <OncoTwinLogo className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1 rounded-full text-neutral-dark hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none py-1 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 text-sm font-semibold text-neutral-darkest border-b">Notifications ({unreadCount} unread)</div>
                  {notifications.length === 0 ? (
                     <div className="px-4 py-3 text-sm text-neutral-dark">No new notifications.</div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`block px-4 py-3 text-sm text-neutral-darkest hover:bg-neutral-light ${!notification.read ? 'bg-blue-50' : ''}`}
                        onClick={() => {
                          if (!notification.read) markAsRead(notification.id);
                          // Potentially navigate to related item
                          // setShowNotifications(false);
                        }}
                      >
                        <p className="font-medium">{notification.message}</p>
                        <p className={`text-xs ${notification.read ? 'text-neutral-dark' : 'text-primary'}`}>
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <UserIcon className="h-8 w-8 rounded-full text-neutral-dark bg-neutral-medium p-1" />
              </button>
              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="block px-4 py-2 text-sm text-neutral-darkest font-medium">Dr. Eva Rostova</div>
                  <a href="#/profile" className="block px-4 py-2 text-sm text-neutral-darkest hover:bg-neutral-light">Your Profile (Demo)</a>
                  <a href="#/settings" className="block px-4 py-2 text-sm text-neutral-darkest hover:bg-neutral-light">Settings (Demo)</a>
                  {/* Placeholder for logout, actual logout handled in Sidebar for now */}
                  <div className="border-t border-neutral-light my-1"></div>
                  <span className="block px-4 py-2 text-sm text-neutral-darkest hover:bg-neutral-light cursor-not-allowed">Logout (Use Sidebar)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
