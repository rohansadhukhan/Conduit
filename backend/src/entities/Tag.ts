import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";


@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @ManyToOne(() => Article, (article: Article) => Tag, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    article: Article;

    constructor(tag: string, article: Article) {
        this.tag = tag;
        this.article = article;
    }

}