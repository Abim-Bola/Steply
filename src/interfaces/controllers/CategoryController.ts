import  CategoryRepository from "infra/repositories/CategoryRepository"
import { ICategory } from "../../infra/types/category"

export class CategoryController {

    constructor() { }
    create(req, res) {
        const payload = req.body as Pick<ICategory, "name">
        return res.send({ message: CategoryRepository.create(payload) });
    }
}