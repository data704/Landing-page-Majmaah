"use client"
import Image from "next/image"
import { useParams } from "next/navigation"

const GlobalFixedImage = () => {
  const params = useParams();

  return (
    <div className={`fixed ${params.locale === 'ar' ? 'left-0 scale-x-[-1]' : 'right-0'} top-0 md:-top-20 right-0 -z-10 pointer-events-none select-none max-w-full overflow-hidden`}>
      <Image
        src="/images/background-overlay-image.png"
        alt="Background Overlay"
        width={600}
        height={600}
        priority={true}
        className="w-[90vw] md:w-[70vw] md:max-w-none"
      />
    </div>
  )
}

export default GlobalFixedImage