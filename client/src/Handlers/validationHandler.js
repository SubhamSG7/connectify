export function handleValidation(type, value) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const mobileRegex = /^(\+?[1-9]\d{1,3})?[-.\s]?\d{10}$/;
  const countryCodes = ["+61", "+1", "+91", "+44"];

  if (!value) {
    return { [type]: `${type} cannot be empty` };
  }

  let testResult;
  switch (type) {
    case "name":
    case "username":
      testResult = nameRegex.test(value);
      return !testResult
        ? {
            [type]: `${type} should contain at least 3 characters and no special characters are allowed`,
          }
        : null;

    case "email":
      testResult = emailRegex.test(value);
      return !testResult ? { [type]: `${type} is invalid` } : null;

    case "mobile":
      testResult = mobileRegex.test(value);
      return !testResult ? { [type]: `${type} number is invalid` } : null;

    case "country-code":
      testResult = countryCodes.includes(value);
      return !testResult ? { [type]: `${type} is not provided` } : null;

    default:
      return { [type]: `Invalid validation type: ${type}` };
  }
}
