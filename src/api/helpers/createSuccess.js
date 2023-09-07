const createSuccess = (status = 200, message, elements) => {
    let response = {
        status
    }
    if(message){
        response.message = message;
    }
    if (elements) {
        response.elements = elements;
    }
    return response
}

module.exports = createSuccess