'use client'
import { MainNav } from "@/components/NavbarAdmin"
import { SessionProvider } from "next-auth/react"

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider>
      <div className="flex justify-between items-center w-full max-w-7xl px-4 py-6 mx-auto bg-transparent">
          <div className="hidden w-full min-h-screen h-full flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
              </div>
            </div>
            { children }
          </div>
      </div>
      </SessionProvider>
    )
  }
  
export default DashboardLayout