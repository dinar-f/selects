import { contriesList, defaultOption } from "../constants";
import { FormState, CustomAction } from "../types/types";

export const reducer = (state: FormState, action: CustomAction): FormState => {
  switch (action.type) {
    case "changed_country": {
      return {
        ...state,
        country: contriesList.find(({ name }) => action.payload == name) ?? null,
        city: null,
        accommodation: null,
      }
    }
    case "changed_city": {
      const citiesList =
        contriesList.find(({ name }) => state?.country?.name == name)?.city ?? [];

      return {
        ...state,
        city: citiesList.find(({ name }) => action.payload == name) ?? null,
        accommodation: null,
      };
    }
    case "changed_accommodation": {
      const accommodationList =
        contriesList.find(({ name }) => state?.country?.name == name)
          ?.accommodation ?? [];

      return {
        ...state,
        accommodation:
          accommodationList.find(({ name }) => action.payload == name) ?? null,
      };
    }
    case "changed_education": {
      return {
        ...state,
        education: action.payload !== defaultOption ? action.payload : null,
      };
    }
    default: return state
  }
}