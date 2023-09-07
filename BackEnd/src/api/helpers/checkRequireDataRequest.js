const checkRequireDataRequest = (data) => {
    const dataArray = Object.values(data)
    let isEmty = true;
    dataArray.forEach(item => {
        if (!item || item == "") {
            isEmty = false
        }
    });
    return isEmty
}

module.exports = checkRequireDataRequest