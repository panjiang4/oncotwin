
// Fix: Removed extraneous underscore from import statement
import React, { useState } from 'react';
import { Patient } from '../types';
import { PatientTable } from './PatientTable';
import { NotificationsPanel } from './NotificationsPanel'; // This is part of Header now
import { Button } from './Button';
import { PlusCircleIcon, DocumentMagnifyingGlassIcon } from '../constants';
import { Card } from './Card';
import { Modal } from './Modal';
import { Input } from './Input';
import { INITIAL_PATIENTS } from '../constants'; // For new patient template

interface DashboardProps {
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
  onAddNewPatient: (newPatient: Patient) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ patients, onSelectPatient, onAddNewPatient }) => {
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');

  const handleCreateNewPatient = () => {
    // For demo, create a patient with some defaults
    const newPatientId = `patient_${Date.now()}`;
    const newPatient: Patient = {
      ...INITIAL_PATIENTS[0], // Use first patient as a template
      id: newPatientId,
      name: newPatientName || `New Patient ${newPatientId.slice(-4)}`,
      demographics: {
        ...INITIAL_PATIENTS[0].demographics,
        patientId: newPatientId.toUpperCase(),
        age: newPatientAge ? parseInt(newPatientAge) : 60,
      },
      status: "Awaiting Simulation",
      simulations: [],
      actualOutcomes: [],
      virtualTumorModel: { ...INITIAL_PATIENTS[0].virtualTumorModel, lastUpdated: new Date().toISOString() },
    };
    onAddNewPatient(newPatient);
    setIsCreatePatientModalOpen(false);
    setNewPatientName('');
    setNewPatientAge('');
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-darkest">Welcome, Dr. Rostova!</h1>
        <div className="space-x-3">
          <Button 
            variant="primary" 
            onClick={() => setIsCreatePatientModalOpen(true)}
            leftIcon={<PlusCircleIcon className="h-5 w-5" />}
          >
            Create New Patient Digital Twin
          </Button>
          <Button 
            variant="outline" 
            onClick={() => alert("Access Research Database (Simulated)")}
            leftIcon={<DocumentMagnifyingGlassIcon className="h-5 w-5" />}
          >
            Access Research Database
          </Button>
        </div>
      </div>
      
      {/* Patient Overview */}
      <Card title="Patient Overview" className="animate-slideInUp">
        <PatientTable patients={patients} onSelectPatient={onSelectPatient} />
      </Card>

      {/* Example of another card for quick stats or something else */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Active Simulations" className="animate-slideInUp" bodyClassName="text-center">
            <p className="text-4xl font-bold text-primary">
                {patients.filter(p => p.status === "Awaiting Simulation" || p.status === "Simulation Complete").length}
            </p>
            <p className="text-neutral-dark">Simulations needing attention or completed.</p>
        </Card>
        <Card title="New Data Alerts" className="animate-slideInUp" bodyClassName="text-center">
            <p className="text-4xl font-bold text-secondary">
                {patients.filter(p => p.status === "New Data Available").length}
            </p>
            <p className="text-neutral-dark">Patients with recent data updates.</p>
        </Card>
         <Card title="Platform Status" className="animate-slideInUp" bodyClassName="text-center">
            <p className="text-4xl font-bold text-accent">Online</p>
            <p className="text-neutral-dark">OncoTwin® services are operational.</p>
        </Card>
      </div>

      {/* Modal for Creating New Patient */}
      <Modal
        isOpen={isCreatePatientModalOpen}
        onClose={() => setIsCreatePatientModalOpen(false)}
        title="Create New Patient Digital Twin"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsCreatePatientModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateNewPatient} className="ml-3">Create Patient</Button>
          </>
        }
      >
        <p className="text-sm text-neutral-dark mb-4">
          Enter basic details for the new patient. More information can be added later in the Patient Workspace. This will create a new digital twin based on a standard CRC template.
        </p>
        <Input 
          label="Patient Name (e.g., Jane K. Smith)" 
          value={newPatientName} 
          onChange={(e) => setNewPatientName(e.target.value)}
          placeholder="Enter patient name"
        />
        <Input 
          label="Patient Age" 
          type="number"
          value={newPatientAge} 
          onChange={(e) => setNewPatientAge(e.target.value)}
          placeholder="Enter patient age"
        />
      </Modal>
    </div>
  );
};
