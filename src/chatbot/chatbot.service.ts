import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import axios from 'axios';


@Injectable()
export class ChatbotService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async getChatResponse(userQuery: string): Promise<string> {
        try {
            // 1. Make the initial call to the OpenAI API
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userQuery }],
                functions: [
                    {
                        name: 'searchProducts',
                        description: 'Search for products based on a query. This can include finding gifts for specific occasions for people.',
                        parameters: {
                            type: 'object',
                            properties: {
                                query: {
                                    type: 'string',
                                    description: 'The search query.',
                                },
                            },
                            required: ['query'],
                        },
                    },
                    {
                        name: 'convertCurrencies',
                        description: 'Convert an amount from one currency to another.',
                        parameters: {
                            type: 'object',
                            properties: {
                                amount: {
                                    type: 'number',
                                    description: 'The amount to convert.',
                                },
                                from: {
                                    type: 'string',
                                    description: 'The source currency code (e.g., USD, EUR).',
                                },
                                to: {
                                    type: 'string',
                                    description: 'The target currency code (e.g., CAD, GBP).',
                                },
                            },
                            required: ['amount', 'from', 'to'],
                        },
                    },
                ],
            });

            // 2. Extract the LLM's response
            const message = response.choices[0].message;

            // 3. Check if the LLM wants to call a function
            if (message.function_call) {
                // 3.a. Extract function name and arguments
                const functionName = message.function_call.name;
                const functionArgs = JSON.parse(message.function_call.arguments);

                // 3.b. Execute the chosen function
                let functionResult;
                if (functionName === 'searchProducts') {
                    functionResult = await this.searchProducts(functionArgs.query);
                } else if (functionName === 'convertCurrencies') {
                    functionResult = await this.convertCurrencies(
                        functionArgs.amount,
                        functionArgs.from,
                        functionArgs.to,
                    );
                }

                // 3.c. Make a second call to the OpenAI API with the function result
                const secondResponse = await this.openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'user', content: userQuery },
                        message, // Include the original message from the LLM
                        {
                            role: 'function',
                            name: functionName,
                            content: JSON.stringify(functionResult),
                        },
                    ],
                });

                // 3.d. Return the final response
                return secondResponse.choices[0].message.content;
            } else {
                // 4. If the LLM doesn't call a function, return its response directly
                return message.content;
            }
        } catch (error) {
            console.error('Error processing chat request:', error);
            return 'An error occurred while processing your request.';
        }
    }

    async searchProducts(query: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream('products_list.csv') // Replace 'products_list.csv' with the actual file path
                .pipe(csv())
                .on('data', (data) => {
                    // Implement your search logic here
                    if (
                        data.displayTitle.toLowerCase().includes(query.toLowerCase()) ||
                        data.embeddingText.toLowerCase().includes(query.toLowerCase())
                    ) {
                        results.push(data);
                    }
                })
                .on('end', () => {
                    // Limit results to a maximum of 2
                    resolve(results.slice(0, 2));
                })
                .on('error', reject);
        });
    }

    async convertCurrencies(
        amount: number,
        from: string,
        to: string,
    ): Promise<number> {
        const OPEN_EXCHANGE_API_KEY = process.env.OPEN_EXCHANGE_API_KEY;
        try {
            const response = await axios.get(
                `https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_API_KEY}`,
            );

            const rates = response.data.rates;
            const rate = rates[to] / rates[from];
            const convertedAmount = amount * rate;
            return convertedAmount;
        } catch (error) {
            console.error('Error converting currencies:', error);
            throw error; // Re-throw the error to be handled by the calling function
        }
    }
}
