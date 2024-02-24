import BaseRepository from "infra/repositories/BaseRepository"
import container from "container"
import { sanitize } from "helpers/sanitize"
import User from "infra/database/models/user"
 class ProfileRepository extends BaseRepository {
    constructor({ User }, currentUser) {
        super({ Model: User })
        this.User = User
        this.currentUser = currentUser;
      }

    async get(payload) {
        const existingUserProfile =  await this.find({ _id: container.cradle.currentUser.id }, undefined, undefined)
        return sanitize(existingUserProfile)
      }
}

export default new ProfileRepository({ User })