
import React from 'react';
import { FAQ_ITEMS } from '../constants';
import { Card } from './Card';

export const HelpPage: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <h1 className="text-3xl font-bold text-neutral-darkest">Help & Documentation</h1>
      <p className="text-neutral-dark">Frequently Asked Questions and user guidance for the OncoTwin® demo platform.</p>
      
      <Card title="Frequently Asked Questions (FAQs)">
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="p-4 border-b border-neutral-light last:border-b-0">
              <h3 className="text-lg font-semibold text-primary mb-1">{item.question}</h3>
              <p className="text-sm text-neutral-darkest leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </Card>

       <Card title="Brief User Guide">
        <div className="prose prose-sm max-w-none text-neutral-darkest">
          <h4>Getting Started</h4>
          <ol>
            <li><strong>Login:</strong> Use the provided demo credentials to access the platform.</li>
            <li><strong>Dashboard:</strong> Get an overview of active patient digital twins. You can create a new patient twin or access a simulated research database.</li>
            <li><strong>Patient Workspace:</strong> Click 'View Workspace' for a patient. This is where you manage all data and simulations for that individual.</li>
          </ol>
          <h4>Patient Workspace Tabs</h4>
          <ul>
            <li><strong>Demographics & History:</strong> View or edit basic patient information.</li>
            <li><strong>Multi-Modal Data:</strong> Manage genomic, imaging, microbiome, and lab data. Use mock upload functions.</li>
            <li><strong>Virtual Tumor Model:</strong> See a conceptual visualization of the tumor and the OncoTwin® system.</li>
            <li><strong>Treatment Simulation:</strong> Define treatment scenarios, run mock simulations, and view predicted outcomes with AI interpretations.</li>
            <li><strong>Feedback & Adaptation:</strong> Input actual patient outcomes to simulate model refinement.</li>
          </ul>
          <h4>Interpretable AI</h4>
          <p>The "Prediction & Insights Dashboard" (in Treatment Simulation) showcases how OncoTwin® aims to provide understandable AI, including key predictive factors and conceptual decision pathways.</p>
          <h4>Reporting & Collaboration (Simulated)</h4>
          <p>Buttons to generate reports or share summaries are conceptual in this demo and will trigger alerts.</p>
        </div>
      </Card>

      <Card title="Contact Support (Demo)">
        <p className="text-sm text-neutral-darkest">For issues with this demo platform, please refer to the provided documentation or contact the demo administrator.</p>
        <p className="text-sm text-neutral-darkest mt-2">Email: <a href="mailto:support@oncotwin-demo.com" className="text-primary hover:underline">support@oncotwin-demo.com</a> (Not a real email)</p>
      </Card>
    </div>
  );
};
