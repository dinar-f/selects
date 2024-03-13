import { useReducer, useMemo } from 'react';
import { reducer } from './reducer/reducer';
import { generateOptionsElements } from './utils/generateOptions';
import { contriesList, educationList, initialState } from './constants';
import "./styles/App.css"

function App() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { country, city } = formState;

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
          name={"country"}
          onChange={(e) => {
            dispatch({
              type: "changed_country",
              payload: e.target.value,
            });
          }}
        >
          {generateOptionsElements(contriesList)}
        </select>
        <select
          name={"city"}
          disabled={!country}
          onChange={(e) => {
            dispatch({
              type: "changed_city",
              payload: e.target.value,
            });
          }}
        >
          {generateOptionsElements(country?.city)}
        </select>
        <select
          name={"education"}
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
          name={"accommodation"}
          disabled={!city}
          onChange={(e) => {
            dispatch({
              type: "changed_accommodation",
              payload: e.target.value,
            });
          }}
        >
          {generateOptionsElements(country?.accommodation)}
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
