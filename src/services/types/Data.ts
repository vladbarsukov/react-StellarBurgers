export type TOrderDetails = {
    success: boolean;
    name: string;
    order: {
        ingredients: Array<TIngredient>;
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
    type: "main" | "bun";
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
export type TUserRequest = {
    success: boolean;
    user: TUser;
}

export type TUser = {
    email: string;
    name: string;
}

export type TOrdersRequest = {
    total: number;
    totalToday: number;
    orders: Array<TOrder>
}
export type TOrder = {
    _id: string;
    ingredients: Array<string>;
    status: "created" | "pending" | "done";
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}