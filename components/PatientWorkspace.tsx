
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Patient, PatientWorkspaceTab as PatientWorkspaceTabType, PatientSimulation, ActualOutcome } from '../types';
import { PATIENT_WORKSPACE_TABS } from '../constants';
import { Card } from './Card';
import { LoadingSpinner } from './LoadingSpinner';
import { PatientDemographicsTab } from './PatientDemographicsTab';
import { MultiModalDataTab } from './MultiModalDataTab';
import { VirtualTumorModelTab } from './VirtualTumorModelTab';
import { TreatmentSimulationTab } from './TreatmentSimulationTab';
import { FeedbackAdaptationTab } from './FeedbackAdaptationTab';
import { ReportCollaborationTab } from './ReportCollaborationTab'; // Added import
// Fix: Added missing import for Button
import { Button } from './Button';

interface PatientWorkspaceProps {
  patients: Patient[];
  updatePatientData: (updatedPatient: Patient) => void;
}

export const PatientWorkspace: React.FC<PatientWorkspaceProps> = ({ patients, updatePatientData }) => {
  const { patientId, tabId } = useParams<{ patientId: string; tabId: PatientWorkspaceTabType }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tempNotification, setTempNotification] = useState<string | null>(null); // Added state for temp notifications

  useEffect(() => {
    setIsLoading(true);
    const foundPatient = patients.find(p => p.id === patientId);
    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      // Handle patient not found, perhaps navigate back or show error
      navigate('/dashboard', { replace: true });
    }
    setIsLoading(false);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, patients]); // Removed navigate from deps as it can cause loops if not memoized by router

  const showTemporaryNotification = (message: string) => {
    setTempNotification(message);
    setTimeout(() => {
      setTempNotification(null);
    }, 3500); // Display for 3.5 seconds
  };

  const handleDataUpdate = (updatedData: Partial<Patient>) => {
    if (patient) {
      const fullyUpdatedPatient = { ...patient, ...updatedData, virtualTumorModel: { ...patient.virtualTumorModel, lastUpdated: new Date().toISOString()} };
      
      // If specific nested objects are updated, merge them carefully
      if (updatedData.demographics) {
        fullyUpdatedPatient.demographics = {...patient.demographics, ...updatedData.demographics};
      }
      if (updatedData.clinicalHistory) {
        fullyUpdatedPatient.clinicalHistory = {...patient.clinicalHistory, ...updatedData.clinicalHistory};
      }
      // ... and so on for other nested updatable parts

      setPatient(fullyUpdatedPatient); // Update local state for immediate UI refresh
      updatePatientData(fullyUpdatedPatient); // Propagate to parent
    }
  };

  const handleSimulationAdded = (newSimulation: PatientSimulation) => {
    if (patient) {
      const updatedSimulations = [...patient.simulations, newSimulation];
      handleDataUpdate({ simulations: updatedSimulations, status: "Simulation Complete" });
      showTemporaryNotification(`Simulation for ${patient.name} completed and saved.`);
    }
  };

  const handleOutcomeAdded = (newOutcome: ActualOutcome) => {
     if (patient) {
      const updatedOutcomes = [...patient.actualOutcomes, newOutcome];
      handleDataUpdate({ actualOutcomes: updatedOutcomes, status: "New Data Available" });
      showTemporaryNotification(`New outcome recorded for ${patient.name}. Model can be updated.`);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner text="Loading patient data..." /></div>;
  }

  if (!patient) {
    return (
      <Card title="Patient Not Found">
        <p>The requested patient digital twin could not be found. Please return to the dashboard.</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">Go to Dashboard</Button>
      </Card>
    );
  }

  const activeTab = tabId || "demographics";

  const renderTabContent = () => {
    switch (activeTab) {
      case 'demographics':
        return <PatientDemographicsTab patient={patient} onUpdate={handleDataUpdate} />;
      case 'multiModalData':
        return <MultiModalDataTab patient={patient} onUpdate={handleDataUpdate} />;
      case 'virtualTumor':
        return <VirtualTumorModelTab patient={patient} />;
      case 'simulation':
        return <TreatmentSimulationTab patient={patient} onSimulationComplete={handleSimulationAdded} />;
      case 'feedback':
        return <FeedbackAdaptationTab patient={patient} onOutcomeAdded={handleOutcomeAdded} showTemporaryNotification={showTemporaryNotification} />;
      case 'reporting': // Added case for reporting tab
        return <ReportCollaborationTab patient={patient} showTemporaryNotification={showTemporaryNotification} />;
      default:
        return <PatientDemographicsTab patient={patient} onUpdate={handleDataUpdate} />;
    }
  };
  
  const baseNavClass = "px-4 py-3 text-sm font-medium rounded-t-lg transition-colors duration-150 focus:outline-none";
  const activeNavClass = "bg-white text-primary border-b-2 border-primary";
  const inactiveNavClass = "text-neutral-dark hover:text-primary hover:bg-neutral-lightest";

  return (
    <div className="space-y-6 animate-fadeIn">
      {tempNotification && (
        <div 
            className="fixed top-20 right-6 bg-primary text-white p-4 rounded-md shadow-xl z-[100] animate-fadeIn max-w-md"
            role="alert"
            aria-live="assertive"
        >
          {tempNotification}
        </div>
      )}
      <Card title={`Patient Workspace: ${patient.name} (ID: ${patient.demographics.patientId})`} 
        className="shadow-xl"
        titleClassName="text-xl"
      >
        <div className="border-b border-neutral-medium mb-6">
          <nav className="-mb-px flex space-x-1 overflow-x-auto" aria-label="Tabs">
            {PATIENT_WORKSPACE_TABS.map((tab) => (
              <NavLink
                key={tab.id}
                to={`/patient/${patient.id}/${tab.id}`}
                className={ location.pathname.endsWith(tab.id) ? `${baseNavClass} ${activeNavClass}` : `${baseNavClass} ${inactiveNavClass}` }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="animate-slideInUp">
          {renderTabContent()}
        </div>
      </Card>
    </div>
  );
};
