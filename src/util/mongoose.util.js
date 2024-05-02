export default {
    handleErrors: function (mongooseError) {
        let errorMessages = []
        for (const property in mongooseError.errors) {
            errorMessages.push(property + " => " + mongooseError.errors[property].message)
        }
        return errorMessages
    }
}
