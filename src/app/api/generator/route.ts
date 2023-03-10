import { generateNovel } from '@/lib/chatgpt'

export const runtime = 'edge'

export async function POST(request: Request) {
  const content = await request.json()
  if (!content.description) {
    return new Response(JSON.stringify({ error: 'description is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const data = await generateNovel(content.description)

  return new Response(JSON.stringify({ data }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
