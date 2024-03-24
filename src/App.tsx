import { useReducer, useMemo } from 'react';
import { reducer } from './reducer/reducer';
import { generateOptionsElements } from './utils/generateOptions';
import {
  educationList,
  humanitarianSubjects,
  technicalSubjectst,
  initialState,
  accommodationsList,
  russianCitiesList,
  belarusianCitiesList,
  countriesList
} from './constants';
import { City, Accommodation, Subject, FormState } from './types/types';
import "./styles/App.css"

const excludeForRbIds = [3, 4];
const countryIds = {
  russia: 1,
  belarus: 2,
}
const eduIds = {
  technical: 1,
  humanitarian: 2,
}
const sochiId = 2;

const getAvailableCities = ({ country }: FormState): City[] => {
  return country?.id == countryIds.russia
    ? russianCitiesList
    : belarusianCitiesList;
}

const getAvailableAccommodations = ({ city, country }: FormState): Accommodation[] => {
  return city
    ? accommodationsList.filter((accommodation) => {
      if (
        excludeForRbIds.includes(accommodation.id) &&
        country?.id == countryIds.belarus
      ) {
        return false;
      }
      return true;
    })
    : [];
}

const getAvailableEducationList = ({ city }: FormState) => {
  return city
    ? educationList.filter(({ id }) => {
      if (city?.id == sochiId && id == eduIds.humanitarian) {
        return false;
      }
      return true;
    })
    : [];
}

const getAvailableSubjectList = ({ education }: FormState): Subject[] => {
  if (education) {
    return education.id == eduIds.humanitarian
      ? humanitarianSubjects
      : technicalSubjectst;
  }
  return [];
}

function App() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  console.log(formState)
  const { citiesList, accommodationList, educationList, subjectTypesList } =
    useMemo(() => {
      return {
        countriesList,
        citiesList: getAvailableCities(formState),
        accommodationList: getAvailableAccommodations(formState),
        educationList: getAvailableEducationList(formState),
        subjectTypesList: getAvailableSubjectList(formState),
      }
    }, [formState])

  const isDisabled = useMemo(() => {
    return Object.values(formState).some((item) => item === null);
  }, [formState]);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <form
        className="form"
        onSubmit={handleSubmit}>
        <select
          aria-label="country"
          name={"country"}
          onChange={(e) => {
            dispatch({
              type: "changed_country",
              payload: e.target.value,
            });
          }}
        >
          {generateOptionsElements(countriesList)}
        </select>
        <select
          aria-label="city"
          name={"city"}
          disabled={!formState.country}
          onChange={(e) => {
            dispatch({
              type: "changed_city",
              payload: e.target.value,
            });
          }}
        >
          {generateOptionsElements(citiesList)}
        </select>
        <select
          aria-label="education"
          name={"education"}
          disabled={!formState.city}
          onChange={(e) => {
            dispatch({
              type: "changed_education",
              payload: e.target.value,
            });
          }}
        >
          {generateOptionsElements(educationList)}
        </select>
        <select
          aria-label="subject"
          name={"subject"}
          disabled={!formState.education}
          onChange={(e) => {
            dispatch({
              type: "changed_subject",
              payload: e.target.value,
            });
          }}
        >
          {generateOptionsElements(subjectTypesList)}
        </select>
        <select
          aria-label="accommodation"
          name={"accommodation"}
          disabled={!formState.subject}
          onChange={(e) => {
            dispatch({
              type: "changed_accommodation",
              payload: e.target.value,
            });
          }}
        >
          {generateOptionsElements(accommodationList)}
        </select>
        <button
          className="form__button"
          disabled={isDisabled}>
          Отправить</button>
      </form>
    </div>
  )
}

export default App
