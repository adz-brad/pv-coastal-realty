import '../styles/globals.css'
import localFont from 'next/font/local'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Messenger from '../components/Messenger'

export const metadata = {
  title: 'PV Coastal Realty',
  description: 'Discover Your Paradise With PV Coastal Realty - Your Experts For Puerto Vallarta and Riviera Nayarit Real Estate!',
}

const kumbh = localFont({src: '../fonts/KumbhSans.ttf', variable: '--font-kumbh'})
const montserrat = localFont({src: '../fonts/Montserrat.ttf', variable: '--font-montserrat'})

export default function RootLayout({ children }) {

  return (

    <html lang="en" className={`${kumbh.variable} ${montserrat.variable}`}>
      <body>
        <Navbar />
          <main>
            {children}
          </main>
        <Footer />
        <Messenger />
      </body>
    </html>

  )

}
