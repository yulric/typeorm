import "reflect-metadata";
import { createTestingConnections, closeTestingConnections, reloadTestingDatabases } from "../../utils/test-utils";
import { Connection } from "../../../src/connection/Connection";
import { Post } from "./entity/Post";
import { Author } from './entity/Author';
import { expect } from "chai";

describe(`Foreign Key is Null`, function () {
    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [Post, Author],
        schemaCreate: true,
        dropSchemaOnConnection: true,
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it(`should not set the author column in the database to NULL`, function () {
        return Promise.all(connections.map(async (connection) => {
            const postOne = new Post();

            const author = new Author();
            author.posts = [postOne]
            author.name = 'Jake Archibald';

            postOne.author = author;

            await connection.entityManager.transaction(async (entityManager) => {
                await entityManager.getRepository(Author)
                    .persist(author);
                await entityManager.getRepository(Post)
                    .persist(postOne)
            });

            author.name = 'John Doe';
            const postTwo = new Post();
            postTwo.author = author;
            author.posts = [ postTwo ];

            await connection.entityManager.transaction(async (entityManager) => {
                await entityManager.getRepository(Author)
                    .persist(author);
                await entityManager.getRepository(Post)
                    .persist(postTwo)
            });

            const posts = await connection.entityManager
                .getRepository(Post)
                .find({
                    alias: 'post',
                    leftJoinAndSelect: {
                        'author': 'post.author'
                    }
                });
            posts.forEach((post) => {
                expect(post.author).to.exist;
            });
        }))
    });
});