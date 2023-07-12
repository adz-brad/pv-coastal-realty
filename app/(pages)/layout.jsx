import '../styles/globals.css'
import localFont from 'next/font/local'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Messenger from '../components/Messenger'
import JsonLd from '../components/JsonLd'
import { useAgentJSON } from '../hooks'

export const metadata = {
  title: 'PV Coastal Realty | Where Dream Homes Come True!',
  description: 'Discover your paradise with PV Coastal Realty, your expert agents for Puerto Vallarta and Riviera Nayarit real estate. Find your dream home in Banderas Bay today!',
  keywords: ['PV Coastal Realty', 'Real Estate', 'Puerto Vallarta', 'Nuevo Vallarta', "Mezcales", 'Riviera Nayarit', 'Banderas Bay', 'Homes For Sale', 'Beachfront Homes', 'Expat', 'Moving To Mexico'],
  alternates: {
    canonical: process.env.NEXT_SITE_BASEPATH,
  },
  verification: {
    google: process.env.NEXT_GOOGLE_VERIFICATION_TOKEN,
    yandex: process.env.NEXT_YANDEX_VERIFICATION_TOKEN,
    yahoo: process.env.NEXT_YAHOO_VERIFICATION_TOKEN
  },
  icons: {
    icon: '/pv-coastal-realty-logo.png',
    shortcut: '/pv-coastal-realty-logo.png',
    apple: '/pv-coastal-realty-logo.png',
  },
  twitter: {
    card: 'summary',
    title: 'PV Coastal Realty | Where Dream Homes Come True!',
    description: 'Discover your paradise with PV Coastal Realty, your expert agents for Puerto Vallarta and Riviera Nayarit real estate. Find your dream home in Banderas Bay today!',
    creator: '@pvcoastalrealty',
    images: [`/pv-coastal-realty-logo.png`],
  },
  openGraph: {
    title: 'PV Coastal Realty | Where Dream Homes Come True!',
    description: 'Discover your paradise with PV Coastal Realty, your expert agents for Puerto Vallarta and Riviera Nayarit real estate. Find your dream home in Banderas Bay today!',
    type: 'website',
    images: [{url:`/pv-coastal-realty-logo.png`}],
    url: process.env.NEXT_SITE_BASEPATH
  },
}

const kumbh = localFont({src: '../fonts/KumbhSans.ttf', variable: '--font-kumbh'})
const montserrat = localFont({src: '../fonts/Montserrat.ttf', variable: '--font-montserrat'})

export default function RootLayout({ children }) {

  const agentData = useAgentJSON()

  return (

    <html lang="en" className={`${kumbh.variable} ${montserrat.variable}`}>
      <JsonLd data={agentData} />

      <body>
        <Navbar />
          <main>
            {children}
          </main>
        <Footer />
        {/*<Messenger />*/}
      </body>
    </html>

  )

}
