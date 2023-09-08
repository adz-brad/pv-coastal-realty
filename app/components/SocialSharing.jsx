import { MdShare, MdOutlineEmail } from 'react-icons/md'
import { IoLogoFacebook, IoLogoLinkedin, IoLogoPinterest, IoLogoTwitter } from 'react-icons/io5'

const Share = ({ url }) => {

    return(
        <div className="relative flex flex-row justify-center items-center mt-8">
            <MdShare className="text-xl mr-2 " />
            <span className="text-lg font-semibold text-sky-500 text-secondary">Share This Post</span>

                <div className="flex flex-row items-center p-2 transition-colors">
                    <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-sky-400"
                    >
                        <IoLogoFacebook className="text-xl lg:text-2xl filter drop-shadow-md" />
                    </a>
                    <a 
                        href={`https://twitter.com/share?url=${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-sky-400"
                    >
                        <IoLogoTwitter className="text-xl lg:text-2xl filter drop-shadow-md" />
                    </a>
                    <a 
                        href={`https://www.linkedin.com/shareArticle?url=${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-sky-400"
                    >
                        <IoLogoLinkedin className="text-xl lg:text-2xl filter drop-shadow-md" />
                    </a>
                    <a 
                        href={`https://pinterest.com/pin/create/bookmarklet/?url=${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-sky-400"
                    >
                        <IoLogoPinterest className="text-xl lg:text-2xl filter drop-shadow-md" />
                    </a>
                    <a 
                        href={`mailto:?subject= PV Coastal Realty &amp;body= Check out this page on PVCoastalRealty.com: ${url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full p-2 hover:text-sky-400"
                    >
                        <MdOutlineEmail className="text-xl lg:text-2xl filter drop-shadow-md" />
                    </a>
                </div>
        </div>
    )
}

export default Share