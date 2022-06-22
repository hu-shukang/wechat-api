import { ChatService } from './src/chat.service';
import { UserService } from './src/user.service';
import { FileService } from './src/file.service';

export const chatService = new ChatService();
export const userService = new UserService();
export const fileService = new FileService();
