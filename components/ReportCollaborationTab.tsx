
import React from 'react';
import { Patient } from '../types';
import { Card } from './Card';
import { Button } from './Button';

// Icon for Document/Report
const DocumentReportIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 3a1 1 0 000 2h6a1 1 0 100-2H7zM7 9a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h2a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);

// Icon for Share
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M15 8a3 3 0 10-2.977-2.684l-3.213 1.607a3.001 3.001 0 00-1.618 0l-3.213-1.607A3 3 0 103 8a3 3 0 00.283 1.187L3 9.5v.044l.424.848.975 1.95A1 1 0 006.207 13H7a1 1 0 100-2H6.207l-.975-1.95-.424-.848A3.001 3.001 0 005 8c0-1.657 1.343-3 3-3s3 1.343 3 3a3.001 3.001 0 00-.793 1.952l.424.848.975 1.95H13a1 1 0 100-2h-.207l-.975-1.95-.424-.848A3.001 3.001 0 0012 8c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3c-.173 0-.343-.015-.508-.044L15 10.5v-.044l-.283-.593A3.001 3.001 0 0015 8z" />
  </svg>
);

interface ReportCollaborationTabProps {
  patient: Patient;
  showTemporaryNotification: (message: string) => void;
}

export const ReportCollaborationTab: React.FC<ReportCollaborationTabProps> = ({ patient, showTemporaryNotification }) => {
  const handleGenerateReport = () => {
    showTemporaryNotification(`Generating comprehensive PDF report for ${patient.name} (Simulated)...`);
    // In a real app, this would trigger a backend process to generate a PDF
  };

  const handleShare = () => {
    showTemporaryNotification(`Preparing to share de-identified summary for ${patient.name} (Simulated)...`);
    // In a real app, this would open a sharing modal/feature
  };

  return (
    <div className="space-y-6 animate-slideInUp">
      <Card 
        title="Generate Comprehensive Report"
        bodyClassName="bg-neutral-lightest/30 p-6" // Adjusted background
      >
        <p className="text-neutral-darkest mb-4 leading-relaxed">
          Generate a detailed PDF report summarizing the patient's digital twin profile. This includes all integrated data (genomic, imaging, microbiome, clinical), simulated treatment scenarios, predicted outcomes, and the interpretable AI rationale behind predictions.
        </p>
        <Button
          onClick={handleGenerateReport}
          variant="primary"
          size="md"
          leftIcon={<DocumentReportIcon className="h-5 w-5" />}
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          Generate PDF Report (Simulated)
        </Button>
      </Card>

      <Card 
        title="Share & Collaborate (Conceptual)"
        bodyClassName="bg-neutral-lightest/30 p-6" // Adjusted background
      >
        <p className="text-neutral-darkest mb-4 leading-relaxed">
          Securely share a de-identified summary of the patient's case and simulation results with trusted colleagues for second opinions or multidisciplinary team discussions. This feature is conceptual in the current demonstration.
        </p>
        <Button
          onClick={handleShare}
          variant="outline"
          size="md"
          leftIcon={<ShareIcon className="h-5 w-5" />}
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          Share De-identified Summary (Simulated)
        </Button>
      </Card>

       <Card 
        title="Collaboration Workflow Example (Conceptual)"
        bodyClassName="bg-neutral-lightest/30 p-6" // Adjusted background
       >
        <div className="prose prose-sm max-w-none text-neutral-darkest leading-relaxed">
            <p>This section illustrates a potential collaboration workflow enabled by OncoTwin® for patient <strong>{patient.name}</strong>:</p>
            <ol className="space-y-1">
                <li><strong>Initiate Consultation:</strong> Dr. Eva Rostova identifies a complex aspect of the patient's case.</li>
                <li><strong>Select Data to Share:</strong> Using the "Share" feature, Dr. Rostova selects specific de-identified data points, key insights from the virtual tumor model, and relevant simulation results.</li>
                <li><strong>Invite Collaborators:</strong> Dr. Rostova invites Dr. Smith (Oncology Specialist) and Dr. Jones (Radiomics Expert) to a secure, temporary virtual workspace dedicated to this consultation.</li>
                <li><strong>Asynchronous Review & Discussion:</strong> Collaborators review the shared information at their convenience and provide their input, questions, and recommendations via integrated (simulated) communication tools.</li>
                <li><strong>Consensus & Decision:</strong> The team discusses the inputs and aims to reach a consensus on the next steps or adjustments to the treatment approach. Dr. Rostova can then log this decision.</li>
                <li><strong>Audit Trail:</strong> All interactions, shared data versions, and decisions are logged for compliance and future reference (simulated).</li>
            </ol>
            <p className="mt-3 text-xs text-accent">
              <em>Note: The actual sharing, communication tools, and secure workspace functionalities are not implemented in this demonstration platform. This illustrates the intended capability.</em>
            </p>
        </div>
      </Card>
    </div>
  );
};
