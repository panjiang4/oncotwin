
import React, { useState, useEffect, useMemo } from 'react';
import { Patient, TreatmentRegimen, SimulationScenario, PredictionResult, PatientSimulation } from '../types';
import { MOCK_SIMULATION_PROGRESS_DURATION } from '../constants'; // TREATMENT_REGIMENS is no longer directly used here for selection
import { Button } from './Button';
import { Card } from './Card';
// Removed Select component import as we are using native selects for closer HTML match
import { PredictionInsightsDashboard } from './PredictionInsightsDashboard';
import { LoadingSpinner } from './LoadingSpinner';

interface TreatmentSimulationTabProps {
  patient: Patient;
  onSimulationComplete: (simulation: PatientSimulation) => void;
}

interface ScenarioOption {
  id: string;
  label: string;
  description: string;
}

interface ScenarioCategory {
  title: string;
  options: ScenarioOption[];
}

const treatmentScenarioCategories: ScenarioCategory[] = [
  {
    title: "Surgical Treatment",
    options: [
      { id: "curative-surgery", label: "Curative Surgery", description: "Primary resection for early to locally advanced disease" },
      { id: "metastasectomy", label: "Metastasectomy", description: "Surgical resection of isolated metastases" },
      { id: "palliative-surgery", label: "Palliative Surgery", description: "Symptom relief procedures (bypass, stenting)" },
    ]
  },
  {
    title: "Systemic Therapy Intent",
    options: [
      { id: "neoadjuvant", label: "Neoadjuvant Treatment", description: "Pre-operative therapy to downsize tumor" },
      { id: "adjuvant", label: "Adjuvant Treatment", description: "Post-operative therapy to prevent recurrence" },
      { id: "palliative-systemic", label: "Palliative Treatment", description: "Treatment for metastatic/advanced disease" },
    ]
  },
  {
    title: "Radiation Therapy",
    options: [
      { id: "preop-radiation", label: "Preoperative Radiation", description: "Neoadjuvant radiation ± chemotherapy" },
      { id: "postop-radiation", label: "Postoperative Radiation", description: "Adjuvant radiation for high-risk features" },
      { id: "palliative-radiation", label: "Palliative Radiation", description: "Symptom control for metastases or local disease" },
      { id: "sbrt", label: "Stereotactic Radiation (SBRT)", description: "Focused high-dose radiation for oligometastases" },
    ]
  },
  {
    title: "Treatment Line",
    options: [
      { id: "first-line", label: "First-Line Treatment", description: "Initial systemic therapy for metastatic disease" },
      { id: "second-line", label: "Second-Line Treatment", description: "Treatment after first-line progression" },
      { id: "later-line", label: "Later-Line Treatment", description: "Third-line and beyond salvage therapy" },
    ]
  },
  {
    title: "Supportive Care",
    options: [
      { id: "symptom-management", label: "Symptom Management", description: "Pain control, nausea, bowel management" },
      { id: "microbiome-support", label: "Microbiome Support", description: "Probiotics, prebiotics, microbiome optimization" },
      { id: "nutritional-support", label: "Nutritional Support", description: "Dietary counseling, supplementation" },
      { id: "psychosocial-support", label: "Psychosocial Support", description: "Counseling, support groups, mental health" },
    ]
  }
];

const parameterSelectStyle = "w-full p-2.5 border-2 border-neutral-300 rounded-md text-sm text-neutral-700 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none";
const parameterInputStyle = "w-full p-2.5 border-2 border-neutral-300 rounded-md text-sm text-neutral-700 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
const customSelectArrowStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.75rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1rem',
    paddingRight: '2.5rem', // Keep enough padding for the arrow
};


