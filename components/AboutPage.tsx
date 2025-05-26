
import React from 'react';
import { Card } from './Card';
import { OncoTwinLogo } from '../constants';

export const AboutPage: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <OncoTwinLogo className="h-16 w-auto" />
        <div>
            <h1 className="text-3xl font-bold text-neutral-darkest">About OncoTwin®</h1>
            <p className="text-lg text-primary">Better Outcomes. Smarter Choices. Powered by Data.</p>
        </div>
      </div>
      
      <Card title="Our Mission & Vision">
        <p className="text-neutral-darkest leading-relaxed mb-3">
          OncoTwin® aims to revolutionize cancer care by leveraging the power of digital twin technology and artificial intelligence. 
          Our mission is to empower oncologists with precise, personalized, and interpretable insights to optimize treatment strategies and improve patient outcomes.
        </p>
        <p className="text-neutral-darkest leading-relaxed">
          We envision a future where every cancer patient benefits from a dynamic, data-driven digital representation of their unique disease, guiding clinicians towards the most effective and least toxic therapies.
        </p>
      </Card>

      <Card title="Key Differentiators">
        <ul className="list-disc list-inside space-y-3 text-neutral-darkest">
          <li>
            <strong className="text-primary-dark">Multi-Modal Data Integration:</strong> OncoTwin® uniquely combines diverse data sources including genomics, medical imaging, pathology, clinical history, and crucially, the patient's microbiome profile. This holistic approach provides a more comprehensive understanding of the tumor and its microenvironment.
          </li>
          <li>
            <strong className="text-primary-dark">Dynamic Virtual Tumor Model:</strong> Our platform creates a continuously learning virtual representation of the patient's tumor. This "digital twin" adapts to new data, reflecting changes in the patient's condition and response to treatment over time.
          </li>
          <li>
            <strong className="text-primary-dark">Interpretable AI & Explainability:</strong> We prioritize transparency. OncoTwin® doesn't just provide predictions; it offers insights into the 'why' behind them. By highlighting key predictive factors and conceptual decision pathways, we build trust and enable clinicians to critically evaluate AI-driven recommendations.
          </li>
          <li>
            <strong className="text-primary-dark">Focus on Microbiome:</strong> Recognizing the growing importance of the gut microbiome in cancer development, progression, and treatment response (especially for CRC and immunotherapy), OncoTwin® incorporates microbiome data as a core component of its predictive models.
          </li>
          <li>
            <strong className="text-primary-dark">Personalized Treatment Simulation:</strong> Clinicians can simulate various treatment scenarios, including combinations of chemotherapy, radiotherapy, immunotherapy, targeted therapies, and even conceptual microbiome-targeting interventions. The platform predicts efficacy and potential side effects for each scenario.
          </li>
          <li>
            <strong className="text-primary-dark">Closed-Loop Feedback System:</strong> By incorporating actual patient outcomes, OncoTwin® refines its models, enhancing predictive accuracy for individual patients and contributing to a broader knowledge base for future predictions.
          </li>
        </ul>
      </Card>

      <Card title="Focus: Colorectal Cancer (CRC)">
        <p className="text-neutral-darkest leading-relaxed">
          While the OncoTwin® technology has broad applicability, this demonstration focuses on its application in Colorectal Cancer (CRC). CRC is a complex disease with diverse molecular subtypes and treatment responses, making it an ideal candidate for the personalized insights offered by our digital twin platform.
        </p>
      </Card>

      <div className="text-center text-sm text-neutral-dark mt-8">
        <p>&copy; {new Date().getFullYear()} OncoTwin® Initiative. This is a demonstration platform.</p>
      </div>
    </div>
  );
};
