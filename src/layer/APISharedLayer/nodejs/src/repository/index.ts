import { UserRepository } from './src/user.repository';
import { ChatRepository } from './src/chat.repository';

export const userRepository = new UserRepository();
export const chatRepository = new ChatRepository();
