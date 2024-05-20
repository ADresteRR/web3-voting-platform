import mongoose from "mongoose";
import { ElectionSchema } from "../schemas/election.schema.js";
import { UserSchema } from "../../user/schemas/user.schema.js";

const ElectionModel = mongoose.model('Election', ElectionSchema);
const UserModel = mongoose.model('User', UserSchema);
/**
 * TODO: have to implement this function 
 */
export class ElectionRepository {
    async active() {
        try {
            const currentDate = new Date();
            const results = await ElectionModel.find({ endDate: { $lte: currentDate } });
            return {
                success: true,
                res: results
            }
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
    async getDetails(electionId) {
        try {
            const results = await ElectionModel.findById(electionId);
            return {
                success: true,
                res: results
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
    async getCandidates(electionId) {
        try {
            const results = await ElectionModel.findById(electionId);
            return {
                success: true,
                res: results.candidates
            }
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
    /**
     * TODO: have to figure out what information to take while we have to add a candidate, like id or direct email 
     */
    async addCandidates(electionId, candidateEmail) {
        try {
            // TODO: have to add the candidate if not already present in the list
            const candidateDetails = await UserModel.findOne({ email: candidateEmail });
            const isPresent = await ElectionModel.findOne({ candidates: { $in: [candidateDetails._id] } });
            if (!isPresent) {
                await ElectionModel.findOneAndUpdate({ _id: electionId }, { $push: { candidates: candidateDetails._id } });
            }
            return {
                success: true
            }
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