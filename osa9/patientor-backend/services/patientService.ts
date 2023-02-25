import { NonSensitivePatientEntry, PatientEntry } from '../types';
import patients from '../data/patients';

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

export default {
  getPatients,
  getPatientsNoSSN
};