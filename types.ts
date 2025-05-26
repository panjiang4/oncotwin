
export interface PatientDemographics {
  patientId: string;
  age: number;
  sex: "Male" | "Female" | "Other";
}

export interface ClinicalHistory {
  diagnosisDate: string;
  stage: string;
  location: string;
  comorbidities: string[];
  pastTreatments: string[];
}

export interface GenomicMarker {
  name: string;
  value: string;
}

export interface GenomicData {
  keyMarkers: GenomicMarker[];
  reportUploaded: boolean; 
}

export interface TumorCharacteristic {
  name: string;
  value: string;
}

export interface ImagingData {
  tumorCharacteristics: TumorCharacteristic[];
  dicomViewable: boolean; 
}

export interface MicrobiomeSignature {
  name: string;
  value: string;
  graphic?: string; // Placeholder for conceptual graphic path or identifier
}

export interface MicrobiomeData {
  keySignatures: MicrobiomeSignature[];
  stoolSampleReportUploaded: boolean;
  gutDiversityIndex: number;
}

export interface LabResult {
  markerName: string;
  value: string;
  unit: string;
}

export interface VirtualTumorModel {
  simulatedGrowthRate: string;
  predictedImmuneInfiltration: string;
  microenvironmentFactors: string;
  lastUpdated: string;
}

export type PatientStatus = "Awaiting Simulation" | "New Data Available" | "Simulation Complete" | "Active Treatment";

export interface Patient {
  id: string;
  name: string; // e.g., "Patient Smith_001" for easier display
  cancerType: "Colorectal Cancer (CRC)";
  status: PatientStatus;
  demographics: PatientDemographics;
  clinicalHistory: ClinicalHistory;
  genomicData: GenomicData;
  imagingData: ImagingData;
  microbiomeData: MicrobiomeData;
  labResults: LabResult[];
  virtualTumorModel: VirtualTumorModel;
  simulations: PatientSimulation[];
  actualOutcomes: ActualOutcome[];
}

export interface TreatmentRegimen {
  id: string;
  name: string;
  type: "Chemotherapy" | "Radiotherapy" | "Immunotherapy" | "Targeted Therapy" | "Microbiome Intervention";
  description?: string;
}

export interface SimulationScenario {
  id: string;
  selectedRegimens: TreatmentRegimen[];
  dosage: "Standard" | "Adjusted Low" | "Adjusted High";
  schedule: string; // e.g., "Weekly", "Bi-weekly"
}

export interface PredictedEfficacy {
  tumorResponsePercentage: number; // e.g., -30 for 30% reduction, 10 for 10% growth
  timeToProgressionMonths?: number;
  successProbabilityScore: number; // 0-100
  confidenceInterval?: [number, number];
}

export interface PredictedSideEffect {
  name: string;
  predictedRiskLevel: "Low" | "Medium" | "High";
}

export interface InterpretableAIInsight {
  keyPredictiveFactors: string[];
  influenceData: Array<{ category: "Genomics" | "Microbiome" | "Imaging" | "Clinical"; importance: number }>; // Importance 0-100
  decisionPathwaySnippet: string;
}

export interface PredictionResult {
  efficacy: PredictedEfficacy;
  potentialSideEffects: PredictedSideEffect[];
  interpretableAI: InterpretableAIInsight;
}

export interface PatientSimulation {
  id: string;
  scenario: SimulationScenario;
  result: PredictionResult;
  simulationDate: string;
}

export interface ActualOutcome {
  id: string;
  date: string;
  description: string; // e.g., "Tumor size reduced by 15% on follow-up scan"
  dataPoints?: Array<{metric: string; value: string}>; // e.g., {metric: "CEA Level", value: "5 ng/mL"}
}

export interface AppNotification {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type ActiveView = 
  | "login" 
  | "dashboard" 
  | "patientWorkspace" 
  | "glossary" 
  | "help" 
  | "about";

// For navigation state
export type PatientWorkspaceTab = 
  | "demographics" 
  | "multiModalData" 
  | "virtualTumor" 
  | "simulation" 
  | "feedback"
  | "reporting"; // Added reporting tab