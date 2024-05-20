import express from "express";
import { UserAuth, AdminAuth } from "../../../middlewares/auth.middleware.js";
import { ElectionController } from "../controllers/election.controller.js";

export const ElectionRouter = express.Router();
const electionController = new ElectionController();

/**
 * TODO: have to add auth so that only loggedin person can access this routes: done
 * TODO: call the respective function done
 * TODO: add the authentication middleware
 */
ElectionRouter.get("/active", UserAuth, (req, res, next) => {
    electionController.active(req, res, next);
});

ElectionRouter.get("/:electionId/get-details", UserAuth, (req, res, next) => {
    electionController.getDetails(req, res, next);
});

ElectionRouter.get("/:electionId/get-candidates", UserAuth, (req, res, next) => {
    electionController.getCandidates(req, res, next);
});
/**
 * TODO: have to secure this route so that only admin can access this link
 */
ElectionRouter.post("/:electionId/add-candiate", AdminAuth, (req, res, next) => {
    electionController.addCandidates(req, res, next);
});
// This section endpoints are related to votes
ElectionRouter.post("/:electionId/vote", (req, res, next) => {
    electionController.vote(req, res, next);
});