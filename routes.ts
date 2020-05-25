import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "./tasks.controller.ts";

const router = new Router();

router.get("/api/tasks", getTasks);
router.get("/api/tasks/:name", getTask);
router.post("/api/tasks", createTask);
router.put("/api/tasks/:name", updateTask);
router.delete("/api/tasks/:name", deleteTask);

export default router;
