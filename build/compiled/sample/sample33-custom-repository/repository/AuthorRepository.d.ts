import { AbstractRepository } from "../../../src/repository/AbstractRepository";
import { Author } from "../entity/Author";
/**
 * Second type of custom repository - extends abstract repository (also can not extend anything).
 */
export declare class AuthorRepository extends AbstractRepository<Author> {
    createAndSave(firstName: string, lastName: string): Promise<Author>;
    findMyAuthor(): Promise<Author | undefined>;
}
