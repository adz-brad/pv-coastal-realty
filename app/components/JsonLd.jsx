import Script from "next/script"

const JsonLd = ({data}) => {
  return (
    <Script type="application/ld+json" strategy="afterInteractive">
        {data}
    </Script>
  )
}

export default JsonLd