export const TreatmentSimulationTab: React.FC<TreatmentSimulationTabProps> = ({ patient, onSimulationComplete }) => {
  // --- State for new scenario selection ---
  const [selectedScenarioIds, setSelectedScenarioIds] = useState<Record<string, boolean>>({});

  // --- State for new parameters ---
  const [chemoDosage, setChemoDosage] = useState<string>('standard');
  const [radiationDose, setRadiationDose] = useState<string>('standard-preop');
  const [treatmentSchedule, setTreatmentSchedule] = useState<string>('weekly');
  const [treatmentDuration, setTreatmentDuration] = useState<string>('3-months');
  const [simDuration, setSimDuration] = useState<string>('24');
  const [complianceRate, setComplianceRate] = useState<number>(85);
  const [toxicityTolerance, setToxicityTolerance] = useState<string>('low');
  const [microbiomeIntervention, setMicrobiomeIntervention] = useState<string>('none');
  const [supportiveCareLevel, setSupportiveCareLevel] = useState<string>('basic');

  // --- Existing state for simulation flow ---
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [currentScenarioForDisplay, setCurrentScenarioForDisplay] = useState<any | null>(null); // Adapted for new scenario structure


  const handleScenarioChange = (id: string) => {
    setSelectedScenarioIds(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const selectedScenariosSummary = useMemo(() => {
    const selectedLabels = treatmentScenarioCategories.flatMap(category =>
      category.options.filter(opt => selectedScenarioIds[opt.id]).map(opt => opt.label)
    );
    if (selectedLabels.length === 0) {
      return <span className="text-neutral-500 italic">No scenarios selected</span>;
    }
    return <span className="text-green-600 font-medium">{selectedLabels.join(', ')}</span>;
  }, [selectedScenarioIds]);

  const isAnyScenarioSelected = useMemo(() => {
    return Object.values(selectedScenarioIds).some(isSelected => isSelected);
  }, [selectedScenarioIds]);

  const runSimulation = () => {
    if (!isAnyScenarioSelected) {
      alert("Please select at least one treatment scenario.");
      return;
    }

    setIsSimulating(true);
    setPredictionResult(null);
    setSimulationProgress(0);

    const collectedSelectedScenarios = treatmentScenarioCategories.flatMap(category =>
        category.options.filter(opt => selectedScenarioIds[opt.id])
                       .map(opt => ({ name: opt.label, id: opt.id, type: category.title }))
    );

    const scenarioDataForSimulation: any = {
      id: `sim_${Date.now()}`,
      selectedRegimens: collectedSelectedScenarios, // For PredictionInsightsDashboard compatibility (uses .name)
      dosage: chemoDosage, // For PredictionInsightsDashboard
      schedule: treatmentSchedule, // For PredictionInsightsDashboard
      allParameters: {
        chemoDosage,
        radiationDose,
        treatmentSchedule,
        treatmentDuration,
        simDurationMonths: parseInt(simDuration) || 24,
        complianceRate,
        toxicityTolerance,
        microbiomeIntervention,
        supportiveCareLevel,
        rawSelectedScenarioIds: Object.entries(selectedScenarioIds).filter(([,v]) => v).map(([k]) => k),
      }
    };
    setCurrentScenarioForDisplay(scenarioDataForSimulation);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setSimulationProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const mockPrediction: PredictionResult = {
          efficacy: {
            tumorResponsePercentage: Math.floor(Math.random() * 101) - 70,
            successProbabilityScore: Math.floor(Math.random() * 51) + 50,
            timeToProgressionMonths: Math.floor(Math.random() * 12) + 6,
            confidenceInterval: [Math.floor(Math.random() * 10) + 45, Math.floor(Math.random() * 10) + 75].sort((a,b)=>a-b) as [number, number],
          },
          potentialSideEffects: [
            { name: "Nausea", predictedRiskLevel: (["Low", "Medium", "High"] as const)[Math.floor(Math.random()*3)] },
            { name: "Fatigue", predictedRiskLevel: (["Low", "Medium", "High"] as const)[Math.floor(Math.random()*3)] },
          ],
          interpretableAI: {
            keyPredictiveFactors: [
              `Genomic: ${patient.genomicData.keyMarkers[0]?.name || 'N/A'} (${patient.genomicData.keyMarkers[0]?.value || 'N/A'})`,
              `Microbiome: ${patient.microbiomeData.keySignatures[0]?.name || 'N/A'} (${patient.microbiomeData.keySignatures[0]?.value || 'N/A'})`,
              `Clinical: Age ${patient.demographics.age}`,
            ].slice(0, Math.floor(Math.random()*2)+2),
            influenceData: [
              { category: "Genomics", importance: Math.floor(Math.random() * 50) + 20 },
              { category: "Microbiome", importance: Math.floor(Math.random() * 40) + 10 },
              { category: "Imaging", importance: Math.floor(Math.random() * 30) + 5 },
              { category: "Clinical", importance: Math.floor(Math.random() * 20) + 5 },
            ],
            decisionPathwaySnippet: `The algorithm predicts a ${Math.random() > 0.5 ? 'favorable' : 'moderate'} response...`,
          },
        };
        setPredictionResult(mockPrediction);
        setIsSimulating(false);
        
        const completedSimulation: PatientSimulation = {
          id: `psim_${Date.now()}`,
          scenario: scenarioDataForSimulation, // Use the adapted scenario
          result: mockPrediction,
          simulationDate: new Date().toISOString(),
        };
        onSimulationComplete(completedSimulation);
      }
    }, MOCK_SIMULATION_PROGRESS_DURATION / 10);
  };

  return (
    <div className="space-y-6">
        {/* New Step 1 & 2 UI */}
        <div className="max-w-screen-xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-neutral-darkest">Colorectal Cancer Treatment Simulator</h1>

            {/* Step 1: Define Treatment Scenarios */}
            <div className="text-xl font-semibold text-neutral-darkest mt-6 mb-4 pb-2 border-b-2 border-primary">Step 1: Define Treatment Scenarios</div>
            <div className="bg-blue-100 border-l-4 border-blue-500 p-3 mb-4 rounded">
                <p className="text-blue-700 text-sm"><strong>Note:</strong> You can select multiple scenarios that may be used together in combination or sequence for comprehensive patient care.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                {treatmentScenarioCategories.map(category => (
                    <div key={category.title} className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                        <div className="text-md font-semibold text-neutral-700 mb-3 pb-1.5 border-b border-primary-light">{category.title}</div>
                        {category.options.map(option => (
                            <div key={option.id} className="flex items-start mb-1.5 py-1">
                                <input 
                                    type="checkbox" 
                                    id={option.id} 
                                    checked={!!selectedScenarioIds[option.id]}
                                    onChange={() => handleScenarioChange(option.id)}
                                    className="mr-2.5 mt-1 h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded cursor-pointer"
                                />
                                <div className="flex-1">
                                    <label htmlFor={option.id} className="font-medium text-sm text-neutral-800 mb-0.5 cursor-pointer block">{option.label}</label>
                                    <div className="text-xs text-neutral-600 leading-tight">{option.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200 my-4">
                <div className="text-md font-semibold text-neutral-700 mb-2">Selected Treatment Scenarios:</div>
                <div>{selectedScenariosSummary}</div>
            </div>

            {/* Step 2: Treatment Parameters */}
            <div className="text-xl font-semibold text-neutral-darkest mt-6 mb-4 pb-2 border-b-2 border-primary">Step 2: Treatment Parameters</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Parameter Groups */}
                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="chemo-dosage">Chemotherapy Dosage</label>
                    <select id="chemo-dosage" value={chemoDosage} onChange={e => setChemoDosage(e.target.value)} className={parameterSelectStyle} style={customSelectArrowStyle}>
                        <option value="standard">Standard (100%)</option>
                        <option value="reduced-mild">Reduced - Mild (85%)</option>
                        <option value="reduced-moderate">Reduced - Moderate (75%)</option>
                        <option value="reduced-severe">Reduced - Severe (65%)</option>
                        <option value="intensified">Intensified (110%)</option>
                    </select>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Dose intensity relative to standard protocols</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="radiation-dose">Radiation Dose</label>
                    <select id="radiation-dose" value={radiationDose} onChange={e => setRadiationDose(e.target.value)} className={parameterSelectStyle} style={customSelectArrowStyle}>
                        <option value="standard-preop">Standard Preop (50.4 Gy)</option>
                        <option value="short-course">Short Course (25 Gy)</option>
                        <option value="standard-postop">Standard Postop (45-50.4 Gy)</option>
                        <option value="sbrt">SBRT (30-50 Gy)</option>
                        <option value="palliative">Palliative (20-30 Gy)</option>
                    </select>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Total radiation dose and fractionation</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="treatment-schedule">Treatment Schedule</label>
                    <select id="treatment-schedule" value={treatmentSchedule} onChange={e => setTreatmentSchedule(e.target.value)} className={parameterSelectStyle} style={customSelectArrowStyle}>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Biweekly (Q2W)</option>
                        <option value="triweekly">Triweekly (Q3W)</option>
                        <option value="daily">Daily</option>
                        <option value="continuous">Continuous</option>
                    </select>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Frequency of treatment administration</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="treatment-duration">Treatment Duration</label>
                    <select id="treatment-duration" value={treatmentDuration} onChange={e => setTreatmentDuration(e.target.value)} className={parameterSelectStyle} style={customSelectArrowStyle}>
                        <option value="3-months">3 months</option>
                        <option value="6-months">6 months</option>
                        <option value="12-months">12 months</option>
                        <option value="until-progression">Until progression</option>
                        <option value="maintenance">Maintenance phase</option>
                    </select>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Total planned treatment duration</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="sim-duration">Simulation Duration (months)</label>
                    <input type="number" id="sim-duration" value={simDuration} onChange={e => setSimDuration(e.target.value)} min="1" max="60" className={parameterInputStyle} />
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Total simulation time in months</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="compliance-rate">Compliance Rate</label>
                    <input type="range" id="compliance-rate" min="60" max="100" value={complianceRate} onChange={e => setComplianceRate(parseInt(e.target.value))} className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary mt-1" />
                    <div className="text-center text-sm font-medium text-primary mt-1" id="compliance-value">{complianceRate}%</div>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Expected patient adherence to treatment</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="toxicity-tolerance">Toxicity Tolerance</label>
                    <select id="toxicity-tolerance" value={toxicityTolerance} onChange={e => setToxicityTolerance(e.target.value)} className={parameterSelectStyle} style={customSelectArrowStyle}>
                        <option value="low">Low (Conservative)</option>
                        <option value="standard">Standard</option>
                        <option value="high">High (Aggressive)</option>
                    </select>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Acceptable toxicity level for dose modifications</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="microbiome-intervention">Microbiome Intervention</label>
                    <select id="microbiome-intervention" value={microbiomeIntervention} onChange={e => setMicrobiomeIntervention(e.target.value)} className={parameterSelectStyle} style={customSelectArrowStyle}>
                        <option value="none">None</option>
                        <option value="probiotics">Probiotics Only</option>
                        <option value="prebiotics">Prebiotics Only</option>
                        <option value="synbiotics">Probiotics + Prebiotics</option>
                        <option value="fmt">FMT Support</option>
                    </select>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Microbiome intervention type</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-md border border-neutral-200">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5" htmlFor="supportive-care">Supportive Care Level</label>
                    <select id="supportive-care" value={supportiveCareLevel} onChange={e => setSupportiveCareLevel(e.target.value)} className={parameterSelectStyle} style={customSelectArrowStyle}>
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="comprehensive">Comprehensive</option>
                        <option value="palliative">Palliative Focus</option>
                    </select>
                    <div className="text-xs text-neutral-500 mt-0.5 leading-tight">Level of supportive care interventions</div>
                </div>
            </div>

            <Button 
                variant="primary" 
                size="lg" 
                onClick={runSimulation} 
                isLoading={isSimulating}
                disabled={isSimulating || !isAnyScenarioSelected}
                className="w-full max-w-md mx-auto block mt-6 mb-8"
            >
                {isSimulating ? "Processing Simulation..." : (!isAnyScenarioSelected ? "Select Treatment Scenarios First" : "Run Treatment Simulation")}
            </Button>
        </div>


        {/* Existing Simulation Progress and Results Display */}
        {isSimulating && (
            <Card title="Simulation In Progress...">
            <p className="text-center text-primary mb-2">Simulating Treatment Responses with Interpretable AI...</p>
            <div className="w-full bg-neutral-light rounded-full h-4 mb-4 overflow-hidden border">
                <div
                className="bg-primary h-4 rounded-full transition-all duration-300 ease-linear"
                style={{ width: `${simulationProgress}%` }}
                ></div>
            </div>
            <div className="text-center text-sm text-neutral-dark">{simulationProgress}% Complete</div>
            <LoadingSpinner text="Analyzing complex data..." />
            </Card>
        )}

        {predictionResult && currentScenarioForDisplay && (
            <PredictionInsightsDashboard 
                patient={patient} 
                scenario={currentScenarioForDisplay} 
                result={predictionResult} 
            />
        )}

        {patient.simulations.length > 0 && !predictionResult && !isSimulating && (
            <Card title="Previous Simulations">
            <ul className="space-y-3">
                {patient.simulations.slice().reverse().map(sim => (
                <li key={sim.id} className="p-3 border rounded-md bg-neutral-lightest">
                    <div className="flex justify-between items-center">
                        <h5 className="font-semibold text-neutral-darkest">
                            Scenario: {(sim.scenario.selectedRegimens as Array<{name: string}> || []).map(r => r.name).join(' + ') || 'Custom Scenario'}
                        </h5>
                        <Button size="sm" variant="ghost" onClick={() => {
                            setCurrentScenarioForDisplay(sim.scenario);
                            setPredictionResult(sim.result);
                            // Ensure smooth scroll to prediction dashboard
                            const predictionDashboardElement = document.getElementById('prediction-insights-dashboard'); // Assuming PredictionInsightsDashboard has an id
                            if (predictionDashboardElement) {
                                predictionDashboardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            } else {
                                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Fallback
                            }
                        }}>View Details</Button>
                    </div>
                    <p className="text-xs text-neutral-dark">Date: {new Date(sim.simulationDate).toLocaleString()}</p>
                    <p className="text-sm mt-1">Predicted Success: <span className="font-medium">{sim.result.efficacy.successProbabilityScore}%</span></p>
                </li>
                ))}
            </ul>
            </Card>
        )}
    </div>
  );
};
