import CountryDetails from './CountryDetails'
import Languages from './Languages'
import Flag from './Flag'

const CountryInformation = ({foundCountries, allInformation}) => {
    if (foundCountries.length === 1) {
        const countryName = foundCountries[0]
        const countryObj = allInformation.find( cObj => cObj.name.common === countryName )
        return (
            <div>
                <CountryDetails countryObj = {countryObj} />
                <Languages countryObj = {countryObj} />
                <Flag countryObj = {countryObj} />
            </div>
        )
    } else {
        return null
    }
}

export default CountryInformation