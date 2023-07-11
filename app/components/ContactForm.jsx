'use client'

import { MdOutlineEmail, MdOutlinePhoneIphone, MdPersonOutline, MdOutlineMessage } from 'react-icons/md'
import { sendEmail } from '../postmark'
import { useTransition } from 'react'

const ContactForm = () => {

    let [ isPending, startTransition ] = useTransition()

  return (

    <form 
        className="flex flex-col space-y-8 w-full max-w-screen-lg"
        onSubmit={(e) => startTransition(() => sendEmail(new FormData(e.target)))}
    >
        <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
                <div className="flex flex-row items-center space-x-2 text-lg font-medium">
                    <MdPersonOutline className="text-sky-600 drop-shadow-md" />
                    <label htmlFor="name">
                        Name
                    </label>
                </div>
                <input 
                    required 
                    name="name"
                    type="text" 
                    className="form-input"
                    placeholder="Your Name" 
                />
            </div>
            <div className="flex flex-col space-y-1">
                <div className="flex flex-row items-center space-x-2 text-lg font-medium">
                    <MdOutlineEmail className="text-sky-600 drop-shadow-md" />
                    <label htmlFor="email">
                        Email
                    </label>
                </div>
                <input 
                    required 
                    name="email"
                    type="email" 
                    className="form-input"
                    placeholder="Your Email" 
                />
            </div>
            <div className="flex flex-col space-y-1">
                <div className="flex flex-row items-center space-x-2 text-lg font-medium">
                    <MdOutlinePhoneIphone className="text-sky-600 drop-shadow-md" />
                    <label htmlFor="phone">
                        Phone (optional)
                    </label>
                </div>
                <input  
                    name="phone"
                    type="phone" 
                    className="form-input"
                    placeholder="Your Phone Number" 
                />
            </div>
            <div className="flex flex-col space-y-1">
                <div className="flex flex-row items-center space-x-2 text-lg font-medium">
                    <MdOutlineMessage className="text-sky-600 drop-shadow-md" />
                    <label htmlFor="message">
                        Message
                    </label>
                </div>
                <textarea  
                    required
                    name="message"
                    className="	form-textarea"
                    placeholder="Your Message" 
                    rows={5}
                />
            </div>
            <input  
                name="your-name"
                type="text" 
                className="hidden"
            />
        </div>
        <button 
            type="submit"
            className="button"
        >
            {isPending ? "Sending...": "Submit"}
        </button>
    </form>

  )
}

export default ContactForm