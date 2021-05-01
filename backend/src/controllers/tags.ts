import { getRepository } from "typeorm";
import { Tag } from "../entities/Tag";

export async function getAllTags() {

    const repo = getRepository(Tag);
    const tags = await repo.find();
    var tagList: string[];
    // tags.forEach(tag => {
    //     tagList.push(tag.tag)
    // });
    
    return tags
}