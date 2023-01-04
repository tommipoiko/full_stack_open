const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Course = ({course}) =>
  <>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={course.parts.reduce((sum, part) => sum = sum + part.exercises, 0)}/>
  </>

export default Course