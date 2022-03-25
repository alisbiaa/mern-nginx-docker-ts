import {Router} from "express";
import {
    findAllPublished,
    findAll,
    deleteAll,
    findOne,
    remove,
    update,
    create
} from "../controllers/tutorial.controller";
const router = Router();

// Create a new Tutorial
router.post("/", create);

// Retrieve all Tutorials
router.get("/", findAll);

// Retrieve all published Tutorials
router.get("/published", findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", findOne);

// Update a Tutorial with id
router.put("/:id", update);

// Delete a Tutorial with id
router.delete("/:id", remove);

// Create a new Tutorial
router.delete("/", deleteAll);

export default router;
