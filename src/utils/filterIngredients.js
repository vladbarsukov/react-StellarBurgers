export const filterIngredients = (filteredObj, filter) => {
  return filteredObj.filter((x) => x.type === filter);
}