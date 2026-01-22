import { ListChannelsForUserUseCase } from "@/application/use-cases/channel/ListChannelsForUserUseCase";
import { UnauthorizedError } from "@/application/error/AppError";
import type { IChannelRepository } from "@/application/ports/repositories/IChannelRepository";
import type { IProjectMembershipRepository } from "@/application/ports/repositories/IProjectMembershipRepository";
import { Channel } from "@/domain/entities/channel/Channel";

describe("ListChannelsForUserUseCase (Unit)", () => {
  let channelRepo: Partial<IChannelRepository>;
  let membershipRepo: Partial<IProjectMembershipRepository>;
  let useCase: ListChannelsForUserUseCase;

  const projectId = "project-1";
  const userId = "user-1";

  const createChannel = (overrides?: Partial<Channel>) =>
    new Channel({
      id: "channel-1",
      projectId,
      channelName: "general",
      description: "description",
      createdBy: "user-1",
      visibleToRoles: ["manager", "member"],
      permissionsByRole: {
        manager: "manager",
        member: "view",
      },
      ...overrides,
    });

  beforeEach(() => {
    channelRepo = {
      findByProjectId: jest.fn(),
    };

    membershipRepo = {
      findByProjectAndUser: jest.fn(),
    };

    useCase = new ListChannelsForUserUseCase(
      channelRepo as IChannelRepository,
      membershipRepo as IProjectMembershipRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------------------------------
  // Unauthorized
  // --------------------------------------------------
  it("should throw UnauthorizedError if user is not a project member", async () => {
    (membershipRepo.findByProjectAndUser as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute(projectId, userId)).rejects.toBeInstanceOf(
      UnauthorizedError
    );

    expect(membershipRepo.findByProjectAndUser).toHaveBeenCalledWith(
      projectId,
      userId
    );
    expect(channelRepo.findByProjectId).not.toHaveBeenCalled();
  });

  // --------------------------------------------------
  // Member with channels
  // --------------------------------------------------
  it("should return only channels visible to the user's role", async () => {
    (membershipRepo.findByProjectAndUser as jest.Mock).mockResolvedValue({
      role: "member",
    });

    const channel1 = createChannel({ id: "c1", visibleToRoles: ["member"] });
    const channel2 = createChannel({ id: "c2", visibleToRoles: ["manager"] });
    const channel3 = createChannel({
      id: "c3",
      visibleToRoles: ["member", "manager"],
    });

    (channelRepo.findByProjectId as jest.Mock).mockResolvedValue([
      channel1,
      channel2,
      channel3,
    ]);

    const result = await useCase.execute(projectId, userId);

    expect(result).toHaveLength(2);
    expect(result).toContain(channel1);
    expect(result).toContain(channel3);
    expect(result).not.toContain(channel2);

    expect(membershipRepo.findByProjectAndUser).toHaveBeenCalledWith(
      projectId,
      userId
    );
    expect(channelRepo.findByProjectId).toHaveBeenCalledWith(projectId);
  });

  // --------------------------------------------------
  // Manager role example
  // --------------------------------------------------
  it("should correctly return channels for a manager role", async () => {
    (membershipRepo.findByProjectAndUser as jest.Mock).mockResolvedValue({
      role: "manager",
    });

    const channel1 = createChannel({ id: "c1", visibleToRoles: ["member"] });
    const channel2 = createChannel({ id: "c2", visibleToRoles: ["manager"] });
    const channel3 = createChannel({
      id: "c3",
      visibleToRoles: ["member", "manager"],
    });

    (channelRepo.findByProjectId as jest.Mock).mockResolvedValue([
      channel1,
      channel2,
      channel3,
    ]);

    const result = await useCase.execute(projectId, userId);

    expect(result).toHaveLength(2);
    expect(result).toContain(channel2);
    expect(result).toContain(channel3);
    expect(result).not.toContain(channel1);
  });
});
