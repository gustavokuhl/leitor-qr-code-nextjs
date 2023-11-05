"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import QrCodeReader, { QRCode } from "react-qrcode-reader"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function QrReader() {
  const [cameraAberta, setCameraAberta] = useState<boolean>(false)
  const [urlNota, setUrlNota] = useState<string>("")
  const [isValido, setIsValido] = useState<boolean>()
  const { toast } = useToast()

  const handleRead = (code: QRCode) => {
    const isUrlValida = String(code.data).startsWith(
      "https://sat.sef.sc.gov.br/nfce/consulta?p="
    )
    setIsValido(isUrlValida)
    setCameraAberta(false)
    if (isUrlValida) setUrlNota(code.data)
    else
      toast({
        title: "QR Code inválido",
        description: "Verifique e tente novamente",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Tentar novamente"
            onClick={() => setCameraAberta(true)}
          >
            Tentar novamente
          </ToastAction>
        ),
      })
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Ler QR Code</CardTitle>
        {!cameraAberta && (
          <CardDescription>Escolha uma forma de ler o QR Code</CardDescription>
        )}
      </CardHeader>
      <CardContent className="grid gap-2">
        {cameraAberta ? (
          <>
            <QrCodeReader
              delay={100}
              width={300}
              height={300}
              onRead={handleRead}
            />
            <Button variant="secondary" onClick={() => setCameraAberta(false)}>
              Voltar
            </Button>
          </>
        ) : (
          <Button onClick={() => setCameraAberta(true)}>Abrir câmera</Button>
        )}
      </CardContent>
      {urlNota && !cameraAberta && (
        <CardFooter>
          {isValido ? (
            <a
              href={urlNota}
              target="_blank"
              className={buttonVariants({ variant: "secondary" })}
            >
              Acessar nota
            </a>
          ) : (
            <p className="text-red-600">Nota inválida</p>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
