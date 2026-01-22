import { AssignableMemberDTO } from "@/application/dto/task/taskDto";

export interface IMemberRepository {
  /**
   * Manager-only search.
   * Must be scoped to a single project.
   * Must support partial match on name or email.
   * Must exclude non-project members.
   */
  searchMembersByProject(
    projectId: string,
    query: string,
  ): Promise<AssignableMemberDTO[]>;

  /**
   * Verifies membership existence.
   * Used by task assignment validation.
   */
  isMemberOfProject(projectId: string, userId: string): Promise<boolean>;
}
