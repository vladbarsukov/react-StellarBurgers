export const filterIngredients = (filteredObj: any, filter: string) => {
  return filteredObj.filter((x: any) => x.type === filter);
}