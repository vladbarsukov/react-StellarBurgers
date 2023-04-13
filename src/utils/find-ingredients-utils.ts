import {TIngredient} from "../services/types/Data";

export const findIngredient = (ing: string, array: TIngredient[]) => {
  return  array?.find(({ _id }) => _id === ing)
}
export const findAllIngredient = (ingArr: string[], array: TIngredient[]) => {
  let arr: any[] = []
  ingArr.forEach((order)=> {
    arr.push(array?.find(({ _id }) => _id === order))
  })
  return arr
}

export const orderPriceCalculator = (ingArr: string[], array: TIngredient[]) => {
  return  findAllIngredient(ingArr, array)?.reduce((prev, next) => prev + next?.price, 0)
}