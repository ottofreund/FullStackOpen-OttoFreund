const Filter = ({filter, setFilter, allNames, setFoundCountries}) => {
    return (
        <div>
            find countries: <input value={filter} onChange={ (e) => {
                const newFilter = e.target.value
                setFilter(newFilter) 
                //filterin muuttuessa päivitetään myös found-countries
                const newFoundCountries = allNames.filter( name => name.includes(newFilter) )
                setFoundCountries(newFoundCountries)
                //jos yksi maa jaljella
            }
            } />
        </div>
    )
}

export default Filter