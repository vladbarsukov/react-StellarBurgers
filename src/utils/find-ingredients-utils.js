export const findIngredient = (ing, array) => {
  return  array?.find(({ _id }) => _id === ing)
}
export const findAllIngredient = (ingArr, array) => {
  let arr = []
  ingArr.forEach((order)=> {
    arr.push(array?.find(({ _id }) => _id === order))
  })
  return arr
}

export const orderPriceCalculator = (ingArr, array) => {
  return  findAllIngredient(ingArr, array)?.reduce((prev, next) => prev + next?.price, 0)
}