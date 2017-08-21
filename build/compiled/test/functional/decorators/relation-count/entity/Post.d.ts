import { Category } from "./Category";
import { Tag } from "./Tag";
export declare class Post {
    id: number;
    title: string;
    tag: Tag;
    categories: Category[];
    categoriesCount: number;
    secondCategoriesCount: number;
}
