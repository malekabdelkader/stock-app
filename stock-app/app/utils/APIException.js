/**
 * APIException class represents errors that occur within the application related to API functionalities.
 * It provides a dedicated error type for handling API-specific issues and allows for consistent error responses.
 */
class APIException extends Error {
    /**
     * Creates a new APIException instance with the provided status code and message.
     * 
     * @param {number} statusCode - The HTTP status code associated with the error.
     * @param {string} message - A descriptive message explaining the error.
     */
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export default APIException;