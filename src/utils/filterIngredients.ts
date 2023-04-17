import {TIngredient} from "../services/types/Data";

export const filterIngredients = (filteredObj:  TIngredient[], filter: string) => {
  return filteredObj.filter((x: any) => x.type === filter);
}