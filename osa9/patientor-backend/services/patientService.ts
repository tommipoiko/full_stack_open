import { NewPatientEntry, NonSensitivePatientEntry, Patient, PatientEntry } from '../src/types';
import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getPatientsNoSSN = (): NonSensitivePatientEntry[] => {
  const ret = patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  return ret;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuid(),
    ...entry
  };
  return newPatient;
};

const getPatientByID = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

export default {
  getPatients,
  getPatientsNoSSN,
  addPatient,
  getPatientByID
};