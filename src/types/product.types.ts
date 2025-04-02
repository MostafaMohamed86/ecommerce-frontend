type TRating = {
    rate: number;
    count: number;
}
export type TProduct = {
    id: number;
    title: string;
    price: number;
    cat_prefix?: string;
    image: string;
    quantity?: number;
    max: number;
    rating?: TRating;
    isLiked?: boolean;
    isAuthenticated?: boolean;
}