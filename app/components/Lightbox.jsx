import Image from "next/image"
import { MdCloseFullscreen, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const Lightbox = ({ image, thumbnails, close, set }) => {

  return (

    <div className="fixed flex flex-col items-center justify-center top-0 left-0 z-50 w-screen h-screen bg-black/90">
        <div className="flex flex-col justify-center h-full w-full space-y-8 p-8 max-w-screen-lg">
            <div 
                className="fixed top-4 right-4 flex flex-row items-center space-x-2 text-zinc-50 text-lg" 
                role="button"
                onClick={close}  
            >
                <span>Close</span>
                <MdCloseFullscreen className="text-3xl drop-shadow-md" />
            </div>

            <div className="relative h-2/3 w-full">
                <Image 
                    src={image.url} 
                    fill={true}
                    className="rounded-sm object-cover"
                    alt={image.alt}
                    placeholder="blur"
                    blurDataURL={image.placeholder}
                />
                <button
                    className="absolute flex flex-row items-center justify-center bottom-4 left-4 text-4xl drop-shadow-md hover:drop-shadow-lg hover:scale-105 bg-zinc-50/50 rounded-full"
                    onClick={() => set('prev')}
                >
                    <MdKeyboardArrowLeft/>
                </button>
                <button
                    className="absolute flex flex-row items-center justify-center bottom-4 right-4 text-4xl drop-shadow-md hover:drop-shadow-lg hover:scale-105 bg-zinc-50/50 rounded-full"
                    onClick={() => set('next')}
                >
                    <MdKeyboardArrowRight/>
                </button>
            </div>
            {thumbnails}
        </div>
    </div>

  )
}

export default Lightbox