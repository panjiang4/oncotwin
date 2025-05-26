
import React from 'react';
import { Patient, PredictionResult, SimulationScenario } from '../types';
import { Card } from './Card';
import { WaterfallPlot } from './WaterfallPlot';
// import { InfluenceBarChart } from './InfluenceBarChart'; // No longer used here
import { TimeToProgressionChart } from './TimeToProgressionChart'; // Assuming you'll create this

interface PredictionInsightsDashboardProps {
  patient: Patient;
  scenario: SimulationScenario;
  result: PredictionResult;
}

const ProgressBar: React.FC<{ label: string; value: number; maxValue?: number; barColor?: string; trackColor?: string }> = ({
  label,
  value,
  maxValue = 100,
  barColor = 'bg-purple-600',
  trackColor = 'bg-neutral-200'
}) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-neutral-700">{label}:</span>
        <span className="text-sm font-medium text-neutral-700">{value}%</span>
      </div>
      <div className={`w-full ${trackColor} rounded-full h-3.5`}>
        <div className={`${barColor} h-3.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};


export const PredictionInsightsDashboard: React.FC<PredictionInsightsDashboardProps> = ({ patient, scenario, result }) => {
  const { efficacy, potentialSideEffects, interpretableAI } = result;

  const getRiskColor = (risk: "Low" | "Medium" | "High") => {
    if (risk === "Low") return "text-green-600 bg-green-100";
    if (risk === "Medium") return "text-yellow-600 bg-yellow-100";
    if (risk === "High") return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100";
  };
  
  // Helper to get influence data for specific categories for the 2x2 grid
  const getInfluenceValue = (categoryName: "Genomics" | "Microbiome" | "Imaging" | "Clinical") => {
    return interpretableAI.influenceData.find(d => d.category === categoryName)?.importance || 0;
  };

  return (
    <Card title="Step 3: Prediction & Insights Dashboard" className="animate-fadeIn border-primary border-2">
      <div className="mb-6 p-4 bg-primary-light/10 rounded-lg">
        <h4 className="text-lg font-semibold text-primary-dark mb-1">
          Simulation for: {scenario.selectedRegimens.map(r => r.name).join(' + ')}
        </h4>
        <p className="text-sm text-neutral-dark">Dosage: {scenario.dosage}, Schedule: {scenario.schedule}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Predicted Efficacy" bodyClassName="space-y-4">
          <div>
            <h5 className="font-semibold text-neutral-darkest">Tumor Response:</h5>
            <p className={`text-2xl font-bold ${efficacy.tumorResponsePercentage < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {efficacy.tumorResponsePercentage >= 0 ? '+' : ''}{efficacy.tumorResponsePercentage}% Change
            </p>
            <WaterfallPlot data={[{ name: 'Tumor Size Change', value: efficacy.tumorResponsePercentage }]} />
          </div>
          <div>
            <h5 className="font-semibold text-neutral-darkest">Treatment Success Probability Score:</h5>
            <p className="text-3xl font-bold text-primary">{efficacy.successProbabilityScore}%</p>
            {efficacy.confidenceInterval && <p className="text-sm text-neutral-dark">Confidence Interval: {efficacy.confidenceInterval[0]}% - {efficacy.confidenceInterval[1]}%</p>}
          </div>
          {efficacy.timeToProgressionMonths && (
            <div>
                <h5 className="font-semibold text-neutral-darkest">Predicted Time-to-Progression:</h5>
                <p className="text-xl font-bold text-primary-dark">{efficacy.timeToProgressionMonths} months</p>
                {/* Placeholder for TimeToProgressionChart if more data points available */}
                {/* <TimeToProgressionChart data={...} /> */}
            </div>
           )}
        </Card>

        <Card title="Potential Side Effects" bodyClassName="space-y-2">
          {potentialSideEffects.map(effect => (
            <div key={effect.name} className="flex justify-between items-center p-2 border-b">
              <span className="text-sm text-neutral-darkest">{effect.name}</span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getRiskColor(effect.predictedRiskLevel)}`}>
                {effect.predictedRiskLevel} Risk
              </span>
            </div>
          ))}
           {potentialSideEffects.length === 0 && <p className="text-sm text-neutral-dark">No significant side effects predicted for this scenario.</p>}
        </Card>
      </div>

      <Card title="Interpretable AI - &quot;The 'Why' Behind the Prediction&quot;:" className="bg-purple-50 border border-purple-200 rounded-lg" bodyClassName="p-6">
        <div className="mb-6">
          <h3 className="text-md font-semibold text-neutral-800 mb-2">Key Predictive Factors:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 pl-2">
            {interpretableAI.keyPredictiveFactors.map((factor, i) => <li key={i}>{factor}</li>)}
          </ul>
        </div>
        
        <div className="mb-6">
            <h3 className="text-md font-semibold text-neutral-800 mb-3">Influence Visualization:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <ProgressBar label="Genomics" value={getInfluenceValue("Genomics")} trackColor="bg-purple-100" barColor="bg-purple-600" />
                <ProgressBar label="Microbiome" value={getInfluenceValue("Microbiome")} trackColor="bg-purple-100" barColor="bg-purple-600" />
                <ProgressBar label="Imaging" value={getInfluenceValue("Imaging")} trackColor="bg-purple-100" barColor="bg-purple-600" />
                <ProgressBar label="Clinical" value={getInfluenceValue("Clinical")} trackColor="bg-purple-100" barColor="bg-purple-600" />
            </div>
        </div>

        <div>
          <h3 className="text-md font-semibold text-neutral-800 mb-2">Decision Pathway Snippet (Conceptual):</h3>
          <p className="text-sm text-neutral-700 italic">
            {interpretableAI.decisionPathwaySnippet}
          </p>
        </div>
      </Card>
    </Card>
  );
};
