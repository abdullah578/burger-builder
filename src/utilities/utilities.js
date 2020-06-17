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