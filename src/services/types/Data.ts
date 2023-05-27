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

export type TRegistrationRequest ={
    email: string
    password: string
    name: string
}
export type TChangeUserDataRequest ={
    email: string
    password: string
    login: string
}
export type TChangeUserDataResponse ={
    user: {
        email: string
        name: string
    }
}

export type TResetPasswordRequest ={
    token: string
    password: string
}

export type TForgotPasswordRequest ={
    email: string
}

export type TSignInRequest ={
    email: string
    password: string
}

export type TResponse<T> = {
    success: boolean;
} & T;

export type TSignInResponse = {
    user: TUser;
    accessToken : string
    refreshToken: string
}

export type TUserResponce = {
    user: TUser;
}

export type TIngredientResponse = {
    data: TIngredient[]
}

export type TOwner = {
    email: string
    name: string
    createdAt: string
    updatedAt: string
}

export type TPostOrder = {
    _id: string
    status: string
    name: string
    createdAt: string
    ingredients: Array<TIngredient>
    number: number
    price: number
    updatedAt: string
    owner: TOwner
}
export type TPostOrderResponse = {
    name: string
    order: TPostOrder
}

export type TTokenResponse = {
    accessToken: string
}
