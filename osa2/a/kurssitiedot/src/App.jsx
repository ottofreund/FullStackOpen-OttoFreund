import Course from './components/Course'


const Courses = ({courses}) => {
  return (
    <div>
      {courses.map( course => <Course key = {course.id} course = {course} /> )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        } 
      ]
    },
    {
      name: 'Rizz Gyaldem',
      id: 2,
      parts: [
        {
          name: 'Fundamentals of Snapchat',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to make her laugh',
          exercises: 5,
          id: 2
        },
        {
          name: 'State of a gyal',
          exercises: 10,
          id: 3
        } 
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App