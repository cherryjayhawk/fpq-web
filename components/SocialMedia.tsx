import { Facebook, Phone, Instagram, Youtube } from "lucide-react"

function SocialMedia() {
  return (
    <div className="flex flex-col fixed right-4 bottom-8 gap-2">
        <a href="https://m.facebook.com/p/Forum-Pelayan-Al-Quran-FPQ-%D8%AC%D9%85%D8%B9%D9%8A%D8%A9-%D8%AE%D8%AF%D8%A7%D9%85-%D8%A7%D9%84%D9%82%D8%B1%D8%A7%D9%86-100066982701914/" 
            className="flex justify-center items-center w-12 h-12 bg-sky-100 border-2 rounded-full cursor-pointer border-blue-700">
            <Facebook fill="#1d4ed8" strokeWidth={0}/>
        </a>
        <a href="" className="flex justify-center items-center w-12 h-12 bg-sky-100 border-2 rounded-full cursor-pointer border-lime-500">
            <Phone fill="#84cc16" strokeWidth={0} />
        </a>
        <a href="https://www.instagram.com/pelayanquran/" className="flex justify-center items-center w-12 h-12 bg-sky-100 border-2 rounded-full cursor-pointer border-fuchsia-600">
            <Instagram color="#c026d3"/>
        </a>
        <a href="https://www.youtube.com/@pelayanquran" className="flex justify-center items-center w-12 h-12 bg-sky-100 border-2 rounded-full cursor-pointer border-rose-600">
            <Youtube color="#e11d48"/>
        </a>
    </div>
  )
}

export default SocialMedia