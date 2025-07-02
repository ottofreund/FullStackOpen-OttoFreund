
const Total = ({parts}) => {
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const Part = ({partName, partExercises}) => {
  return (
    <p>{partName} {partExercises}</p>
  )
}

  const Content = ({parts}) => {
  return (
    <div>
      <Part partName = {parts[0].name} partExercises = {parts[0].exercises} />
      <Part partName = {parts[1].name} partExercises = {parts[1].exercises} />
      <Part partName = {parts[2].name} partExercises = {parts[2].exercises} />
    </div>
  )
}

const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
    name: 'Fundamentals of React',
    exercises: 10
    },
    {
    name: 'Using props to pass data',
    exercises: 7
    },
    {
    name: 'State of a component',
    exercises: 14
    }
  ]
  }
  

  return (
    <div>
      <Header courseName = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

export default App