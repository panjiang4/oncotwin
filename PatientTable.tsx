
import React, { useState, useMemo } from 'react';
import { Patient, PatientStatus } from '../types';
import { Button } from './Button';
import { ChevronDownIcon, ChevronUpIcon } from '../constants';

interface PatientTableProps {
  patients: Patient[];
  onSelectPatient: (patientId: string) => void;
}

type SortableKeys = keyof Pick<Patient, 'name' | 'status' | 'id'> | 'age'; // Allow sorting by age from demographics

interface SortConfig {
  key: SortableKeys;
  direction: 'ascending' | 'descending';
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients, onSelectPatient }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({ key: 'name', direction: 'ascending' });

  const sortedPatients = useMemo(() => {
    let sortableItems = [...patients];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (sortConfig.key === 'age') {
          aValue = a.demographics.age;
          bValue = b.demographics.age;
        } else {
          aValue = a[sortConfig.key as keyof Pick<Patient, 'name' | 'status' | 'id'>];
          bValue = b[sortConfig.key as keyof Pick<Patient, 'name' | 'status' | 'id'>];
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            if (aValue.toLowerCase() < bValue.toLowerCase()) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue.toLowerCase() > bValue.toLowerCase()) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        } else {
            if (aValue < bValue) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [patients, sortConfig]);

  const requestSort = (key: SortableKeys) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortableKeys) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUpIcon className="h-4 w-4 ml-1" /> : <ChevronDownIcon className="h-4 w-4 ml-1" />;
  };
  
  const getStatusColor = (status: PatientStatus) => {
    switch (status) {
      case 'Awaiting Simulation': return 'bg-yellow-100 text-yellow-800';
      case 'New Data Available': return 'bg-blue-100 text-blue-800';
      case 'Simulation Complete': return 'bg-green-100 text-green-800';
      case 'Active Treatment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (patients.length === 0) {
    return <p className="text-neutral-dark text-center py-4">No patients found. Click "Create New Patient Digital Twin" to get started.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-medium">
        <thead className="bg-neutral-lightest">
          <tr>
            {/* Patient ID, Cancer Type (CRC), Current Status  */}
            {/* Patient ID (from demographics), Name, Age, Sex, Cancer Type (fixed), Status, Actions */}
            {(['id', 'name', 'age', 'status'] as SortableKeys[]).map((key) => (
                <th
                    key={key}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider cursor-pointer hover:bg-neutral-light"
                    onClick={() => requestSort(key)}
                >
                    <span className="flex items-center">
                        {key === 'id' ? 'Patient ID' : key.charAt(0).toUpperCase() + key.slice(1)}
                        {getSortIndicator(key)}
                    </span>
                </th>
            ))}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
              Cancer Type
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-light">
          {sortedPatients.map((patient) => (
            <tr key={patient.id} className="hover:bg-neutral-lightest transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-darkest">{patient.demographics.patientId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{patient.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{patient.demographics.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{patient.cancerType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button variant="ghost" size="sm" onClick={() => onSelectPatient(patient.id)}>
                  View Workspace
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
