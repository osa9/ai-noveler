export interface Character {
  name: string
  gender: 'men' | 'women'
  description: string
  avatar?: string
}

export interface Message {
  character?: string
  emotion?: string
  content: string
}

export interface Novel {
  description?: string
  chapters?: Character[]
  messages: Message[]
}

const SYSTEM_PROMPT = `あなたはプロの小説家です。
下記のストーリーを会話形式で書いて下さい。吹き出しの前には名前、表情を記載してください。
表情は、「平常」「驚き」「怒り」「泣き」「喜び」のいずれかです。
性的・暴力的・政治的な表現は避けて下さい。

会話の記載例：
太郎(驚き)「えっ、僕に話しかけてる？」
さくら(喜び)「あ、トトロの子供！こんにちは！」
`

export const generateNovelText = async (description: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: description },
      ],
    }),
  })

  const body = await response.json()
  return body.choices[0]?.message?.content
}

export const parseNovel = (text: string) => {
  const lines = text.split('\n')
  const messages = lines.map((line) => {
    const regExp = new RegExp(/(.*?)\((.*?)\)：?「?([^「」]*)/)
    const match = line.match(regExp)
    if (match) {
      return {
        character: match[1],
        emotion: match[2],
        content: match[3],
      }
    } else {
      return {
        content: line,
      }
    }
  })

  return {
    messages,
  }
}

export const generateNovel = async (description: string) => {
  const text = await generateNovelText(description)
  if (!text) {
    throw new Error('Failed to generate novel')
  }

  return parseNovel(text)
}
