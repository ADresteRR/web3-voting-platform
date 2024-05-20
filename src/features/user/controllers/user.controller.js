import { UserRepository } from "../repositories/user.repository.js";
/**
 * TODO: implement jwt token: done
 */
export class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async register(req, res, next) {
        const userData = req.body;
        const resp = this.userRepository.register(userData);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: `${userData.email} registerred successfully`
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
    async login(req, res, next) {
        // userData include email and password only
        const userData = req.body;
        const resp = this.userRepository.login(userData, next);
        if (resp.success) {
            const token = jwt.sign({ _id: resp.res._id }, SECRET_KEY, {
                expiresIn: "1h",
            });
            res
                .cookie("jwtToken", token, { maxAge: 12 * 60 * 60 * 1000, httpOnly: true, secure: false })
                .json({ success: true, isAdmin: resp.res.isAdmin, msg: "user login successful", token });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
}