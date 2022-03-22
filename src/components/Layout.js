import * as React from "react"

import NavigationBar from "./NavigationBar"
import Seo from "./Seo"

const Layout = ({ children }) => {
  return (
    <>
      <Seo title="Feeling Mutual" />
      <div>
        <main className="min-w-screen">{children}</main>

      </div>
    </>
  )
}

export default Layout
