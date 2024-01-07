'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Lusitana } from "next/font/google"
import { cn } from "@/lib/utils"

const lusitana = Lusitana({
    subsets: ["latin"],
    weight: ["400"],
  });

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
    const path = usePathname()
    console.log(path)

  return (
    <div className="flex justify-between w-full">
        <h1 className={`${lusitana.className} text-2xl text-cyan-900 z-40`}>
            PELAYAN<span className="text-cyan-400">QURAN</span>
        </h1>
        <nav
        className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        {...props}
        >
        <Link
            href="/dashboard"
            className={`text-sm font-medium ${ path !== '/dashboard' ? 'text-muted-foreground' : ''} transition-colors hover:text-primary`}
            >
            Dashboard
        </Link>
        <Link
            href="/dashboard/invoices"
            className={`text-sm font-medium ${ path !== '/dashboard/invoices' ? 'text-muted-foreground' : ''} transition-colors hover:text-primary`}
            >
            Invoices
        </Link>
        <Link
            href="/dashboard/customers"
            className={`text-sm font-medium ${ path !== '/dashboard/customers' ? 'text-muted-foreground' : ''} transition-colors hover:text-primary`}
            >
            Customers
        </Link>
        <Link
            href="/dashboard/settings"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
            Settings
        </Link>
        </nav>
    </div>
  )
}