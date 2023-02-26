import { CoursePart } from "../types"

const Part = ({coursePart}: {coursePart: CoursePart}) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <div>
            <i>{coursePart.description}</i>
          </div>
          <br></br>
        </div>
      );
    case "group":
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <div>
            project exercises {coursePart.groupProjectCount}
          </div>
          <br></br>
        </div>
      );
    case "background":
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <div>
            <i>{coursePart.description}</i>
          </div>
          <div>
            submit to {coursePart.backroundMaterial}
          </div>
          <br></br>
        </div>
      );
    case "special":
      return (
        <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <div>
            <i>{coursePart.description}</i>
          </div>
          <div>
            required skills: {coursePart.requirements.join(', ')}
          </div>
          <br></br>
        </div>
      );
    default:
      return <p>Moi</p>;
  }
}

export default Part