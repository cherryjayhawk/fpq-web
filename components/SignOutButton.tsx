'use client'
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

function SignOutButton() {
  return (
    <div className='flex justify-center items-center cursor-pointer gap-2 mt-2 mb-6' onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
        <LogOut size={22} />
        <p>Sign Out</p>
    </div>
  )
}

export default SignOutButton