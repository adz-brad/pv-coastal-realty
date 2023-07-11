'use server'

import { ServerClient } from "postmark";

const client = new ServerClient(process.env.NEXT_POSTMARK_TOKEN)

export const sendEmail = async (data) => {
    const honeypot = data.get('your-name')
    if(honeypot.length === 0){
        const senderName = data.get('name')
        const email = data .get('email')
        const phone = data.get('phone')
        const message = data.get('message')
        return await client.sendEmailWithTemplate({
            "From": "mleblanc@pvcoastalrealty.com",
            "ReplyTo": email,
            "To": "mleblanc@pvcoastalrealty.com",
            "TemplateAlias": "pvcoastalinquiry",
            "TemplateModel": {
              "name": senderName,
              "subject": `New Message From ${senderName}`,
              "phone": phone,
              "replyTo": email,
              "message": message
            }
        })
    }
    else {
        return 'honeypot'
    }
}
