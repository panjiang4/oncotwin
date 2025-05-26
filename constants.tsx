
import React from 'react';
import { Patient, TreatmentRegimen, GlossaryTerm, FAQItem, AppNotification, PatientStatus } from './types';

export const APP_NAME = "OncoTwin®";
export const APP_TAGLINE = "Better Outcomes. Smarter Choices. Powered by Data.";

export const OncoTwinLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text x="10" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="url(#logoGradient)">
      OncoTwin
      <tspan fontSize="28" fill="#3b82f6">®</tspan>
    </text>
  </svg>
);

// Fix: Changed strokeWidth to number to resolve arithmetic type error.
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

// Fix: Changed strokeWidth to number to resolve arithmetic type error.
export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

// Fix: Changed strokeWidth to number to resolve arithmetic type error.
export const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Fix: Changed strokeWidth to number to resolve arithmetic type error.
export const DocumentMagnifyingGlassIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5 4.5H6.375a3.375 3.375 0 01-3.375-3.375V8.25A3.375 3.375 0 016.375 4.875h4.875a3.375 3.375 0 013.375 3.375V15M12 12.75h.008v.008H12v-.008z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25A4.5 4.5 0 0024 18.75h0A4.5 4.5 0 0019.5 24h0A4.5 4.5 0 0015 18.75h0a4.5 4.5 0 004.5-4.5zM16.5 18.75a.75.75 0 00-1.5 0v.001a.75.75 0 001.5 0v-.001z" />
</svg>
);

// Fix: Changed strokeWidth to number to resolve arithmetic type error.
export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

// Fix: Changed strokeWidth to number to resolve arithmetic type error.
export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: "patient_001",
    name: "Johnathan M. Doe",
    cancerType: "Colorectal Cancer (CRC)",
    status: "Awaiting Simulation" as PatientStatus,
    demographics: { patientId: "P001", age: 65, sex: "Male" },
    clinicalHistory: { diagnosisDate: "2023-05-15", stage: "IIIb", location: "Descending Colon", comorbidities: ["Hypertension", "Type 2 Diabetes"], pastTreatments: ["FOLFOX (6 cycles, adjuvant)"] },
    genomicData: { 
        keyMarkers: [{ name: "KRAS", value: "Mutated (G12D)" }, { name: "BRAF", value: "Wild Type" }, { name: "MSI", value: "MSI-High" }],
        reportUploaded: true 
    },
    imagingData: { 
        tumorCharacteristics: [{ name: "Primary Tumor Size", value: "4.5 cm" }, { name: "Lymph Node Involvement", value: "N1 (2/15 nodes)" }],
        dicomViewable: true
    },
    microbiomeData: { 
        keySignatures: [{ name: "Fusobacterium nucleatum", value: "High Abundance" }, { name: "Bacteroides fragilis", value: "Moderate Abundance" }],
        stoolSampleReportUploaded: true,
        gutDiversityIndex: 0.75 
    },
    labResults: [{markerName: "CEA", value: "12.5", unit:"ng/mL"}, {markerName: "ALT", value: "35", unit:"U/L"}],
    virtualTumorModel: { simulatedGrowthRate: "Moderate", predictedImmuneInfiltration: "High", microenvironmentFactors: "Hypoxic core, Angiogenic", lastUpdated: "2024-07-01" },
    simulations: [],
    actualOutcomes: []
  },
  {
    id: "patient_002",
    name: "Alice B. Wonderland",
    cancerType: "Colorectal Cancer (CRC)",
    status: "New Data Available" as PatientStatus,
    demographics: { patientId: "P002", age: 58, sex: "Female" },
    clinicalHistory: { diagnosisDate: "2024-01-20", stage: "IVa (liver mets)", location: "Rectum", comorbidities: ["None"], pastTreatments: ["Neoadjuvant Chemoradiation"] },
    genomicData: { 
        keyMarkers: [{ name: "KRAS", value: "Wild Type" }, { name: "BRAF", value: "V600E Mutated" }, { name: "MSI", value: "MSS" }],
        reportUploaded: false
    },
    imagingData: { 
        tumorCharacteristics: [{ name: "Primary Tumor Size", value: "3.0 cm" }, { name: "Liver Metastases", value: "2 lesions (<2cm)" }],
        dicomViewable: false
    },
    microbiomeData: { 
        keySignatures: [{ name: "Akkermansia muciniphila", value: "Low Abundance" }],
        stoolSampleReportUploaded: true,
        gutDiversityIndex: 0.60 
    },
    labResults: [{markerName: "CEA", value: "55.2", unit:"ng/mL"}],
    virtualTumorModel: { simulatedGrowthRate: "Aggressive", predictedImmuneInfiltration: "Low", microenvironmentFactors: "Immune-desert phenotype", lastUpdated: "2024-06-15" },
    simulations: [],
    actualOutcomes: []
  }
];

