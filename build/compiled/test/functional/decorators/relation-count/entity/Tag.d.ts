import { Post } from "./Post";
export declare class Tag {
    id: number;
    name: string;
    posts: Post;
    postsCount: number;
    secondTagsCount: number;
}
