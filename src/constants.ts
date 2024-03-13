import { DataTypes } from "./types/types"

export const defaultOption: string = "-- Select value --";

export const educationList = [
  { id: 5, name: "Технический" },
  { id: 6, name: "Гуманитарный" }
]

export const contriesList: DataTypes[] = [
  {
    id: 1, name: "Russia",
    city: [
      { id: 1, name: "Moskow" },
      { id: 2, name: "Kazan" },
    ],
    accommodation: [
      { id: 1, name: "Общежитиe" },
      { id: 2, name: "Не интересует" },
      { id: 3, name: "Общежития + Аренда" },
      { id: 4, name: "Аренда" }
    ]
  },
  {
    id: 2, name: "Belarus",
    city: [
      { id: 3, name: "Gomel" },
      { id: 4, name: "Minsk" },
    ],
    accommodation: [
      { id: 1, name: "Общежитие" },
      { id: 2, name: "Не интересует" }
    ]
  },
]