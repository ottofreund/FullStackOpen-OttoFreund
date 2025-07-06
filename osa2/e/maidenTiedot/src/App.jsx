import { useState, useEffect } from 'react'
import CountryInformation from './components/CountryInformation'
import Filter from './components/Filter'
import Notification from './components/Notification'
import CountryList from './components/CountryList'
import countryService from './services/countryService'




function App() {
  const [allNames, setAllNames] = useState(null)
  const [allInformation, setAllInformation] = useState(null)
  const [foundCountries, setFoundCountries] = useState([])
  const [filter, setFilter] = useState("")

  //effect-hook that runs once calling country-service to fetch allCountries to state array
  //also initializes allNames using the result of all information
  useEffect( () => {
    countryService
      .getAll()
      .then( (response) => {
          console.log("Got response with all country information")
          console.log(response)
          setAllInformation(response.data)
          const names = response.data.map(countryObj => countryObj.name.common)
          setAllNames(names)
      } )    
  }, [] )

  if (!allInformation) { //first render null when no information
    return null
  }
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} allNames={allNames} setFoundCountries={setFoundCountries} />
      <CountryList foundCountries={foundCountries} setFoundCountries={setFoundCountries} />
      <CountryInformation foundCountries={foundCountries} allInformation={allInformation} />
    </div>
  )
}

export default App
