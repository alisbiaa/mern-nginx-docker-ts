import {Router} from "express";
import tutorialRoutes from "./tutorial.routes";

const BaseRouter = Router();

BaseRouter.use("/api/tutorials", tutorialRoutes);

export default BaseRouter;
