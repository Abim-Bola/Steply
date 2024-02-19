import BaseRepository from "infra/repositories/BaseRepository"
import container from "container"
import User from "infra/database/models/user"
 class ProfileRepository extends BaseRepository {
    constructor({ User }, currentUser) {
        super({ Model: User })
        this.User = User
        this.currentUser = currentUser;
      }

    async get(payload) {
        console.log(this.currentUser)
        console.log(container.cradle.currentUser.id)
        const existingUserProfile =  await this.find({ _id: container.cradle.currentUser.id }, undefined, undefined)
        return existingUserProfile;
      }
}

export default new ProfileRepository({ User })