import { Diagnosis, Patient } from "../types";

interface Props {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
}

const PatientDetails = ({patient, diagnoses}: Props) => {
  if (patient) {
    return (
      <div>
        <h2>{patient.name}</h2>
        <p>Gender: {patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <div>
          {patient.entries !== undefined && patient.entries.length !== 0 ? <h3>entries</h3> : <h3>no entries</h3>}
          {patient.entries?.map(e => {
            return (
              <div>
                <p>{e.date} {e.description}</p>
                <ul>
                  {e.diagnosisCodes?.map(dc => {

                    const diagnoseObject = diagnoses.find(d => d.code === dc);

                    return (
                      <li>{`${dc} ${diagnoseObject ? diagnoseObject.name : null}`}</li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
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
