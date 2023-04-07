export type TOrderDetails = {
    success: boolean;
    name: string;
    order: {
        ingredients: TIngredient[];
        _id: string;
        owner: {
            name: string;
            email: string;
            createdAt: string;
            updatedAt: string;
        };
        status: string;
        createdAt: string;
        updatedAt: string;
        number: number;
        price: number;
    };
}

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}