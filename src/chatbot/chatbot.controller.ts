import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotRequestDto, ChatbotResponseDto } from './dto'

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }
    @Post()
    async getChatbotResponse(
        @Body() chatbotRequestDto: ChatbotRequestDto
    ): Promise<ChatbotResponseDto> {
        const response = await this.chatbotService.getChatResponse(chatbotRequestDto.query);
        return { response }
    }
}

