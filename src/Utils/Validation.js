export function ValidateForm(requiredFieldsArray = [""], data = {}) {
  let invalidFields = [];
  const isValid = requiredFieldsArray.every((field) => {
    return Object.keys(data).includes(field) && data[field] !== "";
  });

  if (!isValid) {
    invalidFields = requiredFieldsArray.filter((field) => {
      return (
        !Object.keys(data).includes(field) || data[field] === ""
      );
    });
  }
  return { isValid, invalidFields };
}
