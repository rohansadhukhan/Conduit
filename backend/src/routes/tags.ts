import { Router } from "express";
import { getAllTags } from "../controllers/tags";

const route = Router()

route.get('/', async (req, res) => {
    try {
        const tags = await getAllTags();
        res.status(200).json({tags})
    } catch (e) {
        return res.status(400).json({
            errors: {
                body: [
                    "Something went wrong",
                    e.message
                ]
            }
        })
    }
})

export const tagsRouter = route