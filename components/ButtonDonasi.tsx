import React from 'react'
import { Button } from './ui/button' 

function ButtonDonasi() {
  return (
    <Button className={'w-full rounded-full px-4 py-2 border-2 border-transparent bg-lime-500 text-white font-bold hover:text-lime-500 hover:border-lime-500 hover:bg-transparent md:w-auto'}>Donasi yuk!</Button>
  )
}

export default ButtonDonasi