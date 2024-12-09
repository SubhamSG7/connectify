const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^[a-zA-Z\s]{3,}$/;
const mobileRegex = /^(\+?[1-9]\d{1,3})?[-.\s]?\d{10}$/;
const countryCodes = ["+61", "+1", "+91", "+44"];
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;

export function handleValidation(type, value) {
  if (!value) {
    return { [type]: `${type.toUpperCase()} cannot be empty` };
  }
  let testResult;
  switch (type) {
    case "name":
      testResult = nameRegex.test(value);
      return !testResult
        ? {
            [type]: `${type.toUpperCase()} should contain at least 3 characters and no special characters are allowed`,
          }
        : null;
    case "username":
      testResult = nameRegex.test(value);
      return !testResult
        ? {
            [type]: `${type.toUpperCase()} should contain at least 3 characters and no special characters are allowed`,
          }
        : null;

    case "email":
      testResult = emailRegex.test(value);
      return !testResult
        ? { [type]: `${type.toUpperCase()} is invalid` }
        : null;

    case "mobile":
      testResult = mobileRegex.test(value);
      return !testResult
        ? { [type]: `${type.toUpperCase()} number is invalid` }
        : null;

    case "countrycode":
      testResult = countryCodes.includes(value);
      return !testResult
        ? { [type]: `${type.toUpperCase()} is not provided` }
        : null;
    case "password":
      testResult = passwordRegex.test(value);
      return !testResult
        ? {
            [type]: `${type.toUpperCase()} should contain alphanumeric values and min length 7 characters`,
          }
        : null;
    default:
      return { [type]: `Invalid validation type: ${type.toUpperCase()}` };
  }
}
