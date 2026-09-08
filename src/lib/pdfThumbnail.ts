type PdfJs = typeof import('pdfjs-dist/build/pdf.mjs')

let pdfjsPromise: Promise<PdfJs> | null = null

async function getPdfjs(): Promise<PdfJs> {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist/build/pdf.mjs').then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
      return pdfjs
    })
  }
  return pdfjsPromise
}

const cache = new Map<string, Promise<string>>()

/** First page of a same-origin PDF as a JPEG data URL. Cached per fileUrl. */
export async function pdfThumbnail(fileUrl: string): Promise<string> {
  const hit = cache.get(fileUrl)
  if (hit) return hit

  const task = (async () => {
    const pdfjs = await getPdfjs()
    const pdf = await pdfjs.getDocument({ url: fileUrl, withCredentials: false }).promise
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 1.5 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) throw new Error('canvas 2d unavailable')

    canvas.width = viewport.width
    canvas.height = viewport.height
    await page.render({ canvasContext: context, viewport, canvas }).promise
    return canvas.toDataURL('image/jpeg', 0.85)
  })()

  cache.set(fileUrl, task)
  task.catch(() => {
    cache.delete(fileUrl)
  })

  return task
}
