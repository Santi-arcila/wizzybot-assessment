import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotRequestDto, ChatbotResponseDto } from './dto'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }
    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get a response from the chatbot',
        description: 'Sends a query to the chatbot and returns its response. This endpoint uses the OpenAI API and may call external functions to provide more comprehensive answers.'
    })
    @ApiResponse({
        status: 200, description: 'The chatbot response', content: {
            'application/json': {
                example: {
                    "response": "I found a couple of phone options for you:\n\n1. [iPhone 12](https://wizybot-demo-store.myshopify.com/products/iphone-12)\n   - Price: $900.0 USD\n   - Colors available: Black, Blue, Red, Green, White\n   - Capacity options: 64gb, 128gb\n   - Discount: 1%\n\n2. [iPhone 13](https://wizybot-demo-store.myshopify.com/products/iphone-13)\n"
                }
            }
        }
    })
    @ApiResponse({
        status: 400, description: 'Bad Request - Invalid input or missing parameters', content: {
            'application/json': {
                example: {  // Example of the 400 error response
                    "message": "Error message",
                    "error": "Bad Request",
                    "statusCode": 400
                }
            }
        }
    })
    @ApiBody({
        type: ChatbotRequestDto, description: 'Chatbot request', examples: { example1: { summary: 'Example request', description: 'An example of a chatbot request', value: { query: 'I want a phone' } } }
    })
    async getChatbotResponse(
        @Body() chatbotRequestDto: ChatbotRequestDto
    ): Promise<ChatbotResponseDto> {
        const response = await this.chatbotService.getChatResponse(chatbotRequestDto.query);
        return { response }
    }
}

