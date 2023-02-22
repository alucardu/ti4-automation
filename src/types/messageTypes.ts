import { User } from "./userTypes";

export type Message = {
  id: number;
  message: String
  user: User
}

export type GetMessages = {
  getMessages: Array<Message>
}

export type CreateMessage = {
  createMessage: Message
}
