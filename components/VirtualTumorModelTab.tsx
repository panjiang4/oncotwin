
import React from 'react';
import { Patient } from '../types';
import { Card } from './Card';

interface VirtualTumorModelTabProps {
  patient: Patient;
}

export const VirtualTumorModelTab: React.FC<VirtualTumorModelTabProps> = ({ patient }) => {
  const { virtualTumorModel } = patient;

  return (
    <div className="space-y-6">
      <Card title="The Virtual Tumor Model">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-neutral-darkest mb-2">Conceptual Tumor Visualization:</h4>
            <div className="w-full h-64 bg-neutral-light border border-neutral-medium rounded-md flex items-center justify-center overflow-hidden shadow-inner">
              {/* Placeholder for "dynamic" 3D tumor - using a slightly animated gradient or subtle pattern */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 animate-pulse opacity-75 flex items-center justify-center">
                 <span className="text-white text-sm font-semibold">Conceptual Tumor</span>
              </div>
            </div>
            <p className="text-xs text-neutral-dark mt-1">This is a conceptual representation, not an anatomical model. It indicates a "live" model that updates.</p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-darkest mb-2">Integrated Tumor Insights:</h4>
            <div className="space-y-2 text-sm p-4 bg-neutral-lightest rounded-md border">
              <p><strong className="text-neutral-dark">Simulated Growth Rate:</strong> {virtualTumorModel.simulatedGrowthRate}</p>
              <p><strong className="text-neutral-dark">Predicted Immune Infiltration:</strong> {virtualTumorModel.predictedImmuneInfiltration}</p>
              <p><strong className="text-neutral-dark">Microenvironment Factors:</strong> {virtualTumorModel.microenvironmentFactors}</p>
              <p className="text-xs text-primary mt-3">
                Note: This model continuously learns and updates with new patient data. Last updated: {new Date(virtualTumorModel.lastUpdated).toLocaleDateString()}.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="OncoTwin® Closed-Loop System Visualization">
        <div className="p-4 border border-neutral-medium rounded-lg bg-neutral-lightest shadow">
          <img 
            src="/oncotwin_closed_loop_diagram.png"
            alt="OncoTwin Closed-Loop System Diagram" 
            className="w-full h-auto object-contain rounded-md" 
          />
          <p className="text-xs text-center mt-4 text-neutral-dark">
            This diagram illustrates how new patient data refines the model, leading to more accurate simulations over time.
          </p>
        </div>
      </Card>
    </div>
  );
};
