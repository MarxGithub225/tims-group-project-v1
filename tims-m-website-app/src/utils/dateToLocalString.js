function dateToLocalString(msDate) {
    const _thisDate = new Date(msDate) 
    return _thisDate.toLocaleString()
}

export default dateToLocalString