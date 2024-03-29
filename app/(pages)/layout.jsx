import '../styles/globals.css'
import localFont from 'next/font/local'
import Navbar from '../components/Navbar'

import JsonLd from '../components/JsonLd'
import { useAgentJSON } from '../hooks'

import dynamic from "next/dynamic"

import Script from 'next/script'


const Footer = dynamic(() => import('@/app/components/Footer'))
const Messenger = dynamic(() => import('@/app/components/Messenger'))

export const metadata = {
  title: 'PV Coastal Realty | Where Dream Homes Come True!',
  description: 'Discover your paradise with PV Coastal Realty, your expert agents for Puerto Vallarta and Riviera Nayarit real estate. Find your dream home in Banderas Bay today!',
  keywords: ['PV Coastal Realty', 'Real Estate', 'Puerto Vallarta', 'Nuevo Vallarta', "Mezcales", 'Riviera Nayarit', 'Banderas Bay', 'Homes For Sale', 'Beachfront Homes', 'Expat', 'Moving To Mexico'],
  alternates: {
    canonical: process.env.NEXT_SITE_BASEPATH,
  },
  other: {
    thumbnail: '/card.jpg',
    "p:domain_verify": "a759b0a2f21961439070e8a33d861d49"
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
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/pv-coastal-realty-logo.png',
    },
  },
  twitter: {
    card: 'summary',
    title: 'PV Coastal Realty | Where Dream Homes Come True!',
    description: 'Discover your paradise with PV Coastal Realty, your expert agents for Puerto Vallarta and Riviera Nayarit real estate. Find your dream home in Banderas Bay today!',
    creator: '@pvcoastalrealty',
    images: [`/card.jpg`],
  },
  openGraph: {
    title: 'PV Coastal Realty | Where Dream Homes Come True!',
    description: 'Discover your paradise with PV Coastal Realty, your expert agents for Puerto Vallarta and Riviera Nayarit real estate. Find your dream home in Banderas Bay today!',
    type: 'website',
    images: [{url:`/card.jpg`}],
    url: process.env.NEXT_SITE_BASEPATH
  },
}

const kumbh = localFont({src: '../fonts/KumbhSans.ttf', variable: '--font-kumbh'})
const montserrat = localFont({src: '../fonts/Montserrat.ttf', variable: '--font-montserrat'})

export default function RootLayout({ children }) {

  const agentData = useAgentJSON()

  return (

    <html lang="en" className={`${kumbh.variable} ${montserrat.variable}`}>
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-RZ9TTZJ092" 
        strategy="afterInteractive" 
      />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RZ9TTZJ092');
        `,
        }}
      />
      <JsonLd data={agentData} />
      <body>
        <Navbar />
          <main>
            {children}
          </main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Messenger />}
      </body>
    </html>

  )

}
