export const formConfig = (
    name,
    type,
    placeholder,
    value,
    validationRequirement,
    isValid,
    touch
  ) => ({
    elementConfig: {
      type,
      placeholder,
      name,
    },
    value,
    validationRequirement,
    isValid,
    touch,
  });
  export const checkValidation = (inputVal, validationRequirement) => {
    let isValid = true;
    if (validationRequirement.isRequired)
      isValid = inputVal.trim().length > 0 && isValid;
    if (validationRequirement.minLength)
      isValid =
        inputVal.trim().length >= validationRequirement.minLength && isValid;
    if (validationRequirement.maxLength)
      isValid =
        inputVal.trim().length <= validationRequirement.maxLength && isValid;
    return isValid;
  };