import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../src/types';
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSSN,
  addPatient
};