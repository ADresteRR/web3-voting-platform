import express from "express";
import cors from "cors";
export const server = express();

// application level middleware
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
// default endpoint
server.get("/", (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "api server is on"
    });
})


