import Banner from "@/app/components/Banner"
import ContactForm from "@/app/components/ContactForm"
import { MdLocationPin, MdWhatsapp, MdOutlinePhoneIphone, MdOutlineEmail } from "react-icons/md"
import { agency } from "@/data"
import JsonLd from "@/app/components/JsonLd"
import { useBreadcrumbJSON } from "@/app/hooks"

export const metadata = {
  title: 'Contact Us | PV Coastal Realty',
  description: 'Contact a PV Coastal Realty agent, specialists in buying & selling properties all over Banderas Bay, specifically in the areas surrounding Puerto Vallarta and Riviera Nayarit, to find you perfect dream home in paradise today!',
  alternates: {
    canonical: `${process.env.NEXT_SITE_BASEPATH}/contact`,
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | PV Coastal Realty',
    description: 'Contact a PV Coastal Realty agent to find you perfect dream home in paradise today!',
    creator: '@pvcoastalrealty',
    images: [`/pv-coastal-realty-logo.png`],
    url: `${process.env.NEXT_SITE_BASEPATH}/contact`
  },
  openGraph: {
    title: 'Contact Us | PV Coastal Realty',
    description: 'Contact a PV Coastal Realty agent to find you perfect dream home in paradise today!',
    type: 'website',
    images: [{url:`/pv-coastal-realty-logo.png`}],
    url: `${process.env.NEXT_SITE_BASEPATH}/contact`
  },
}

const Page = () => {

  const breadcrumbData = useBreadcrumbJSON([
    {
      url: null,
      name: 'Home'
    },
    {
      url: `contact`,
      name: 'Contact Us'
    }
  ])

  return (
    <>
    <JsonLd data={breadcrumbData} />
    <Banner title="Contact Us"/>
    <div className="flex flex-col space-y-8 p-4 md:p-8 lg:p-16">
      <h2 className="text-3xl md:text-4xl font-bold pb-2 border-b">
          Contact Us
      </h2>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-1/2 space-y-4">
          <span className="text-2xl font-semibold">
            Ready to get started?
          </span>
          <p>
            Whether you're looking to buy your dream home or ready to list your current property, PV Coastal Realty is ready to help you every step of the way.
          </p>

          <div className="group flex flex-row items-center space-x-4">
              <MdLocationPin className="group-hover:scale-110 group-hover:brightness-125 transition-all scale-115 text-3xl text-sky-600" />
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
              <a href={`mailto:${agency.email}?subject=PV Coastal Realty Contact`} className="hover:text-sky-600">
                {agency.email}
              </a>
            </div>
          </div>

          <div className="group flex flex-row items-center space-x-4">
              <MdOutlinePhoneIphone className="group-hover:scale-110 group-hover:brightness-125 transition-all text-3xl text-sky-600" />
              <div className="flex flex-col">
              <span className="font-semibold">
                Phone (MX)  
              </span>
              <a href={`tel:+${agency.phoneMX}`} className="hover:text-sky-600">
                +{agency.phoneMX}
              </a>
            </div>
          </div>

          <div className="group flex flex-row items-center space-x-4">
              <MdOutlinePhoneIphone className="group-hover:scale-110 group-hover:brightness-125 transition-all text-3xl text-sky-600" />
              <div className="flex flex-col">
              <span className="font-semibold">
                Phone (USA / Canada)
              </span>
              <a href={`tel:+${agency.phoneCA}`} className="hover:text-sky-600">
                +{agency.phoneCA}
              </a>
            </div>
          </div>

          <div className="group flex flex-row items-center space-x-4">
              <MdWhatsapp className="group-hover:scale-110 group-hover:brightness-125 transition-all text-3xl text-sky-600" />
              <div className="flex flex-col">
              <span className="font-semibold">
                WhatsApp
              </span>
              <a href={`https://wa.me/+${agency.whatsapp}`} className="hover:text-sky-600" target="_blank">
                +{agency.whatsapp}
              </a>
            </div>
          </div>

        </div>
        <div className="py-8 lg:py-0 lg:w-1/2">
          <div className="flex flex-col space-y-4 mx-auto lg:max-w-screen-lg">
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