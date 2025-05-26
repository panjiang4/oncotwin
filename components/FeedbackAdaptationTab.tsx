
import React, { useState } from 'react';
import { Patient, ActualOutcome } from '../types';
import { Button } from './Button';
import { Card } from './Card';
import { TextArea, Input } from './Input';

interface FeedbackAdaptationTabProps {
  patient: Patient;
  onOutcomeAdded: (outcome: ActualOutcome) => void;
}

export const FeedbackAdaptationTab: React.FC<FeedbackAdaptationTabProps> = ({ patient, onOutcomeAdded }) => {
  const [outcomeDescription, setOutcomeDescription] = useState('');
  const [outcomeDate, setOutcomeDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAddOutcome = () => {
    if (!outcomeDescription.trim() || !outcomeDate) {
      alert("Please provide a description and date for the outcome.");
      return;
    }
    const newOutcome: ActualOutcome = {
      id: `outcome_${Date.now()}`,
      date: outcomeDate,
      description: outcomeDescription,
    };
    onOutcomeAdded(newOutcome);
    setOutcomeDescription('');
    // setOutcomeDate(new Date().toISOString().split('T')[0]); // Optionally reset date
  };

  const handleUpdateModel = () => {
    setIsUpdating(true);
    // Simulate model refinement
    setTimeout(() => {
      alert(`OncoTwin® model for ${patient.name} is being updated with new data. Future simulations will incorporate this new information for enhanced accuracy.`);
      setIsUpdating(false);
      // In a real app, this might trigger a backend process and update patient.virtualTumorModel.lastUpdated or similar
      // For demo, the parent component's onUpdate via onOutcomeAdded already updates lastUpdated on the patient object.
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card title="Input Actual Patient Outcomes">
        <p className="text-sm text-neutral-dark mb-4">
          Record the patient's actual response after a treatment cycle or follow-up. This data is crucial for refining the digital twin.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input 
                label="Date of Outcome/Observation"
                type="date"
                value={outcomeDate}
                onChange={(e) => setOutcomeDate(e.target.value)}
                containerClassName="md:col-span-1"
            />
        </div>
        <TextArea
          label="Describe Actual Outcome"
          placeholder="e.g., Tumor size reduced by 15% on follow-up scan. Patient reported Grade 2 neuropathy. CEA levels decreased to 5 ng/mL."
          value={outcomeDescription}
          onChange={(e) => setOutcomeDescription(e.target.value)}
          rows={4}
        />
        <div className="mt-4">
          <Button onClick={handleAddOutcome} variant="secondary">Add Outcome to Record</Button>
        </div>
      </Card>

      <Card title="Model Refinement">
        <p className="text-sm text-neutral-dark mb-4">
          Once new outcome data is recorded, you can trigger the OncoTwin® model to learn from this new information.
        </p>
        <Button 
            onClick={handleUpdateModel} 
            variant="primary" 
            isLoading={isUpdating}
            disabled={patient.actualOutcomes.length === 0}
        >
          {isUpdating ? "Updating Model..." : "Update Digital Twin with New Data"}
        </Button>
        {patient.actualOutcomes.length === 0 && <p className="text-xs text-neutral-dark mt-2">Add at least one actual outcome before updating the model.</p>}
      </Card>

      {patient.actualOutcomes.length > 0 && (
        <Card title="Recorded Actual Outcomes">
            <ul className="space-y-3 max-h-96 overflow-y-auto">
                {patient.actualOutcomes.slice().reverse().map(outcome => (
                    <li key={outcome.id} className="p-3 border rounded-md bg-neutral-lightest">
                        <p className="font-semibold text-neutral-darkest">{outcome.description}</p>
                        <p className="text-xs text-neutral-dark">Date: {new Date(outcome.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </Card>
      )}
    </div>
  );
};
