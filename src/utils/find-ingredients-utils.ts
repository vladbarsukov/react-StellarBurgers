import {TIngredient} from "../services/types/Data";

export const findIngredient = (ing: string, array: TIngredient[]) => {
  return  array?.find(({ _id }) => _id === ing)
}
export const findAllIngredient = (ingArr: string[], array: TIngredient[]): TIngredient[] => {

  let arr: TIngredient[] = []
  ingArr.forEach((order)=> {
    // arr.push(array?.find(({ _id }) => _id === order))
    const item = array.find(({ _id }) => _id === order)
    if (item) {
      arr.push(item)
    }
  })
  return arr
}

export const orderPriceCalculator = (ingArr: string[], array: TIngredient[]) => {
  return  findAllIngredient(ingArr, array)?.reduce((prev, next) => prev + next?.price, 0)
}