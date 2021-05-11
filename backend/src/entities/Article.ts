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
        cascade: ['insert'],
        onUpdate: 'CASCADE'
    })
    author: User;

    @ManyToMany(() => Tag, (tag: Tag) => tag.name, {
        cascade: ['insert'],
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    tags: Array<Tag>;

    favourited: boolean;

    constructor(
        slug: string, 
        title: string, 
        description: string, 
        favourited: boolean, 
        favouriteCount: number, 
        tags: Array<Tag>,
        author: User,
        favUsers: Array<User>
        ) {
        this.slug = slug;
        this.title = title;
        this.description = description;
        this.favourited = favourited
        this.favouriteCount = favouriteCount;
        this.tags = tags;
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