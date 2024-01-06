'use client'
import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function CarouselAuto() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
    >
      <CarouselContent className="-ml-10 md:-ml-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-10 md:pl-8 basis-2/3 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-[3/4] items-center justify-around p-6 gap-4">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <Avatar className="aspect-square min-w-24 min-h-24">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>FPQ</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-center text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor quo aliquid earum dolorem dolores. Assumenda corrupti ipsum, neque repellat dolorem autem odit quos minima eligendi illo exercitationem optio aperiam ratione!</p>
                  <p className="font-semibold text-center text-gray-700">Drs. Hendry Gunawan</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:inline-flex" />
      <CarouselNext className="hidden lg:inline-flex" />
    </Carousel>
  )
}
