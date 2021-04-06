import chalk from 'chalk';

// Return a array of formatted strings:
// Line 1: "{where}"
// Line 2: "{name}: {message}"
const handleText = (name, message, where) => {
  // name or message must be supplied as minimum number of arguments.
  const line1 = where ? ` ${where}` : '';
  const line2 = name && message ? `${name} | ${message}` : name || message;

  return [line1, line2];
}; // --------------------------------------------------------------------------

// Log an Error Message in format:
// Line 1: (Red text)
// Line 2: (White text)
const error = ({ name, message, where }) => {
  const [line1, line2] = handleText(name, message, where);

  // Console log a formatted error message.
  console.error(chalk`\n{red Error:${line1}}\n${line2}`);
}; // --------------------------------------------------------------------------

// Log a Success Message in format:
// Line 1: (Green text)
// Line 2: (White text)
const success = ({ name, message, where }) => {
  const [line1, line2] = handleText(name, message, where);

  // Console log a formatted success message.
  console.log(chalk`\n{green Success:${line1}}\n${line2}`);
}; // --------------------------------------------------------------------------

// Test for Mongoose.js errors:
// Mongoose.js outputs an array of errors (error.errors),
// Console log an error message for each error in array,
// Return an object with a name, message and the location it occurred.
const mongooseErrors = (errorObject, where) => {
  let output;
  if (errorObject.errors) {
    const errorList = errorObject.errors;
    output = Object.keys(errorList).map((e) => {
      // Destructure error Object
      const { name, message } = errorList[e];
      error({ name, message, where });
      return { name, message, where };
    });
  } else {
    // If error was not thrown by Mongoose.js:
    // Log the error to the console for debugging,
    // Return a generic failure message to display to end user.
    const { name, message } = errorObject;
    error({ name, message, where });
    output = [{ name: 'Failed', message: 'Unable to process request', where }];
  }
  return output;
}; // --------------------------------------------------------------------------

export { error, success, mongooseErrors };
