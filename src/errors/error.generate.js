export default class CustomError {
    static generateError (message, code, name) {
        const error = new Error(message);
        error.code = code;
        error.name = name;
        throw error
    }
}