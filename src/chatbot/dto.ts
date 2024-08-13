import { IsNotEmpty, IsString } from 'class-validator';

export class ChatbotRequestDto {
    @IsString()
    @IsNotEmpty()
    query: string;
}

export class ChatbotResponseDto {
    @IsString()
    response: string;
}