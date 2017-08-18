import { Author } from './Author';
import { Entity } from '../../../../src/decorator/entity/Entity'
import { PrimaryGeneratedColumn } from '../../../../src/decorator/columns/PrimaryGeneratedColumn';
import { ManyToOne } from '../../../../src/decorator/relations/ManyToOne';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    postId: number;

    @ManyToOne(() => Author, author => author.posts)
    author: Author;
}