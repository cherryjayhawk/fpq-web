import { Metadata } from "next"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Lusitana } from "next/font/google"
import { UserAuthForm } from "@/components/admin/auth-form"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400"],
});

export default function SignIn() {
  return (
    <>
      <div className="min-h-dvh container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Home
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <h1 className={`${lusitana.className} text-2xl text-cyan-900 z-40`}>
            PELAYAN<span className="text-cyan-400">QURAN</span>
          </h1>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;slogan.&rdquo;
              </p>
              <footer className="text-sm">pelayanquran.id</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                Sign In as Administrator
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to sign in
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}
