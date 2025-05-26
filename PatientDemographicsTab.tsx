
import React, { useState, useEffect } from 'react';
import { Patient, PatientDemographics, ClinicalHistory } from '../types';
import { Input, TextArea } from './Input';
import { Button } from './Button';
import { Card } from './Card';
import { Select } from './Select';

interface PatientDemographicsTabProps {
  patient: Patient;
  onUpdate: (updatedData: Partial<Pick<Patient, 'demographics' | 'clinicalHistory'>>) => void;
}

export const PatientDemographicsTab: React.FC<PatientDemographicsTabProps> = ({ patient, onUpdate }) => {
  const [demographics, setDemographics] = useState<PatientDemographics>(patient.demographics);
  const [clinicalHistory, setClinicalHistory] = useState<ClinicalHistory>(patient.clinicalHistory);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setDemographics(patient.demographics);
    setClinicalHistory(patient.clinicalHistory);
    setIsEditing(false); // Reset editing state when patient changes
  }, [patient]);

  const handleDemographicsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDemographics(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }));
  };

  const handleClinicalHistoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "comorbidities" || name === "pastTreatments") {
        setClinicalHistory(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
    } else {
        setClinicalHistory(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    onUpdate({ demographics, clinicalHistory });
    setIsEditing(false);
  };
  
  const FieldDisplay: React.FC<{label: string, value: string | number | string[]}> = ({label, value}) => (
    <div className="mb-3">
        <dt className="text-sm font-medium text-neutral-dark">{label}</dt>
        <dd className="mt-1 text-sm text-neutral-darkest">{Array.isArray(value) ? value.join(', ') : value}</dd>
    </div>
  );


  return (
    <div className="space-y-6">
      <Card 
        title="Patient Demographics"
        actions={!isEditing && <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>}
      >
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Input label="Patient ID" name="patientId" value={demographics.patientId} onChange={handleDemographicsChange} disabled />
            <Input label="Age" name="age" type="number" value={demographics.age} onChange={handleDemographicsChange} />
            <Select 
                label="Sex" 
                name="sex" 
                value={demographics.sex} 
                onChange={handleDemographicsChange}
                options={[
                    {value: "Male", label: "Male"},
                    {value: "Female", label: "Female"},
                    {value: "Other", label: "Other"},
                ]}
            />
          </div>
        ) : (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FieldDisplay label="Patient ID" value={demographics.patientId} />
            <FieldDisplay label="Age" value={demographics.age} />
            <FieldDisplay label="Sex" value={demographics.sex} />
          </dl>
        )}
      </Card>

      <Card 
        title="Clinical History & Diagnosis"
        actions={!isEditing && <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>}
      >
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Input label="CRC Diagnosis Date" name="diagnosisDate" type="date" value={clinicalHistory.diagnosisDate} onChange={handleClinicalHistoryChange} />
            <Input label="CRC Stage" name="stage" value={clinicalHistory.stage} onChange={handleClinicalHistoryChange} />
            <Input label="Tumor Location" name="location" value={clinicalHistory.location} onChange={handleClinicalHistoryChange} />
            <TextArea label="Comorbidities (comma-separated)" name="comorbidities" value={clinicalHistory.comorbidities.join(', ')} onChange={handleClinicalHistoryChange} />
            <TextArea label="Past Treatments (comma-separated)" name="pastTreatments" value={clinicalHistory.pastTreatments.join(', ')} onChange={handleClinicalHistoryChange} />
          </div>
        ) : (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <FieldDisplay label="CRC Diagnosis Date" value={clinicalHistory.diagnosisDate} />
            <FieldDisplay label="CRC Stage" value={clinicalHistory.stage} />
            <FieldDisplay label="Tumor Location" value={clinicalHistory.location} />
            <FieldDisplay label="Comorbidities" value={clinicalHistory.comorbidities} />
            <FieldDisplay label="Past Treatments" value={clinicalHistory.pastTreatments} />
          </dl>
        )}
      </Card>
      
      {isEditing && (
        <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => { setIsEditing(false); setDemographics(patient.demographics); setClinicalHistory(patient.clinicalHistory);}}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};
