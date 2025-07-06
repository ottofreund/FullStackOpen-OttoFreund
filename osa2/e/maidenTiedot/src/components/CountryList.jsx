const CountryList = ({foundCountries, setFoundCountries}) => {
    const tooManyCountries = foundCountries.length > 10
    if (tooManyCountries) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (foundCountries.length === 1) { //no need for list
        return null
    }
    return (
        <div>
            <ul>
                {foundCountries.map(country => 
                    <p key={country}>{country} <button onClick={ (e) => {
                        //set found countries to contain only this country upon pressing
                        setFoundCountries([country])
                    }
                    } >show</button> </p>
                )}
            </ul>
        </div>
    )
    
}

export default CountryList