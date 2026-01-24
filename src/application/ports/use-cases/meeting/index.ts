import {
  CreateMeetingDTO,
  CreateMeetingResultDTO,
  JoinMeetingDTO,
  JoinMeetingResultDTO,
  LeaveMeetingDTO,
  LeaveMeetingResultDTO,
} from "@/application/dto/meeting/meetingDtos";

export interface ICreateMeetingUseCase {
  execute(input: CreateMeetingDTO): Promise<CreateMeetingResultDTO>;
}

export interface IJoinMeetingUseCase {
  execute(input: JoinMeetingDTO): Promise<JoinMeetingResultDTO>;
}

export interface ILeaveMeetingUseCase {
  execute(input: LeaveMeetingDTO): Promise<LeaveMeetingResultDTO>;
}
