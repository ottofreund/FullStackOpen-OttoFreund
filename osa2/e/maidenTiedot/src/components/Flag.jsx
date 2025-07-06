const Flag = ({countryObj}) => {
    const imgUrl = countryObj.flags.png
    return (
        <div>
            <img src={imgUrl} alt = {countryObj.flags.alt} />
        </div>
    )

}

export default Flag