import { FormState, CustomAction } from "../types/types";

export const reducer = (state: FormState, action: CustomAction): FormState => {
  switch (action.type) {
    case "changed_country": {
      return {
        ...state,
        country: action.payload ? { id: action.payload } : null,
        city: null,
        accommodation: null,
        education: null,
        subject: null
      }
    }
    case "changed_city": {
      return {
        ...state,
        city: action.payload ? { id: action.payload } : null,
        education: null,
        accommodation: null,
        subject: null
      };
    }
    case "changed_education": {
      return {
        ...state,
        education: action.payload ? { id: action.payload } : null,
        subject: null
      };
    }
    case "changed_subject": {
      return {
        ...state,
        subject: action.payload ? { id: action.payload } : null,
      };
    }
    case "changed_accommodation": {
      return {
        ...state,
        accommodation: action.payload ? { id: action.payload } : null,
      };
    }
    default: return state
  }
}