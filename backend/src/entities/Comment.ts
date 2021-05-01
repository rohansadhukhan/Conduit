import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    comment: string;

    @ManyToOne(() => User, (user: User) => Comment)
    author: User;

    @ManyToOne(() => Article, (article: Article) => Comment)
    article: Article;

    constructor(comment: string, article: Article, author: User) {
        this.comment = comment
        this.article = article
        this.author = author
    }

}