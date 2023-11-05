"use client"
import QrReader from "@/components/QrReader"
import { useCallback, useState } from "react"

export default function Home() {
  const [urlNota, setUrlNota] = useState<string>("")

  const handleDecodeQrCode = useCallback((url: string) => {
    setUrlNota(url)
  }, [])

  return (
    <div className="">
      <QrReader urlNota={urlNota} onDecode={handleDecodeQrCode} />
    </div>
  )
}
