export type Item = {
  id: string | number;
  name?: string;
};

export type CustomAction = {
  type: string;
  payload: string;
};

export type FormState = {
  country: Country | null;
  city: City | null;
  education: Education | null;
  subject: Subject | null;
  accommodation: Accommodation | null;
}

export type Country = Item;
export type City = Item;
export type Accommodation = Item;
export type Subject = Item;
export type Education = Item;