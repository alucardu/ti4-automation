import { User } from "./userTypes";

// TYPES
export type Message = {
  id: number;
  message: string
  user: User
}

// QUERIES
export type GetMessages = {
  getMessages: Array<Message>
}

// MUTATIONS
export type CreateMessage = {
  createMessage: Message
}