export const TREATMENT_REGIMENS: TreatmentRegimen[] = [
  { id: "chemo_folfox", name: "FOLFOX", type: "Chemotherapy", description: "5-Fluorouracil, Leucovorin, Oxaliplatin" },
  { id: "chemo_folfiri", name: "FOLFIRI", type: "Chemotherapy", description: "5-Fluorouracil, Leucovorin, Irinotecan" },
  { id: "radio_pelvic", name: "Pelvic Radiotherapy", type: "Radiotherapy", description: "Standard dose pelvic radiation" },
  { id: "immuno_pd1", name: "Anti-PD-1 Agent", type: "Immunotherapy", description: "e.g., Pembrolizumab, Nivolumab" },
  { id: "targeted_egfr", name: "Anti-EGFR Agent", type: "Targeted Therapy", description: "e.g., Cetuximab, Panitumumab (for KRAS WT)" },
  { id: "targeted_braf", name: "BRAF/MEK Inhibitor", type: "Targeted Therapy", description: "e.g., Encorafenib + Cetuximab (for BRAF V600E)" },
  { id: "micro_fmt", name: "Fecal Microbiota Transplant (FMT) Support", type: "Microbiome Intervention", description: "Conceptual support for FMT" },
  { id: "micro_probiotics", name: "Targeted Probiotics/Prebiotics", type: "Microbiome Intervention", description: "Customized probiotic/prebiotic formulation" }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  { id: "notif_1", message: "Simulation for Patient P001 (Johnathan M. Doe) is complete.", type: "success", read: false, timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "notif_2", message: "New lab results available for Patient P002 (Alice B. Wonderland).", type: "info", read: false, timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "notif_3", message: "OncoTwin® model v2.1 successfully deployed.", type: "info", read: true, timestamp: new Date(Date.now() - 86400000).toISOString() }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "Digital Twin", definition: "A virtual representation of a physical object or system, in this case, a patient's cancer, which is continuously updated with real-world data to simulate, predict, and optimize outcomes." },
  { term: "Microbiome", definition: "The collection of all microbes, such as bacteria, fungi, viruses, and their genes, that naturally live on our bodies and inside us. The gut microbiome plays a significant role in health and disease, including cancer development and treatment response." },
  { term: "Interpretable AI", definition: "Artificial intelligence models designed so that their decision-making processes are understandable by humans. This transparency helps clinicians trust and verify AI-driven insights and predictions." },
  { term: "CRC", definition: "Colorectal Cancer, a type of cancer that begins in the colon or the rectum." },
  { term: "MSI-High", definition: "Microsatellite Instability-High. A molecular phenotype in some cancers, including CRC, that often indicates a higher likelihood of response to immunotherapy." },
  { term: "FMT", definition: "Fecal Microbiota Transplant. A procedure to transfer fecal bacteria and other microbes from a healthy individual into another individual to restore a healthy gut microbiome."}
];

export const FAQ_ITEMS: FAQItem[] = [
  { question: "What is OncoTwin®?", answer: "OncoTwin® is a digital twin platform designed to help oncologists make more informed, data-driven treatment decisions for cancer patients, initially focusing on Colorectal Cancer (CRC). It integrates multi-modal patient data to create a virtual tumor model for simulating treatment responses and predicting outcomes." },
  { question: "How does OncoTwin® use patient data?", answer: "OncoTwin® integrates various data types, including genomic data, medical imaging, microbiome profiles, lab results, and clinical history. This data feeds into a virtual tumor model that continuously learns and adapts." },
  { question: "Is the AI in OncoTwin® a 'black box'?", answer: "No, OncoTwin® emphasizes interpretable AI. The platform aims to provide insights into why a particular prediction is made, highlighting key influencing factors and offering simplified decision pathways." },
  { question: "Can I use OncoTwin® for actual clinical decision-making?", answer: "This is a demonstration platform. OncoTwin® is under development and is intended for research and informational purposes only. It should not be used for actual clinical decision-making without regulatory approval and further validation." }
];

export const PATIENT_WORKSPACE_TABS = [
    { id: "demographics", label: "Demographics & History" },
    { id: "multiModalData", label: "Multi-Modal Data" },
    { id: "virtualTumor", label: "Virtual Tumor Model" },
    { id: "simulation", label: "Treatment Simulation" },
    { id: "feedback", label: "Feedback & Adaptation" },
    { id: "reporting", label: "Reporting & Collaboration" },
];

export const MOCK_SIMULATION_PROGRESS_DURATION = 3000; // ms

export const MOCK_WATERFALL_DATA = [
  { name: 'Scenario 1', value: -35 }, { name: 'Scenario 2', value: -15 },
  { name: 'Scenario 3', value: 5 }, { name: 'Scenario 4', value: -50 },
];

export const MOCK_TIME_TO_PROGRESSION_DATA = [
  { month: 0, scenario1: 100, scenario2: 100 },
  { month: 3, scenario1: 90, scenario2: 85 },
  { month: 6, scenario1: 75, scenario2: 60 },
  { month: 9, scenario1: 60, scenario2: 40 },
  { month: 12, scenario1: 50, scenario2: 25 },
  { month: 18, scenario1: 30, scenario2: 10 },
];

export const MOCK_INFLUENCE_DATA = [
    { category: "Genomics", importance: 40 },
    { category: "Microbiome", importance: 30 },
    { category: "Imaging", importance: 20 },
    { category: "Clinical", importance: 10 },
];