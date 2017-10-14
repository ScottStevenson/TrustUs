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
            ]
          }
        }
      },
      formData: {},
      uiSchema: {
        typeOfTrust: {
          "ui:widget": "radio"
        }
      }
    },
    {
      schema: {
        title: "Trigger",
        type: "object",
        secondaryForm: true,
        secondaryFormShow: false,
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
                  "type": "date",
                  "title": "Date of release"
                }
              },
            },
            formData: {}
          },
          'Death': {
            schema: {
              title: "Fixed Date",
              type: "object",
              required: ["fixedDate"],
              properties: {
                "fixedDate": {
                  "type": "date",
                  "title": "Date of release"
                }
              },
            },
            formData: {}
          },
          'Price of Ether': {
            schema: {
              title: "Fixed Date",
              type: "object",
              required: ["fixedDate"],
              properties: {
                "fixedDate": {
                  "type": "date",
                  "title": "Date of release"
                }
              },
            },
            formData: {}
          },
          'Target Ether Amount': {
            schema: {
              title: "Fixed Date",
              type: "object",
              required: ["fixedDate"],
              properties: {
                "fixedDate": {
                  "type": "date",
                  "title": "Date of release"
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
  switch(action.type) {

    case 'UPDATE_FORM_DATA':
      let obj = {
        ...state,
      }

      if(action.secondary) {
        obj.steps[action.index][name].formData = action.data
      } else {
        obj.steps[action.index].formData = action.data
      }

      return obj
      break;
    default:
      return state
  }
}
