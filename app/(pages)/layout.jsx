import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Messenger from '../components/Messenger'

export const metadata = {
  title: 'PV Coastal Realty',
  description: '',
}

export default function RootLayout({ children }) {

  return (

    <html lang="en">
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
