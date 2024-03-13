import { Item } from "../types/types";
import { defaultOption } from "../constants";

export const generateOptionsElements = (values?: Item[]) => {
  return [{ id: "", name: defaultOption }, ...(values ?? [])]?.map(
    (item) => (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    )
  );
}