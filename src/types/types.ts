export type Item = {
  id: number;
  name: string;
};

export type CustomAction = {
  type: string;
  payload: string;
};

export type DataTypes = Item & {
  city: Item[];
  accommodation: Item[];
};

export type FormState = {
  country: DataTypes | null;
  city: Item | null;
  education: string | null;
  accommodation: Item | null;
}