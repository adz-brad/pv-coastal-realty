export const metadata = {
    title: 'Search Properties | PV Coastal Realty',
    description: "Search PV Coastal Realty's extensive listing database from MLS Vallarta to find you perfect dream home in paradise today!",
    alternates: {
      canonical: `${process.env.NEXT_SITE_BASEPATH}/search`,
    },
    other: {
      thumbnail: '/card.jpg'
    },
    twitter: {
      card: 'summary',
      title: 'Search Properties | PV Coastal Realty',
      description: "Search PV Coastal Realty's extensive listing database from MLS Vallarta to find you perfect dream home in paradise today!",
      creator: '@pvcoastalrealty',
      images: [`/card.jpg`],
      url: `${process.env.NEXT_SITE_BASEPATH}/search`
    },
    openGraph: {
      title: 'Search Properties | PV Coastal Realty',
      description: "Search PV Coastal Realty's extensive listing database from MLS Vallarta to find you perfect dream home in paradise today!",
      type: 'website',
      images: [{url:`/card.jpg`}],
      url: `${process.env.NEXT_SITE_BASEPATH}/search`
    },
  }

export default function SearchLayout({ children }) {
  return children
}
