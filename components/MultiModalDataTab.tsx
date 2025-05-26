
import React, { useState } from 'react';
import { Patient, GenomicData, ImagingData, MicrobiomeData, LabResult } from '../types';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import { PlusCircleIcon } from '../constants'; // Assuming you have this

interface MultiModalDataTabProps {
  patient: Patient;
  onUpdate: (updatedData: Partial<Pick<Patient, 'genomicData' | 'imagingData' | 'microbiomeData' | 'labResults'>>) => void;
}

export const MultiModalDataTab: React.FC<MultiModalDataTabProps> = ({ patient, onUpdate }) => {
  const [genomicData, setGenomicData] = useState<GenomicData>(patient.genomicData);
  // Fix: Corrected typo in state setter name from setImageingData to setImagingData
  const [imagingData, setImagingData] = useState<ImagingData>(patient.imagingData);
  const [microbiomeData, setMicrobiomeData] = useState<MicrobiomeData>(patient.microbiomeData);
  const [labResults, setLabResults] = useState<LabResult[]>(patient.labResults);
  
  // Local state for editing new lab result
  const [newLabResult, setNewLabResult] = useState<Partial<LabResult>>({ markerName: '', value: '', unit: ''});

  const handleMockUpload = (dataType: 'genomic' | 'microbiome_stool' | 'imaging_dicom') => {
    alert(`Simulated upload for ${dataType}. In a real app, a file dialog would open.`);
    switch(dataType) {
        case 'genomic':
            setGenomicData(prev => ({...prev, reportUploaded: true}));
            onUpdate({ genomicData: {...genomicData, reportUploaded: true }});
            break;
        case 'microbiome_stool':
            setMicrobiomeData(prev => ({...prev, stoolSampleReportUploaded: true}));
            onUpdate({ microbiomeData: {...microbiomeData, stoolSampleReportUploaded: true }});
            break;
        case 'imaging_dicom':
             // Fix: Use corrected state setter name
             setImagingData(prev => ({...prev, dicomViewable: true}));
            onUpdate({ imagingData: {...imagingData, dicomViewable: true }});
            break;
    }
  };

  const handleAddLabResult = () => {
    if (newLabResult.markerName && newLabResult.value && newLabResult.unit) {
      const updatedLabResults = [...labResults, newLabResult as LabResult];
      setLabResults(updatedLabResults);
      onUpdate({ labResults: updatedLabResults });
      setNewLabResult({ markerName: '', value: '', unit: '' }); // Reset form
    } else {
      alert("Please fill in all fields for the lab result.");
    }
  };
  
  const handleLabResultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLabResult(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  return (
    <div className="space-y-8">
      {/* Genomic Data */}
      <Card title="Genomic Data">
        <Button onClick={() => handleMockUpload('genomic')} size="sm" className="mb-4">
          {genomicData.reportUploaded ? "Re-upload Genomic Report (Mock)" : "Upload Genomic Report (Mock)"}
        </Button>
        {genomicData.reportUploaded && <p className="text-sm text-green-600 mb-2">Genomic report uploaded.</p>}
        <h4 className="font-semibold text-neutral-darkest mb-2">Key Genomic Markers:</h4>
        <ul className="list-disc list-inside pl-2 space-y-1 text-sm">
          {genomicData.keyMarkers.map(marker => (
            <li key={marker.name}><span className="font-medium">{marker.name}:</span> {marker.value}</li>
          ))}
        </ul>
        {/* TODO: Add ability to edit markers if needed for demo */}
      </Card>

      {/* Medical Imaging */}
      <Card title="Medical Imaging">
         <Button onClick={() => handleMockUpload('imaging_dicom')} size="sm" className="mb-4">
           {imagingData.dicomViewable ? "DICOM Data Loaded (Mock)" : "Load DICOM Data (Mock)"}
         </Button>
        <div className="my-4 p-4 border border-dashed border-neutral-medium rounded-md h-48 flex items-center justify-center bg-neutral-lightest">
          <p className="text-neutral-dark">
            {imagingData.dicomViewable ? "Conceptual DICOM Viewer Area (Data Loaded)" : "Conceptual DICOM Viewer Placeholder"}
          </p>
        </div>
        <h4 className="font-semibold text-neutral-darkest mb-2">Tumor Characteristics (from mock image data):</h4>
        <ul className="list-disc list-inside pl-2 space-y-1 text-sm">
          {imagingData.tumorCharacteristics.map(char => (
            <li key={char.name}><span className="font-medium">{char.name}:</span> {char.value}</li>
          ))}
        </ul>
      </Card>

      {/* Microbiome Profile */}
      <Card title="Microbiome Profile">
        <Button onClick={() => handleMockUpload('microbiome_stool')} size="sm" className="mb-4">
            {microbiomeData.stoolSampleReportUploaded ? "Re-upload Stool Sample Analysis (Mock)" : "Upload Stool Sample Analysis (Mock)"}
        </Button>
        {microbiomeData.stoolSampleReportUploaded && <p className="text-sm text-green-600 mb-2">Stool sample analysis report uploaded.</p>}
        <h4 className="font-semibold text-neutral-darkest mb-2">Key Microbiome Signatures:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
          {microbiomeData.keySignatures.map(sig => (
            <div key={sig.name} className="p-3 border rounded-md bg-neutral-lightest">
              <p><span className="font-medium">{sig.name}:</span> {sig.value}</p>
              {/* Conceptual graphic placeholder */}
              <div className="mt-2 h-10 w-full bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 rounded opacity-50 flex items-center justify-center text-xs text-neutral-dark">
                Conceptual Graphic for {sig.name.split(' ')[0]}
              </div>
            </div>
          ))}
          <div className="p-3 border rounded-md bg-neutral-lightest">
            <p><span className="font-medium">Gut Diversity Index:</span> {microbiomeData.gutDiversityIndex.toFixed(2)}</p>
             <div className="mt-2 h-10 w-full bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 rounded opacity-50 flex items-center justify-center text-xs text-neutral-dark">
                Diversity Score Visual
              </div>
          </div>
        </div>
      </Card>

      {/* Lab Results & Biomarkers */}
      <Card title="Lab Results & Biomarkers">
        <div className="space-y-2 mb-4">
            {labResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b text-sm">
                    <span><span className="font-medium">{result.markerName}:</span> {result.value} {result.unit}</span>
                    {/* <Button variant="danger" size="sm" onClick={() => {/* Remove logic here */ /*}}>Remove</Button> */}
                </div>
            ))}
             {labResults.length === 0 && <p className="text-sm text-neutral-dark">No lab results entered.</p>}
        </div>
        <h5 className="font-semibold text-neutral-darkest mb-2">Add New Lab Result:</h5>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <Input label="Marker Name" name="markerName" value={newLabResult.markerName || ''} onChange={handleLabResultChange} containerClassName="mb-0" />
            <Input label="Value" name="value" value={newLabResult.value || ''} onChange={handleLabResultChange} containerClassName="mb-0" />
            <Input label="Unit" name="unit" value={newLabResult.unit || ''} onChange={handleLabResultChange} containerClassName="mb-0" />
            <Button onClick={handleAddLabResult} leftIcon={<PlusCircleIcon className="w-5 h-5"/>} className="md:mt-6">Add Result</Button>
        </div>
      </Card>
    </div>
  );
};
// Fix: Removed a rogue definition of PlusCircleIcon that was present after the component export in the original problematic file.
// This re-definition was causing the errors on lines 121, 123 (arithmetic operations) and 136 (Cannot find name 'div').
// The component correctly uses the PlusCircleIcon imported from '../constants'.
