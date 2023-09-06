'use client'

import { useState } from "react"
import Image from "next/image"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdCloseFullscreen } from 'react-icons/md'

const ImageGallery = ({ images }) => {

    if(images.length > 0){

    const [ current, setCurrent ] = useState(0)
    const [ lightbox, setLightbox ] = useState(false)
    
    const set = (dir) => {
        if(dir === 'next'){
            if(current + 1 === images.length){
                setCurrent(0)
            }
            else {
                setCurrent(current + 1)
            }
        }
        else if(dir ==='prev'){
            if(current === 0){
                setCurrent(images.length - 1)
            }
            else {
                setCurrent(current - 1)
            }
        }
    }

    const Thumbnails = () => {
        return (
            <ul className="grid grid-cols-5 gap-2">
                {images?.map((image, i) => {
                    return (
                        <li 
                            key={i} 
                            className={`relative h-[100px] ${i >= current && i <= current + 4 ? 'block' : 'hidden'}`} 
                            role="button"
                            onClick={() => {
                                setCurrent(i);
                                lightbox && setLightbox(true)
                            }}
                        >
                            <Image
                                priority
                                fetchPriority="high"
                                loading="eager"
                                src={i === 0 ? image.image : image.thumbnail} 
                                fill={true}
                                className="rounded-sm object-cover hover:scale-105"
                                alt={image.alt}
                            />
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (

        <div className={lightbox ? 'fixed flex flex-col items-center justify-center top-0 left-0 z-50 w-screen h-screen bg-black/90' : 'flex flex-row items-center'}>
            <div className={lightbox ? 'flex flex-col justify-center h-full w-full space-y-8 p-8 max-w-screen-xl' : 'w-full space-y-2'}>
                {lightbox && 
                        <div 
                            className="fixed top-4 right-4 flex flex-row items-center space-x-2 text-zinc-50 text-lg" 
                            role="button"
                            onClick={() => setLightbox(false)}
                            title="Open Image Lightbox"
                        >
                            <span>Close</span>
                            <MdCloseFullscreen className="text-3xl drop-shadow-md" />
                        </div>
                }
                <div className={lightbox ? 'relative h-4/5 w-full' : 'relative min-h-[350px] md:min-h-[425px] lg:min-h-[500px]'} role="button">
                    {images.map((image, i) => {
                        return (
                            <Image
                            priority
                            fetchPriority="high"
                            loading="eager"
                                key={i}
                                src={i === 0 ? image.image : lightbox ? image.image : image.seoImage} 
                                fill={true}
                                className={`${i === current ? 'z-20' : 'z-10'} rounded-sm object-cover`}
                                alt={image.alt}
                                disabled={lightbox}
                                onClick={() => setLightbox(true)}
                                quality={100}
                            />
                        )
                    })}
                <button
                    className="absolute flex flex-row items-center justify-center bottom-4 left-4 text-4xl drop-shadow-md hover:drop-shadow-lg hover:scale-105 bg-zinc-50/50 rounded-full z-30"
                    onClick={() => set('prev')}
                    title="Previous Image"
                >
                    <MdKeyboardArrowLeft/>
                </button>
                <button
                    className="absolute flex flex-row items-center justify-center bottom-4 right-4 text-4xl drop-shadow-md hover:drop-shadow-lg hover:scale-105 bg-zinc-50/50 rounded-full z-30"
                    onClick={() => set('next')}
                    title="Next Image"
                >
                    <MdKeyboardArrowRight/>
                </button>
                </div>
                <Thumbnails />
            </div>
        </div>

    )
    }
    else {
        return (
            <div className="flex flex-row items-center">

            <div className="w-full space-y-2">
                <div className="relative min-h-[500px]">
              <Image 
                src="/img-placeholder.webp"
                fill={true}
                className="rounded-t-md object-cover"
                alt="PV Coastal Realty: No Image Available"
            />
              </div></div></div>
        )
    }

}

export default ImageGallery