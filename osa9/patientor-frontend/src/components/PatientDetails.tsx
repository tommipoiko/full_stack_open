import { Patient } from "../types";

interface Props {
  patient: Patient | undefined;
}

const PatientDetails = ({patient}: Props) => {
  if (patient) {
    return (
      <div>
        <h2>{patient.name}</h2>
        <p>Gender: {patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }
};

export default PatientDetails;
