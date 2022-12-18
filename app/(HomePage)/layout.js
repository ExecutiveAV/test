import './global.css'
import Link from 'next/link'

import SideBar from './SideBar.jsx'

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <SideBar />
        {children}
        <Link href="/" >test</Link>
      </body>
    </html>
  )
}
