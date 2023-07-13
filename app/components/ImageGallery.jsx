'use client'
import { useState } from "react"
import Image from "next/image"
import Lightbox from "./Lightbox"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

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
                                loading="eager"
                                src={image.url} 
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

        <div className="flex flex-row items-center">
            {lightbox && 
                <Lightbox 
                    image={images[current]} 
                    thumbnails={<Thumbnails/>} 
                    close={() => setLightbox(false)}
                    set={set}
                />
            }
            <div className="w-full space-y-2">
                <div className="relative min-h-[350px] md:min-h-[425px] lg:min-h-[500px]" role="button">
                    <Image 
                        loading="eager"
                        src={images[current].url} 
                        fill={true}
                        className="rounded-sm object-cover"
                        alt={images[current].alt}
                        onClick={() => setLightbox(true)}
                        quality={100}
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