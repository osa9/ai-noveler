'use client'

import React from 'react'
import { Textarea, Button } from 'flowbite-react'
import { Message } from '@/lib/chatgpt'

const Message: React.FC<{ message: Message }> = ({ message }) => {
  if (!message.character || !message.emotion) {
    return <div className="mb-4">{message.content}</div>
  }

  const emotion = message.emotion

  let icon = '/avatars/normal.png'
  if (emotion === '驚き') {
    icon = '/avatars/surprise.png'
  } else if (emotion === '怒り') {
    icon = '/avatars/angry.png'
  } else if (emotion === '泣き') {
    icon = '/avatars/crying.png'
  } else if (emotion === '喜び') {
    icon = '/avatars/happy.png'
  }

  return (
    <div className="flex mb-4 items-center">
      <div className="flex flex-col justify-center items-center">
        <img
          src={icon}
          alt={message.character}
          title={message.emotion}
          style={{ width: 96, height: 'auto' }}
        />
        <p className="font-bold">{message.character}</p>
      </div>
      <p>{message.content}</p>
    </div>
  )
}

export default function Home() {
  const [description, setDescription] = React.useState('')
  const [result, setResult] = React.useState<Message[]>()
  const [loading, setLoading] = React.useState(false)

  const getResult = async () => {
    if (!description) return

    setLoading(true)
    const res = await fetch(
      'https://04he3x5de1.execute-api.ap-northeast-1.amazonaws.com/default/ai-noveler',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      }
    )
    const json = await res.json()
    setResult(json.data.messages)
    setLoading(false)
  }

  return (
    <main>
      <h1 className="text-3xl font-bold">
        <a href="/">SS Generator</a>
      </h1>
      <Textarea
        id=""
        placeholder="キャッチコピーやストーリーを入力(140字以内)"
        onChange={(e) => {
          setDescription(e.target.value)
        }}
      />
      <Button type="submit" onClick={() => getResult()}>
        生成!
      </Button>
      <hr />
      {loading && <p>生成中...</p>}
      {!loading && !result && <p>結果はここに表示されます</p>}
      {!loading && result && (
        <p>
          {result.map((r, index) => (
            <Message message={r} key={index} />
          ))}
        </p>
      )}
    </main>
  )
}
