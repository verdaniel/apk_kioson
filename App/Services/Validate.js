import validate from 'validate.js'
import constraints from './Validation'

const validator = (value, fieldName) => {
  var formValues = {}
  formValues[fieldName] = value

  var formFields = {}
  formFields[fieldName] = constraints[fieldName]

  const result = validate(formValues, formFields, {format: 'detailed'})
  if (result) {
    return result[0].options.message
  }

  return ''
}

export default validator
