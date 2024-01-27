import Image from "next/image"
import Donation from "./Donation"
import Waves from "./Waves"

function LandingPage() {
  return (
  <>
    <div className="flex flex-col justify-center items-center w-full min-h-dvh pt-20 md:pt-0">
        <div className="flex flex-col-reverse flex-wrap-reverse md:flex-nowrap md:flex-row justify-between items-center max-w-7xl px-4 py-6 mx-auto h-full gap-8">
            <div className="flex flex-col p-4 z-20 w-full max-w-sm md:max-w-2xl md:w-1/2 md:pr-12 ">
                <h1 className="text-4xl text-center font-bold text-cyan-600 outline-8 outline-white md:text-cyan-600 md:text-left lg:text-6xl">Wakaf Quran <br /> <span className="my-2" /> dan Menyantuni <br /> <span className="my-2" /> Guru Ngaji</h1>
                <br />
                <p className="line-clamp-3 font-semibold text-center text-sky-100 md:text-cyan-600 md:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. At repudiandae pariatur, illum placeat, alias sunt, libero repellendus reiciendis quisquam laudantium voluptas dolorum expedita et labore non impedit voluptatibus quibusdam beatae.</p>
                <br />
                <div className="flex justify-center md:justify-start">
                    <Donation />
                </div>
            </div>
            <Image src={'/landing-page.png'} width={640} height={640} alt="wakaf al quran" priority className="min-w-full h-full max-w-sm md:max-w-md md:min-w-fit"/>
        </div>
    </div>
    {/* <svg className="absolute -translate-y-96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#06b6d4" fill-opacity="1" d="M0,192L48,181.3C96,171,192,149,288,122.7C384,96,480,64,576,74.7C672,85,768,139,864,160C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> */}
  </>
  )
}

export default LandingPage