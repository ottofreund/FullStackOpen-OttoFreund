const Languages = ({countryObj}) => {
    return (
        <div>
            <h2>Languages</h2>
            <ul>
                {Object.values(countryObj.languages).map( language => 
                    <li key={language}>{language}</li>
                 )}
            </ul>
        </div>
    )
}

export default Languages