
import React, { useState } from 'react';
import { APP_NAME, APP_TAGLINE, OncoTwinLogo } from '../constants';
import { Button } from './Button';
import { Input } from './Input';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('oncologist@example.com');
  const [password, setPassword] = useState('password123'); // Demo purposes
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Simulate API call
    setTimeout(() => {
      if (username && password) { // Basic check for demo
        onLogin();
      } else {
        setError('Please enter username and password.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-primary to-accent flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn">
        <div className="flex justify-center mb-6">
          <OncoTwinLogo className="h-12 w-auto" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
          {APP_NAME}
        </h2>
        <p className="mt-2 text-center text-sm text-blue-100">
          {APP_TAGLINE}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slideInUp">
        <div className="bg-white py-8 px-4 shadow-2xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email address (Demo)"
              type="email"
              autoComplete="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="oncologist@example.com"
            />
            <Input
              id="password"
              label="Password (Demo)"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
            />
            {error && <p className="text-center text-sm text-red-600">{error}</p>}
            <div>
              <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} size="lg">
                Secure Login
              </Button>
            </div>
          </form>
          <p className="mt-6 text-center text-xs text-neutral-dark">
            This is a demonstration platform. All data is illustrative.
          </p>
        </div>
      </div>
    </div>
  );
};
