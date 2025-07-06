import { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = ({persons, filter}) => {
  return (
    <div>
        <ul>
          {persons
            .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map( person => <p key = {person.name} >{person.name} {person.number}</p> )
          }
        </ul>
    </div>
  )
}

const EntryForm = ({updateNameFunc, updateNumberFunc, addPersonFunc, nameState, numberState}) => {
  return (<form>
        <div>
          name: <input value = {nameState} onChange = {updateNameFunc} />
        </div>
        <div>
          phone number: <input value = {numberState} onChange = {updateNumberFunc} />
        </div>
        <div>
          <button type="submit" onClick = {addPersonFunc} >add</button>
        </div>
  </form>)
}

const Filter = ({updateFilterState, filterState}) => {
  return (
    <div>
        filter shown with: <input value = {filterState} onChange = {updateFilterState} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const updateNameState = (e) => {
    setNewName(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    //check if name already added
    if (persons.map(person => person.name).includes(newName)) {
      //already added so don't add and inform with alert
      alert(`${newName} is already in the phonebook`)
    } else {
      //add new person
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    
  }

  const updateNumberState = (e) => {
    setNewNumber(e.target.value)
  }

  const updateFilterState = (e) => {
    setNewFilter(e.target.value)
  }

  //effect hook joka huolehtii datan eli henkilolistan hakemisesta
  useEffect( () => {
    console.log('effect hook initiated')
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        console.log(`got response: ${response}`)
        setPersons(persons.concat(response.data))
      } )
  }, [] )


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter updateFilterState={updateFilterState} filterState={newFilter} />
      <h2>Add a new entry</h2>
      <EntryForm 
        updateNameFunc={updateNameState} 
        updateNumberFunc={updateNumberState} 
        addPersonFunc={addPerson} 
        nameState={newName}
        numberState={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter = {newFilter} />
    </div>
  )

}

export default App