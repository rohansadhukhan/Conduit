import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Comment } from './Comment';
import { Tag } from './Tag';
import { User } from './User';

@Entity('articles')
export class Article {

    @PrimaryColumn({
        type: 'varchar',
        length: 30
    })
    slug: string;

    @Column({
        length: 50
    })
    title: string;

    @Column({
        length: 100,
        nullable: true
    })
    description: string;

    @Column({
        type: 'text'
    })
    body: string;

    @Column()
    favouriteCount: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => User, (user: User) => user.votedArticle)
    @JoinTable()
    votedUser: Array<User>

    @ManyToMany(() => User, (user: User) => user.favouriteArticles)
    @JoinTable()
    favouriteUsers: Array<User>;

    @ManyToOne(() => User, (user: User) => Article, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }) // Many article can be written by single user -> ManyToOne
    author: User;

    @OneToMany(() => Tag, (tags: Tag) => tags.article, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    tags: Array<Tag>;

    favourited: boolean;

    constructor(
        slug: string, 
        title: string, 
        description: string, 
        body: string, 
        tags: Tag[], 
        favourited: boolean, 
        favouriteCount: number, 
        author: User,
        favUsers: Array<User>
        ) {
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.body = body;
        this.tags = tags;
        this.favourited = favourited
        this.favouriteCount = favouriteCount;
        this.author = author;
        this.favouriteUsers = favUsers;
    }

}

    // "article": {
    //   "slug": "how-to-train-your-dragon",
    //   "title": "How to train your dragon",
    //   "description": "Ever wonder how?",
    //   "body": "It takes a Jacobian",
    //   "tagList": ["dragons", "training"],
    //   "createdAt": "2016-02-18T03:22:56.637Z",
    //   "updatedAt": "2016-02-18T03:48:35.824Z",
    //   "favorited": false,
    //   "favoritesCount": 0,
    //   "author": {
    //     "username": "jake",
    //     "bio": "I work at statefarm",
    //     "image": "https://i.stack.imgur.com/xHWG8.jpg",
    //     "following": false
    //   }
    // }