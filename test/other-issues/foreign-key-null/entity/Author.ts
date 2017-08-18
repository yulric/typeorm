import { Post } from './Post';
import { Entity } from '../../../../src/decorator/entity/Entity'
import { PrimaryGeneratedColumn } from '../../../../src/decorator/columns/PrimaryGeneratedColumn';
import { Column } from '../../../../src/decorator/columns/Column';
import { OneToMany } from '../../../../src/decorator/relations/OneToMany';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    authorId: number;

    @Column('string')
    name: string;

    @OneToMany(() => Post, post => post.author, {
        deReferenceRelation: false
    })
    posts: Array<Post>;
}