import { User } from "./userTypes";

export type Message = {
  id: number;
  message: string
  user: User
}

export type GetMessages = {
  getMessages: Array<Message>
}

export type CreateMessage = {
  createMessage: Message
}
