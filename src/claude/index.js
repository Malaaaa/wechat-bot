import Anthropic from '@anthropic-ai/sdk'
import { remark } from 'remark'
import stripMarkdown from 'strip-markdown'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

// Configure the Anthropic API with your API key
const anthropic = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY, // Using environment variable directly
})

export async function getClaudeReply(prompt) {
  console.log('🚀🚀🚀 / prompt', prompt)

  // Choose the model to use
  let chosen_model = 'claude-3-opus-20240229'
  let reply = ''

  try {
    const response = await anthropic.messages.create({
      model: chosen_model,
      max_tokens: 4000,
      temperature: 0, // No randomness in the response
      system: 'You are a personal assistant.', // Corrected usage of system parameter
      messages: [{ role: 'user', content: prompt }],
    })
    // Convert Markdown response to plain text
    reply = markdownToText(response.content[0].text) // Adjusted to handle Anthropic response structure correctly
    console.log('🚀🚀🚀 / Using model', chosen_model)
  } catch (error) {
    console.error('Error while getting response:', error)
    reply = 'An error occurred while processing your request.'
  }

  console.log('🚀🚀🚀 / reply', reply)
  return `${reply}\nVia ${chosen_model}`
}

function markdownToText(markdown) {
  return remark()
    .use(stripMarkdown)
    .processSync(markdown ?? '')
    .toString()
}
