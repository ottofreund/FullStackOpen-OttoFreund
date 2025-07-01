import { useState } from 'react'

const Button = ({onAction, text}) => {
  return (
    <button onClick = {onAction}>{text}</button>
  )
}

const ElectedDisplayer = ({mostVotesIdx, votes, anecdotes}) => {
  let voteCount = votes[mostVotesIdx]
  if (voteCount > 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVotesIdx]}</p>
        <p>has {voteCount} votes</p>
      </div>
    )
  } else {
    return (
      <>
      <h2>No anecdote has votes.</h2>
      </>
    )
  }
  
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  let anecdotesLen = anecdotes.length
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotesLen).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const newRandom = () => {
    setSelected(getRandomInt(anecdotesLen - 1))
  }

  const voteCurrent = () => {
    const copy = [...votes]
    copy[selected] += 1
    //possibly update anecdote with most votes
    if (copy[mostVotes] < copy[selected]) {
      setMostVotes(selected)
    }
    setVotes(copy)
  }

  return (
    <>
      <div>
        {anecdotes[selected]}
        <p>Votes: {votes[selected]}</p>
      </div>
      
      <div>
        <Button onAction = {newRandom} text = {"next anecdote"} />
        <Button onAction = {voteCurrent} text = {"vote"} />
      </div>

      <div>
        <ElectedDisplayer mostVotesIdx = {mostVotes} votes = {votes} anecdotes = {anecdotes} />
      </div>
      
    </>
  )
}

export default App