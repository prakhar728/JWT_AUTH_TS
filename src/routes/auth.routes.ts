import express from "express";
import { CreateSessionHandler, refreshAccessTokenHandler } from "../controller/auth.controller";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/auth.schema";

const router = express.Router();

router.post("/api/sessions",validateResource(createSessionSchema),CreateSessionHandler);

router.post("/api/sessions/refresh",refreshAccessTokenHandler);
export default router;