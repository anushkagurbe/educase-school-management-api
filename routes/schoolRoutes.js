import express from "express";
import { addSchool, listSchools } from "../controllers/schoolControllers.js";

let router = express.Router();

router.post("/addSchool", addSchool);
router.get("/listschools", listSchools);

export default router;