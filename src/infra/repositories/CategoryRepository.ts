import BaseRepository from "infra/repositories/BaseRepository"
// import  sanitize  from "helpers/sanitize"
import passwordService from "helpers/password"
import ConflictError from "interfaces/errors/ConflictError"
import ResourceNotFoundError from "interfaces/errors/ResourceNotFoundError"
import InvalidPayloadError from "interfaces/errors/InvalidPayloadError"
import  Category  from "infra/database/models/category"

class CategoryRepository extends BaseRepository {
  constructor({ Category }) {
    super({ Model: Category })
  }

  async create(payload) {
   console.log(payload)
  }

  async get(payload) {
    try {
    } catch (error) {
      return error
    }
  }
}

export default new CategoryRepository({ Category })
