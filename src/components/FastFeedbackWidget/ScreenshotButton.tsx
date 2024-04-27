import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import { CameraIcon } from '../CamaraIcon'
import { TrashIcon } from '../TrashIcon'

interface ScreenshotButtonProps {
  onCapture: (image: string) => void
  defaultImage?: string
}

export function ScreenshotButton({
  onCapture,
  defaultImage,
}: ScreenshotButtonProps) {
  const [screenshotImage, setScreenShotImage] = useState<string | undefined>(
    undefined,
  )

  async function handleTakeScreenshot() {
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64Image = canvas.toDataURL('image/png')

    setScreenShotImage(base64Image)
    onCapture(base64Image)
  }

  useEffect(() => {
    setScreenShotImage(defaultImage)
  }, [defaultImage])

  return (
    <>
      {!screenshotImage ? (
        <button
          type="button"
          onClick={handleTakeScreenshot}
          className="h-8 w-10 flex items-center justify-center text-sm border-border border rounded hover:border-primary transition-colors"
        >
          <CameraIcon />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setScreenShotImage('')}
          className="relative overflow-hidden rounded group h-8 w-10"
        >
          <div className="hidden absolute transition-all group-hover:flex inset-0 bg-red-50 items-center justify-center">
            <TrashIcon />
          </div>
          <img src={screenshotImage} alt="" className="w-full h-full" />
        </button>
      )}
    </>
  )
}
