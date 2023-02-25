import { DiagnoseEntry } from '../src/types';
import diagnoseData from '../data/diagnoses';

const diagnoses: DiagnoseEntry[] = diagnoseData;

const getDiagnoses = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
