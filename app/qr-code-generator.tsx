'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Copy, Check, FileImage, FileCode } from "lucide-react"
import { useDebounce } from "@uidotdev/usehooks";
import QRCode, { QRCodeOptions, QRCodeRenderersOptions } from 'qrcode'
import { FieldValues, useForm, useFormContext, useWatch } from 'react-hook-form'
import { centerImageWithClearArea, QRForm } from '@/lib/qr'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { X } from "lucide-react";
import QRInputs, { QRType } from './inputs'

interface FormFieldValuesDebouncedProps {
  onChange: (values: FieldValues) => void
}

const FormFieldValuesDebounced = ({ onChange }: FormFieldValuesDebouncedProps) => {
  useWatch()
  const { getValues } = useFormContext()
  const formFieldsDeps = getValues(['darkColor', 'darkTransparent', 'errorCorrection', 'input', 'lightColor', 'lightTransparent', 'logo', 'margin', 'mask', 'outputType', 'qVersion', 'scale'])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formValues = useMemo(() => getValues(), formFieldsDeps)
  const debouncedValue = useDebounce(formValues, 300)

  useEffect(() => {
    onChange(debouncedValue)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  return null
}

const FormFieldLogoValues = () => {
  const { getValues } = useFormContext()
  useWatch({ name: 'logo' })
  const logo = getValues('logo')

  return (
    <>
      {!logo
        && (
          <>
            <SelectItem value="L">L (Low)</SelectItem>
            <SelectItem value="M">M (Medium)</SelectItem>
            <SelectItem value="Q">Q (Quartile)</SelectItem>
          </>
        )}
      <SelectItem value="H">H (High)</SelectItem>
    </>
  )
}

interface QRCodeGeneratorProps {
  defaultType?: QRType
  lockType?: boolean
}

export default function QRCodeGenerator({ defaultType = 'url', lockType = false }: QRCodeGeneratorProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const form = useForm<z.infer<typeof QRForm>>({
    resolver: zodResolver(QRForm),
    defaultValues: {
      input: '',
      qVersion: undefined,
      errorCorrection: 'M',
      mask: undefined,
      scale: 8,
      margin: 0,
      lightColor: '#FFFFFF',
      darkColor: '#000000',
      lightTransparent: true,
      darkTransparent: false,
      logo: undefined
    },
  })

  const [width, setWidth] = useState(0)

  const renderToCanvas = useCallback(async (data: z.infer<typeof QRForm>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { input, logo } = data

    if (!input) {
      const ctx = canvas.getContext('2d')!
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = 0
      canvas.height = 0
      setWidth(0)
      return false
    }

    const options: QRCodeOptions = {
      version: data.qVersion,
      errorCorrectionLevel: data.logo ? 'H' : data.errorCorrection,
      maskPattern: data.mask,
    }

    const renderedOpts: QRCodeRenderersOptions = {
      scale: data.scale,
      margin: data.margin,
      color: {
        light: data.lightTransparent ? data.lightColor + '00' : data.lightColor,
        dark: data.darkTransparent ? data.darkColor + '00' : data.darkColor,
      }
    }

    const scale = renderedOpts.scale!
    const margin = renderedOpts.margin!

    const qrOptions = { ...options, ...renderedOpts }
    const { modules: { size } } = QRCode.create(input, qrOptions)
    const width = size * renderedOpts.scale!

    canvas.width = width
    canvas.height = width

    setWidth(width)

    await new Promise((resolve, reject) => {
      QRCode.toCanvas(canvas, input, qrOptions, function (error) {
        if (error) {
          reject(error)
          return;
        }
        if (logo) {
          const image = new window.Image();
          image.src = window.URL.createObjectURL(logo);

          const ctx = canvas.getContext('2d')!

          image.onload = function () {
            const { imageArea, clearedArea } = centerImageWithClearArea(size, image, 0.4)

            ctx.clearRect(clearedArea.x * scale + margin * scale, clearedArea.y * scale + margin * scale, clearedArea.width * scale, clearedArea.height * scale);
            ctx.drawImage(image, imageArea.x * scale + margin * scale, imageArea.y * scale + margin * scale, imageArea.width * scale, imageArea.height * scale);

            resolve(undefined)
          };

          image.onerror = function (error) {
            reject(error)
          };
        }
        else {
          resolve(undefined)
        }
      });
    })

    return false;
  }, [])

  const triggerDownload = (href: string, filename: string) => {
    const link = document.createElement('a')
    link.href = href
    link.download = filename
    link.click()
  }

  const downloadPng = useCallback(() => {
    if (!canvasRef.current) return
    triggerDownload(canvasRef.current.toDataURL('image/png'), `qr-code.png`)
  }, [])

  const downloadSvg = useCallback(async () => {
    const data = form.getValues()
    if (!data.input) return
    const svg = await QRCode.toString(data.input, {
      type: 'svg',
      version: data.qVersion,
      errorCorrectionLevel: data.logo ? 'H' : data.errorCorrection,
      maskPattern: data.mask,
      margin: data.margin,
      color: {
        light: data.lightTransparent ? '#0000' : data.lightColor,
        dark: data.darkTransparent ? '#0000' : data.darkColor,
      },
    })
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    triggerDownload(url, 'qr-code.svg')
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }, [form])

  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  const copyToClipboard = useCallback(async () => {
    if (!canvasRef.current) return
    try {
      const blob: Blob | null = await new Promise((resolve) =>
        canvasRef.current!.toBlob((b) => resolve(b), 'image/png')
      )
      if (!blob) throw new Error('Could not create image blob')
      if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) {
        throw new Error('Clipboard image API not available in this browser')
      }
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 1800)
    } catch {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 2400)
    }
  }, [])

  const onSubmit = useCallback(async (data: z.infer<typeof QRForm>) => {
    await renderToCanvas(data)
    downloadPng()
  }, [renderToCanvas, downloadPng])

  const [renderError, setRenderError] = useState<string | undefined | Error>()

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tabValue = useMemo(() => isOpen ? 'advancedOptions' : undefined, [isOpen])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        {renderError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>QR Code Error</AlertTitle>
            <AlertDescription>
              {(typeof renderError === 'object' ? renderError.message : typeof renderError === 'string' ? renderError : 'Unknown error during rendering')}
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormFieldValuesDebounced onChange={() => {
              renderToCanvas(form.getValues())
                .then(() => setRenderError(undefined))
                .catch(error => setRenderError(error))
            }} />
            <FormField
              control={form.control}
              name="input"
              render={({ field }) => (
                <QRInputs onChange={field.onChange} name={field.name} defaultOption={defaultType} lockOption={lockType} />
              )} />

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              <FormField
                control={form.control}
                name="darkColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input {...field} type="color" className="h-10 cursor-pointer" />
                    </FormControl>
                    <FormDescription>{field.value.toUpperCase()}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="scale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scale</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={40}
                        aria-valuemin={1}
                        aria-valuemax={40}
                        aria-valuenow={field.value}
                        aria-valuetext={`Scale ${field.value}`}
                        {...field}
                        onChange={undefined}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(+value)}
                        className="py-2"
                      />
                    </FormControl>
                    <FormDescription>
                      {width ? `${width}px wide` : `Pixel scale ${field.value}`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="margin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Margin</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={10}
                        step={1}
                        aria-valuemin={0}
                        aria-valuemax={10}
                        aria-valuenow={field.value}
                        aria-valuetext={`Margin ${field.value}`}
                        {...field}
                        value={[field.value]}
                        onChange={undefined}
                        onValueChange={([value]) => field.onChange(value)}
                        className="py-2"
                      />
                    </FormControl>
                    <FormDescription>{field.value} module{field.value === 1 ? '' : 's'}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <div className='flex flex-row gap-1'>
                      <FormControl>
                        <Input id="qr-logo" type="file" accept='image/*' onChange={e => field.onChange(e.target.files?.[0])} className="text-xs" />
                      </FormControl>
                      {field.value && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            field.onChange(undefined);
                            (document.getElementById('qr-logo') as HTMLInputElement).value = ''
                          }}
                          aria-label="Remove logo"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <FormDescription>
                      Embeds in the centre. Error correction is forced to High automatically.
                    </FormDescription>
                  </FormItem>
                )} />
            </div>

            <Accordion value={tabValue} type="single">
              <AccordionItem value='advancedOptions'>
                <AccordionTrigger onClick={() => setIsOpen(!isOpen)}>Advanced options</AccordionTrigger>
                <AccordionContent forceMount={true} hidden={!isOpen}>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start pt-2'>
                    <FormField
                      control={form.control}
                      name="lightColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Color</FormLabel>
                          <FormControl>
                            <Input {...field} type="color" className="h-10 cursor-pointer" />
                          </FormControl>
                          <FormDescription>{field.value.toUpperCase()}</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                    <div className='space-y-3'>
                      <FormField
                        control={form.control}
                        name="lightTransparent"
                        render={({ field }) => (
                          <FormItem className='flex gap-3 items-center justify-between rounded-md border p-3'>
                            <FormLabel className='m-0 cursor-pointer'>Transparent background</FormLabel>
                            <FormControl>
                              <Switch
                                name={field.name}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      <FormField
                        control={form.control}
                        name="darkTransparent"
                        render={({ field }) => (
                          <FormItem className='flex gap-3 items-center justify-between rounded-md border p-3'>
                            <FormLabel className='m-0 cursor-pointer'>Transparent foreground</FormLabel>
                            <FormControl>
                              <Switch
                                name={field.name}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                    </div>
                    <FormField
                      control={form.control}
                      name="errorCorrection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Error correction level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <input type="hidden" name={field.name} value={field.value} />
                            <FormControl>
                              <SelectTrigger id="error-correction">
                                <SelectValue placeholder="Select error correction" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <FormFieldLogoValues />
                            </SelectContent>
                          </Select>
                          <FormDescription>Higher levels survive more damage but take more space.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button type="submit" className="w-full" disabled={!form.watch('input')}>
                <FileImage className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
              <Button type="button" variant="outline" className="w-full" disabled={!form.watch('input')} onClick={downloadSvg}>
                <FileCode className="mr-2 h-4 w-4" />
                Download SVG
              </Button>
              <Button type="button" variant="outline" className="w-full" disabled={!form.watch('input')} onClick={copyToClipboard}>
                {copyState === 'copied' ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copyState === 'copied' ? 'Copied!' : copyState === 'error' ? 'Copy failed' : 'Copy image'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="rounded-lg bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/40 to-transparent p-4 sm:p-6">
            <canvas
              key="canvas"
              ref={canvasRef}
              className="rounded-md max-w-full h-auto"
              style={{ imageRendering: 'pixelated' }}
              title='Generated QR Code'
            />
          </div>
          <p className="pt-3 text-sm text-muted-foreground text-center">
            {form.watch('input')
              ? 'Use the buttons above, or right-click the image to copy.'
              : 'Fill in the fields above to generate your QR code.'}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}