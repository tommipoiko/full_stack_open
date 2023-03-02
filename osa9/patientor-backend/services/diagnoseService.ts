import { Diagnosis } from '../src/types';
import diagnoseData from '../data/diagnoses';

const diagnoses: Diagnosis[] = diagnoseData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses
};
