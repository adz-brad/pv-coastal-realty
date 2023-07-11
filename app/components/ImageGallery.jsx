'use client'
import { useState } from "react"
import Image from "next/image"
import Lightbox from "./Lightbox"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const ImageGallery = ({ images }) => {

    if(images.length > 0){
    const [ current, setCurrent ] = useState({ image: images[0], i: 0 })
    const [ lightbox, setLightbox ] = useState({ open: false, image: current})
    
    const set = (dir) => {
        if(dir === 'next'){
            if(current.i + 1 === images.length){
                setCurrent({image: images[0], i: 0})
            }
            else {
                setCurrent({ image: images[current.i + 1], i: current.i + 1})
            }
        }
        else if(dir ==='prev'){
            if(current.i === 0){
                setCurrent({ image: images[images.length - 1], i: images.length - 1})
            }
            else {
                setCurrent({ image: images[current.i - 1], i: current.i - 1})
            }
        }
    }
    
    let thumbnails;
    
    if(current.i === 0) {
        thumbnails = images.slice(0, 5)
    }
    else if(current.i > 0 && current.i < images.length - 5 || images.length - current.i === 5) {
        thumbnails = images.slice(current.i, current.i + 5)
    }
    else if(images.length - current.i < 5) {
        thumbnails = images.slice(current.i, images.length)
        thumbnails.push(...images.slice(0, (current.i - images.length) + 5))
    }

    const Thumbnails = () => {
        return (
            <ul className="grid grid-cols-5 gap-2">
                {thumbnails?.map((image, i) => {
                    return (
                        <li 
                            key={i} 
                            className="relative h-[100px]" 
                            role="button"
                            onClick={() => {
                                setCurrent({ image: image, i: image.index});
                                lightbox.open && setLightbox({ open: true, image: image })
                            }}
                        >
                            <Image 
                                src={image.url} 
                                fill={true}
                                className="rounded-sm object-cover hover:scale-105"
                                alt={image.alt}
                                placeholder="blur"
                                blurDataURL={image.placeholder}
                            />
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (

        <div className="flex flex-row items-center">
            {lightbox.open && 
                <Lightbox 
                    image={current.image} 
                    thumbnails={<Thumbnails/>} 
                    close={() => setLightbox({open: false, image: current})}
                    set={set}
                />
            }
            <div className="w-full space-y-2">
                <div className="relative min-h-[350px] md:min-h-[425px] lg:min-h-[500px]" role="button">
                    <Image 
                        src={current.image.url} 
                        placeholder="blur"
                        blurDataURL={current.image.placeholder}
                        fill={true}
                        className="rounded-sm object-cover"
                        alt={current.image.alt}
                        onClick={() => setLightbox({ open: true, image: current.image })}
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