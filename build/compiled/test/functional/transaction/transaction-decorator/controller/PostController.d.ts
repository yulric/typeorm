import { Post } from "../entity/Post";
import { EntityManager } from "../../../../../src/entity-manager/EntityManager";
import { Category } from "../entity/Category";
export declare class PostController {
    save(post: Post, category: Category, entityManager: EntityManager): Promise<void>;
    nonSafeSave(entityManager: EntityManager, post: Post, category: Category): Promise<void>;
}
