import { Category } from "./Category";
import { Tag } from "./Tag";
export declare class Post {
    id: number;
    title: string;
    tag: Tag;
    tagId: number;
    categories: Category[];
    categoryIds: number[];
    allCategoryIds: number[];
}
