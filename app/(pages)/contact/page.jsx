import Banner from "@/app/components/Banner"
import ContactForm from "@/app/components/ContactForm"
import { MdLocationPin, MdWhatsapp, MdOutlinePhoneIphone, MdOutlineEmail } from "react-icons/md"
import { agency } from "@/data"

const Page = () => {
  return (
    <>
    <Banner title="Contact Us"/>
    <div className="flex flex-col space-y-8 p-4 md:p-8 lg:p-16">
      <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
          Contact Us
      </h2>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-1/3 space-y-4">
          <span className="text-2xl font-semibold">
            Ready to get started?
          </span>
          <p>
            Whether you're looking to buy your dream home or ready to list your current property, PV Coastal Realty is ready to help you every step of the way.
          </p>

          <div className="group flex flex-row items-center space-x-4">
              <MdLocationPin className="group-hover:scale-110 group-hover:brightness-125 transition-all text-4xl text-sky-600" />
              <div className="flex flex-col">
              <span className="font-semibold">
                Location
              </span>
              <span>
                {agency.address}
              </span>
            </div>
          </div>

          <div className="group flex flex-row items-center space-x-4">
              <MdOutlineEmail className="group-hover:scale-110 group-hover:brightness-125 transition-all text-3xl text-sky-600" />
              <div className="flex flex-col">
              <span className="font-semibold">
                Email
              </span>
              <span>
                {agency.email}
              </span>
            </div>
          </div>

          <div className="group flex flex-row items-center space-x-4">
              <MdOutlinePhoneIphone className="group-hover:scale-110 group-hover:brightness-125 transition-all text-3xl text-sky-600" />
              <div className="flex flex-col">
              <span className="font-semibold">
                Phone (MX)  
              </span>
              <span>
                +{agency.phoneMX}
              </span>
            </div>
          </div>

          <div className="group flex flex-row items-center space-x-4">
              <MdOutlinePhoneIphone className="group-hover:scale-110 group-hover:brightness-125 transition-all text-3xl text-sky-600" />
              <div className="flex flex-col">
              <span className="font-semibold">
                Phone (USA / Canada)
              </span>
              <span>
                +{agency.phoneCA}
              </span>
            </div>
          </div>

          <div className="group flex flex-row items-center space-x-4">
              <MdWhatsapp className="group-hover:scale-110 group-hover:brightness-125 transition-all text-3xl text-sky-600" />
              <div className="flex flex-col">
              <span className="font-semibold">
                WhatsApp
              </span>
              <span>
                +{agency.whatsapp}
              </span>
            </div>
          </div>

        </div>
        <div className="py-8 lg:py-0 lg:w-2/3">
          <div className="flex flex-col space-y-4 mx-auto lg:w-screen lg:max-w-screen-lg">
            <span className="font-semibold text-lg">
              Or Fill Out The Form Below
            </span>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Page