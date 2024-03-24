import { FormState, Country, City, Education, Subject } from "./types/types"

export const defaultOption: string = "-- Select value --";

export const initialState: FormState = {
  country: null,
  city: null,
  education: null,
  subject: null,
  accommodation: null,
};

export const countriesList: Country[] = [
  { id: 1, name: "Россия" },
  { id: 2, name: "Беларусь" },
]

export const russianCitiesList: City[] = [
  { id: 1, name: "Москва" },
  { id: 2, name: "Сочи" }
]

export const belarusianCitiesList: City[] = [
  { id: 3, name: "Гомель" },
  { id: 4, name: "Минск" }
]

export const educationList: Education[] = [
  { id: 1, name: "Технический" },
  { id: 2, name: "Гуманитарный" }
]

export const accommodationsList = [
  { id: 1, name: "Общежитиe" },
  { id: 2, name: "Не интересует" },
  { id: 3, name: "Общежитие + Аренда" },
  { id: 4, name: "Аренда" }
]

export const technicalSubjectst: Subject[] = [
  { id: 1, name: "Математика" },
  { id: 2, name: "Физика" }
]
export const humanitarianSubjects: Subject[] = [
  { id: 3, name: "История" },
  { id: 4, name: "Философия" }
]