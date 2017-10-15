const initialState = {
  steps: [
    {
      schema: {
        title: "Type of Trust",
        type: "object",
        required: ["typeOfTrust"],
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
      schema: {
        title: "Trigger",
        type: "object",
        name: "trigger",
        required: ["trigger"],
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
              required: ["fixedDate"],
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
              required: ["fixedDate"],
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
              required: ["Price of Ether"],
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
              required: ["Amount of Ether"],
              properties: {
                "Amount of Ether": {
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
          "ui:widget": "radio"
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

      if(action.secondary) {
        obj.steps[action.index][name].formData = action.data
      } else {
        obj.steps[action.index].formData = action.data
      }

      return obj
    case 'TOGGLE_SECONDARY_FORM':
      obj.steps[action.index].secondaryFormShow = !obj.steps[action.index].secondaryFormShow
      return obj

    default:
      return state
  }
}
