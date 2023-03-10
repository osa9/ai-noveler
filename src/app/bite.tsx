'use client'

import { Alert, Dropdown } from 'flowbite-react'

export default function Bite() {
  return (
    <div>
      <Alert color="info">
        <span>
          <span className="font-medium">Info alert!</span> Change a few things
          up and try submitting again.
        </span>
      </Alert>
    </div>
  )
}
