import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { Article } from './Article';

@Entity('users')
export class User {

    @Column({
        unique: true,
        nullable: false
    })
    username: string;

    @PrimaryColumn()
    email: string;

    @Column({
        nullable: false
    })
    password?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    bio?: string;

    @Column({
        nullable: true
    })
    image?: string;

    token?: string;

    @ManyToMany(() => Article, (article: Article) => article.favouriteUsers)
    favouriteArticles: Array<Article>;

    @ManyToMany(() => Article, (article: Article) => article.votedUser)
    votedArticle: Array<Article>;

    @ManyToMany(() => User, (user: User) => user.following)
    followers: Array<User>;

    @ManyToMany(() => User, (user: User) => user.followers)
    following: Array<User>;

    constructor(username: string, email: string, password?: string, favArticles?: Array<Article>) {
        this.username = username
        this.email = email
        this.password = password
        this.favouriteArticles = favArticles!
    }

}