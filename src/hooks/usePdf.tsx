import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useRef } from 'react'

type UsePdfHandlerParam = {
  name: string
}

const usePdf = () => {
  const targetRef = useRef<HTMLDivElement>(null)

  const pdfHandler = ({ name }: UsePdfHandlerParam) => {
    if (targetRef.current === null) {
      return
    }

    html2canvas(targetRef.current, { scale: 2.5 }).then((canvas) => {
      const image = canvas.toDataURL('image/svg', 1.0)
      let pdf = new jsPDF({ format: 'a4' })
      pdf.addImage(image, 'svg', 5, 10, canvas.width / 20, canvas.height / 20)
      pdf.save(`${name}.pdf`)
    })
  }

  return {
    targetRef,
    pdfHandler,
  }
}

export default usePdf
