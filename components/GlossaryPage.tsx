
import React from 'react';
import { GLOSSARY_TERMS } from '../constants';
import { Card } from './Card';

export const GlossaryPage: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-6">
      <h1 className="text-3xl font-bold text-neutral-darkest">Glossary</h1>
      <p className="text-neutral-dark">Key terms used within the OncoTwin® platform.</p>
      
      <div className="space-y-4">
        {GLOSSARY_TERMS.map(item => (
          <Card key={item.term} className="shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-1">{item.term}</h2>
            <p className="text-sm text-neutral-darkest leading-relaxed">{item.definition}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
