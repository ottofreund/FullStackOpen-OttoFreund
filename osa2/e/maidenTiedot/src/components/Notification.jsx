const Notification = ({showNotification}) => {
    if (showNotification) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else {
        return (<></>)
    }
}

export default Notification