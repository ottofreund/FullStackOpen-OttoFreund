const CountryDetails = ({countryObj}) => {
    return (
        <div>
            <h1>{countryObj.name.common}</h1>
            <p>Capital {countryObj.capital[0]}</p>
            <p>Area {countryObj.area}</p>
        </div>
    )
}

export default CountryDetails