const initialState = {
  steps: [
    {
      name: 'typeOfTrust',
      schema: {
        title: "Type of Trust",
        type: "object",
        properties: {
          "typeOfTrust": {
            "type": "string",
            "title": "Type of Trust",
            "enum": [
              'Irrecovable',
              'Revocable'
            ],
            "enumNames":[
              'Irrevocable Trust',
              'Revocable Trust'
            ]
          }
        }
      },
      formData: {},
      uiSchema: {
        typeOfTrust: {
          "ui:widget": "radio",
          "ui:options": {
            label: false
          }
        }
      }
    },
    {
      secondaryForm: true,
      secondaryFormShow: false,
      name: "trigger",
      schema: {
        title: "Trigger",
        type: "object",
        properties: {
          "trigger": {
            "type": "string",
            "title": "Trigger",
            "enum": [
              'Fixed Date',
              'Death',
              'Price of Ether',
              'Target Ether Amount'
            ]
          }
        },
        secondaryForms: {
          'Fixed Date': {
            schema: {
              title: "Fixed Date",
              type: "object",
              properties: {
                "fixedDate": {
                  "type": "string",
                  "title": "Date of release"
                }
              },
              uiSchema: {
                "Fixed Date": {
                  "ui:widget": "date"
                }
              }
            },
            formData: {}
          },
          'Death': {
            schema: {
              title: "Death",
              type: "object",
              properties: {
                "pulse": {
                  "type": "integer",
                  "title": "Number of days between pulse"
                }
              },
            },
            formData: {}
          },
          'Price of Ether': {
            schema: {
              title: "Price of Ether",
              type: "object",
              properties: {
                "Price of Ether": {
                  "type": "integer",
                  "title": "USD value of Ether"
                }
              },
            },
            formData: {}
          },
          'Target Ether Amount': {
            schema: {
              title: "Amount of Ether",
              type: "object",
              properties: {
                "Target Ether Amount": {
                  "type": "integer",
                  "title": "Amount of Ether required before release"
                }
              },
            },
            formData: {}
          }
        }
      },
      formData: {

      },
      uiSchema: {
        trigger: {
          "ui:widget": "radio",
          "ui:options": {
            label: false
          }
        }
      }
    },
    {
      name: 'beneficaries',
      secondaryForm: false,
      schema: {
        title: "Beneficiary",
        type: "object",
        properties: {
          "beneficaries": {
            "type": "array",
            "title": "Add a beneficiary",
            "items": {
              "type": "string",
            }
          }
        }
      },
      formData: {},
      uiSchema: {
        beneficaries: {
          "ui:widget": "radio",
          "ui:options": {
            "orderable": false
          }
        }
      }
    },
  ],
  currentStep: 0,
}

export default function reducer(state = initialState, action = {}){
  let obj = { ...state }
  switch(action.type) {


    case 'UPDATE_FORM_DATA':
      let selected = obj.steps[action.index].formData[action.name]
      if(action.secondary) {
        obj.steps[action.index].schema.secondaryForms[selected].formData = action.data
      } else {
        obj.steps[action.index].formData = action.data
      }

      return obj
    case 'TOGGLE_SECONDARY_FORM':
      obj.steps[action.index].secondaryFormShow = !obj.steps[action.index].secondaryFormShow
      return obj

    case 'INCREMENT_STEP':
      return {
        ...state,
        currentStep: action.currentStep
      }

    default:
      return state



  }
}
