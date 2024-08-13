import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotService } from './chatbot/chatbot.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatbotService],
})
export class AppModule {}
