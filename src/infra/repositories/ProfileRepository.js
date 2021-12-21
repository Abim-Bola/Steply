export class ProfileRepository {
    constructor() { }

    updateProfile(req, res) {
        console.log(req.body);
        return "updated successfully";
    }
}