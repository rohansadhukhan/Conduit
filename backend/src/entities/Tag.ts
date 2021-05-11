import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Article, (article: Article) => article.tags, {
        cascade: ['insert'],
        onUpdate: 'CASCADE'
    })
    articles: Array<Article>;

    constructor(name: string) {
        this.name = name;
    }

}