
const Total = ({totalExercises}) => {
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

const Part = ({partName, partExercises}) => {
  return (
    <p>{partName} {partExercises}</p>
  )
}

  const Content = ({pn1, pe1, pn2, pe2, pn3, pe3}) => {
  return (
    <div>
      <Part partName = {pn1} partExercises = {pe1} />
      <Part partName = {pn2} partExercises = {pe2} />
      <Part partName = {pn3} partExercises = {pe3} />
    </div>
  )
}

const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName = {course} />
      <Content pn1 = {part1} pe1 = {exercises1} pn2 = {part2} pe2 = {exercises2} pn3 = {part3} pe3 = {exercises3} />
      <Total totalExercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App