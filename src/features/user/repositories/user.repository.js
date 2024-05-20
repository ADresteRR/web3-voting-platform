import mongoose from "mongoose";
import { UserSchema } from "../schemas/user.schema.js";
import { compareHashedPassword, hashPassword } from "../../../utils/hashpassword.js";

const UserModel = mongoose.model('User', UserSchema);
/**
 * TODO: have to change the password before saving in register: done
 * 
 */
export class UserRepository {
    async register(userData) {
        try {
            userData.password = hashPassword(userData.password);
            const newUser = new UserModel(UserModel);
            await newUser.save();
            return newUser;

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
    async login(userData, next) {
        try {
            const { email, password } = userData;
            const userInfo = await UserModel.findOne({ email: email });
            if (!userInfo) {
                throw new Error(`no user found with email id`);
            }
            const passwordMatched = compareHashedPassword(password, userInfo.password, next);
            if (!passwordMatched) {
                throw new Error(`password is incorred`);
            }
            return {
                success: true,
                res: userInfo
            };

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
