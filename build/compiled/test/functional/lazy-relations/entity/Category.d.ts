import { Post } from "./Post";
export declare class Category {
    id: number;
    name: string;
    twoSidePosts: Promise<Post[]>;
    twoSidePosts2: Promise<Post[]>;
}
