import mongoose from "mongoose";
import { UserSchema } from "../schemas/user.schema.js";

const UserModel = mongoose.model('User', UserSchema);
// TODO: have to implement the register and login functionality
export class UserRepository {
    async register(userData) {
        try {

        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }
    async login(userData) {
        try {

        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }

}
