import { getClaudeReply } from './index.js'

// 测试 open ai api
async function testMessage() {
  const message = await getClaudeReply('hello')
  console.log('🌸🌸🌸 / message: ', message)
}

testMessage()
