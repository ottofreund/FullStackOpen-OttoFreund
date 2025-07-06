import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'


const Persons = ({persons, setPersons, filter}) => {
  const deletePerson = (id) => {
    const personToDelete = persons.find( person => person.id === id )
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      //delete person both locally and from server
      phonebookService
        .deleteEntry(id)
        .then( (response) => {
          console.log(response)
          //delete locally
          setPersons(persons.filter( person => person.id !== id ))
        }
        )
        .catch( (err) => console.log(err))
    } else {
      console.log(`User canceled deletion of ${personToDelete.name}.`)
    }
      
  }
  return (
    <div>
        <ul>
          {persons
            .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map( person => 
            <p key = {person.name} >{person.name} {person.number} <button onClick={ () => deletePerson(person.id) }>Delete</button></p> 
            )
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
      const personToUpdate = persons.find(person => person.name === newName)
      //already added so verify that user wants to replace the existing number
      if (window.confirm(`${personToUpdate.name} already exists in the phonebook.\nReplace existing number?`)) {
        //carry on with modification
        const updatedPerson = {...personToUpdate, number: newNumber}
        //update both server-side and locally
        phonebookService
          .update(updatedPerson.id, updatedPerson)
          .then( response => {
            //update locally
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
          } )
      } else {
        //user canceled modification
        console.log(`User canceled updating ${personToUpdate.name}'s number.`)
      }
    } else {
      //add new person
      const newPersonNoID = {name: newName, number: newNumber}
      //add serverside
      phonebookService
        .addEntry(newPersonNoID)
        .then( (response) => {
          console.log(response)
          //add locally as well
          setPersons(persons.concat(response.data))
        } )
      
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
    phonebookService
      .getAll()
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
      <Persons persons={persons} setPersons={setPersons} filter = {newFilter} />
    </div>
  )

}

export default App