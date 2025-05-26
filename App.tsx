
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { PatientWorkspace } from './components/PatientWorkspace';
import { GlossaryPage } from './components/GlossaryPage';
import { HelpPage } from './components/HelpPage';
import { AboutPage } from './components/AboutPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Patient, AppNotification } from './types';
import { INITIAL_PATIENTS, INITIAL_NOTIFICATIONS } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock authentication
  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate]);

  const updatePatientData = useCallback((updatedPatient: Patient) => {
    setPatients(prevPatients => 
      prevPatients.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    );
    // Add a notification for data update
    setNotifications(prev => [{
      id: `notif_${Date.now()}`,
      message: `Data for patient ${updatedPatient.name} has been updated.`,
      type: 'info',
      read: false,
      timestamp: new Date().toISOString()
    }, ...prev]);
  }, []);
  
  const addNewPatient = useCallback((newPatient: Patient) => {
    setPatients(prevPatients => [newPatient, ...prevPatients]);
     setNotifications(prev => [{
      id: `notif_new_patient_${Date.now()}`,
      message: `New patient digital twin created: ${newPatient.name}.`,
      type: 'success',
      read: false,
      timestamp: new Date().toISOString()
    }, ...prev]);
    navigate(`/patient/${newPatient.id}/demographics`);
  }, [navigate]);

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? {...n, read: true} : n));
  }, []);

  // Redirect to login if not authenticated and trying to access a protected route
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (!isAuthenticated && location.pathname !== '/login') {
    // Still rendering login, but waiting for useEffect to redirect.
    // Or, can return a loader here. For simplicity, LoginScreen handles its own rendering.
    return <LoginScreen onLogin={handleLogin} />;
  }
  
  return (
    <>
      {isAuthenticated && location.pathname !== '/login' ? (
        <div className="flex h-screen bg-neutral-light">
          <Sidebar onLogout={handleLogout} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header notifications={notifications} markAsRead={markNotificationAsRead} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-light p-6">
              <Routes>
                <Route path="/dashboard" element={<Dashboard patients={patients} onSelectPatient={(id) => navigate(`/patient/${id}/demographics`)} onAddNewPatient={addNewPatient} />} />
                <Route path="/patient/:patientId/:tabId" element={<PatientWorkspace patients={patients} updatePatientData={updatePatientData} />} />
                <Route path="/patient/:patientId" element={<Navigate to="demographics" replace />} /> {/* Default tab */}
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                 <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all other unauthenticated paths to login */}
        </Routes>
      )}
    </>
  );
};

export default App;
