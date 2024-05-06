import { UserRepository } from "../repositories/user.repository.js";
// TODO: have to implement jwttoken and other stuff
export class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async register(req, res, next) {
        const userData = req.body;
        const resp = this.userRepository.register(userData);
        if (resp.success) {

        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
    async login(req, res, next) {
        const userData = req.body;
        const resp = this.userRepository.login(userData);
        if (resp.success) {

        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
}