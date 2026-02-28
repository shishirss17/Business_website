'use server';

/**
 * @fileOverview Generates a custom gift message based on the recipient and occasion.
 *
 * - generateCustomGiftMessage - A function that generates the gift message.
 * - GenerateCustomGiftMessageInput - The input type for the generateCustomGiftMessage function.
 * - GenerateCustomGiftMessageOutput - The return type for the generateCustomGiftMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCustomGiftMessageInputSchema = z.object({
  recipient: z.string().describe('The name of the gift recipient.'),
  occasion: z.string().describe('The occasion for the gift (e.g., birthday, anniversary).'),
  sender: z.string().optional().describe('The name of the gift sender.'),
});
export type GenerateCustomGiftMessageInput = z.infer<typeof GenerateCustomGiftMessageInputSchema>;

const GenerateCustomGiftMessageOutputSchema = z.object({
  message: z.string().describe('The generated custom gift message.'),
});
export type GenerateCustomGiftMessageOutput = z.infer<typeof GenerateCustomGiftMessageOutputSchema>;

export async function generateCustomGiftMessage(
  input: GenerateCustomGiftMessageInput
): Promise<GenerateCustomGiftMessageOutput> {
  return generateCustomGiftMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCustomGiftMessagePrompt',
  input: {schema: GenerateCustomGiftMessageInputSchema},
  output: {schema: GenerateCustomGiftMessageOutputSchema},
  prompt: `You are a helpful AI assistant that specializes in generating custom gift messages.

  Generate a heartfelt and appropriate gift message for the recipient and occasion specified.
  Consider the relationship between the sender and recipient when crafting the message.
  If the sender is specified, include their name at the end of the message.
  If the sender is not specified, the message should still be warm and thoughtful.

  Recipient: {{{recipient}}}
  Occasion: {{{occasion}}}
  {{#if sender}}
  Sender: {{{sender}}}
  {{/if}}
  `,
});

const generateCustomGiftMessageFlow = ai.defineFlow(
  {
    name: 'generateCustomGiftMessageFlow',
    inputSchema: GenerateCustomGiftMessageInputSchema,
    outputSchema: GenerateCustomGiftMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
