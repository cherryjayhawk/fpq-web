import Image from "next/image"
import ButtonDonasi from "./ButtonDonasi"
import Waves from "./Waves"

function LandingPage() {
  return (
    <div className="h-screen">
        <div className="flex flex-col-reverse flex-wrap-reverse md:flex-nowrap md:flex-row justify-between items-center w-full max-w-7xl px-4 py-6 mx-auto gap-8">
            <div className="flex flex-col p-4 z-20 w-full max-w-sm md:max-w-2xl md:w-1/2 md:pr-16 ">
                <h1 className="text-4xl text-center font-bold text-cyan-600 outline-8 outline-white md:text-cyan-600 md:text-left lg:text-6xl">Wakaf Quran <br /> <span className="my-2" /> dan Menyantuni <br /> <span className="my-2" /> Guru Ngaji</h1>
                <br />
                <p className="line-clamp-3 font-semibold text-center text-sky-100 md:text-cyan-600 md:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. At repudiandae pariatur, illum placeat, alias sunt, libero repellendus reiciendis quisquam laudantium voluptas dolorum expedita et labore non impedit voluptatibus quibusdam beatae.</p>
                <br />
                <div className="flex justify-center md:justify-start">
                    <ButtonDonasi />
                </div>
            </div>
            <Image src={'/landing-page.png'} width={640} height={640} alt="/vercel.svg" className="min-w-full max-w-sm md:max-w-md md:min-w-fit"/>
        </div>
        <Waves direction="up" />
    </div>
  )
}

export default LandingPage