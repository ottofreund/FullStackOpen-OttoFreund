const Total = ({parts}) => {
  let sum = parts.reduce( (p, c) => p + c.exercises, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Part = ({partName, partExercises}) => {
  return (
    <li>{partName} {partExercises}</li>
  )
}

  const Content = ({parts}) => {
  return (
    <div>
      <ul>
        {parts.map( part => <Part key={part.id} partName = {part.name} partExercises = {part.exercises} /> )}
      </ul>
    </div>
  )
}

const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Course = ({course}) => {
  return (
      <div>
        <Header courseName = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
      </div>
  )
}

export default Course