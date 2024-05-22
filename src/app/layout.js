import { Providers } from './providers'
import { Analytics } from "@vercel/analytics/react"


export default function RootLayout({children}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
        <Analytics/>
      </body>
    </html>
  )
}
