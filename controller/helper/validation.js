module.exports = () => {
    let module = {};
  
    module.allMandatoryFieldsExists = (req_body, mandatoryFields) => {

      let allMandatoryFieldsExists = true;
      mandatoryFields.map(mandatoryField => {
        if (!Object.keys(req_body).includes(mandatoryField)){
          console.log("missing field :", mandatoryField)
          allMandatoryFieldsExists = false;
        }
      });
      return allMandatoryFieldsExists;
    };
  
    return module;
  };