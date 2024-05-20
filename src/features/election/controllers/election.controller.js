import { ElectionRepository } from "../repositories/election.repository.js";
import { customErrorHandler } from "../../../middlewares/errorhandler.middleware.js";

/**
 * TODO: return apropriate return message
 */
export class ElectionController {
    constructor() {
        this.electionRepository = new ElectionRepository();
    }
    async active(req, res, next) {
        const resp = await this.electionRepository.active();
        if (resp.success) {
            return res.sattus(200).json({
                success: true,
                res: resp.res
            })
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
    async getDetails(req, res, next) {
        const { electionId } = req.params;
        const resp = this.electionRepository.getDetails(electionId);
        if (resp.success) {
            return res.status(200).json({
                success: true,
                res: resp.res
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
    async getCandidates(req, res, next) {
        const { electionId } = req.params;
        const resp = await this.electionRepository.getCandidates(electionId);
        if (resp) {
            return res.status(200).json({
                success: true,
                res: resp.res
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
    async addCandidates(req, res, next) {
        //TODO: array or single elements ? a candidate list should be 
        // TODO: assuming sinle at a time
        const { electionId } = req.params;
        const { candidateEmail } = req.body;
        const resp = this.electionRepository.addCandidates(electionId, candidateEmail);
        if (resp.success) {
            return res.status(201).json({
                success: true,
                msg: `${candidateEmail} is added as candidate in election ${electionId}`
            })
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
    // this set of functions are related to give vote and geting resuls
    async vote(req, res, next) {
        const { candidateId } = req.body;
        const { electionId } = req.params;
        const userId = req._id;
        const resp = this.electionRepository.vote(electionId, candidateId, userId);
        if (resp.success) {
            return res.status(201).json({
                success: true,
                msg: `you ${userId} voted ${candidateId}`
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

}