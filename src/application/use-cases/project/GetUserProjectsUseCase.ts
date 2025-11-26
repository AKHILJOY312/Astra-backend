// src/core/use-cases/project/GetUserProjectsUseCase.ts
import { Project } from "../../../domain/entities/project/Project";
import { IProjectRepository } from "../../repositories/IProjectRepository";

export interface GetUserProjectsDTO {
  userId: string;
}

export interface GetUserProjectsResultDTO {
  projects: Project[];
}

export class GetUserProjectsUseCase {
  constructor(private projectRepo: IProjectRepository) {}

  async execute(input: GetUserProjectsDTO): Promise<GetUserProjectsResultDTO> {
    const { userId } = input;

    // Fetch projects where user is owner or member
    const projects = await this.projectRepo.findAllByUserId(userId);

    return { projects };
  }
}
