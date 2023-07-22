import { List_Product_Image } from "./list-product-image";

export class List_Product{
    id: number;
    name: string;
    price: number;
    stock: number;
    createdDate: string;
    updatedDate: string;
    productImageFiles:List_Product_Image[];
}