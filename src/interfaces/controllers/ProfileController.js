import {ProfileRepository} from "infra/repositories/ProfileRepository"
const _profileRepository = new ProfileRepository();

export class ProfileController {

    constructor() { }
    profile(req, res) {
        const { user } = req;
        return res.send({message: _profileRepository.updateProfile(req, res)});
    }
}