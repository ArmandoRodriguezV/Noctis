import type { ProjectRepository } from "../../project/domain/repositories/ProjectRepository.js";
import type { Task } from "../domain/entities/Task.js";
import type { TaskRepository } from "../domain/repositories/TaskRepository.js";
import type { CreateTaskDTO } from "./DTO/CreateTaskDTO.js";

export class CreateTaskUc {
    constructor(
        private taskRepository: TaskRepository,
        private projectRepository: ProjectRepository
    ) {}

    async exec(dto: CreateTaskDTO) {
        const owner = await this.projectRepository.findProjectById(dto.owner);
        if (!owner) throw new Error("No existe ningún proyecto");
        const map: Task = {
            title: dto.title,
            description: dto.description,
            owner: dto.owner,
            priority: dto.priority,
            deadline: dto.deadline
        }

        await this.taskRepository.createTask(map);
    }
}