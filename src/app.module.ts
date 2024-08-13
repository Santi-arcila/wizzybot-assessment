import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatbotService } from './chatbot/chatbot.service';
import { ChatbotController } from './chatbot/chatbot.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ChatbotController],
  providers: [AppService, ChatbotService],
})
export class AppModule { }
