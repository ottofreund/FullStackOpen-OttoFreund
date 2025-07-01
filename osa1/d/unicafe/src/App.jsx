import { useState } from 'react'

const OptionButton = ({onAction, feedbackText}) => {
  return (
    <button onClick = {onAction}>{feedbackText}</button>
  )
}

const StatisticLine = ({explanation, value}) => {
  return (
    <p>{explanation}: {value}</p>
  )
}

const Display = ({badCount, neutralCount, goodCount}) => {
  let allCount = goodCount + neutralCount + badCount

  if (allCount > 0) {
    let avg = (badCount * -1 + goodCount) / allCount
    let positiveRatio = (goodCount / allCount * 100).toString() + " %"
    return (
      <table>
        <tbody>
          <tr><td><StatisticLine explanation = {"good"} value = {goodCount} /></td></tr>
          <tr><td><StatisticLine explanation = {"neutral"} value = {neutralCount} /></td></tr>
          <tr><td><StatisticLine explanation = {"bad"} value = {badCount} /></td></tr>
          <tr><td><StatisticLine explanation = {"all"} value = {allCount} /></td></tr>
          <tr><td><StatisticLine explanation = {"Average"} value = {avg} /></td></tr>
          <tr><td><StatisticLine explanation = {"Positive"} value = {positiveRatio} /></td></tr>
        </tbody>
      </table>
    )
  } else {
    return (
      <h2>No feedback given</h2>
    )
  }
}
    

const App = () => {
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [good, setGood] = useState(0)

  const incrementFeedback = (newType) => {
    switch (newType) {
      case "bad":
        setBad(bad + 1)
        break
      case "neutral":
        setNeutral(neutral + 1)
        break
      case "good":
        setGood(good + 1)
        break
      default:
        console.log("!Feedback of unknown type in incrementFeedback!")
    }
  }

  const incrementBad = () => incrementFeedback("bad")
  const incrementNeutral = () => incrementFeedback("neutral")
  const incrementGood = () => incrementFeedback("good")

  return (
    <>
    <div>
      <h1>Give feedback</h1>
    </div>
    <OptionButton onAction = {incrementBad} feedbackText = "bad" />
    <OptionButton onAction = {incrementNeutral} feedbackText = "neutral" />
    <OptionButton onAction = {incrementGood} feedbackText = "good" />
    <h1>stats</h1>
    <Display badCount = {bad} neutralCount = {neutral} goodCount = {good} />
    </>
  )
}

export default App
