export function ValidateForm(requiredFieldsArray = [""], data = {}) {
  let invalidFields = [];
  const isValid = requiredFieldsArray.every((field) => {
    return Object.keys(data).includes(field) && data[field] !== "";
  });
  console.log("Validando os dados: ", data);
 
  if (!isValid) {
    invalidFields = requiredFieldsArray.filter((field) => {
      return (
        !Object.keys(data).includes(field) || data[field] === ""
      );
    });
  }
  return { isValid, invalidFields };
}
