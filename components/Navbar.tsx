"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lusitana } from "next/font/google";
import Donation from "@/components/Donation";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Separator } from "./ui/separator";

const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center w-full fixed bg-sky-50 z-50 drop-shadow-xl">
    <div className="flex justify-between items-center w-full max-w-7xl px-4 py-6 mx-auto">
      <h1 className={`${lusitana.className} text-2xl text-cyan-900 z-40`}>
        PELAYAN<span className="text-cyan-400">QURAN</span>
      </h1>
      <div className="hidden md:flex md:items-center h-6 gap-4">
        <Link
          href={"/"}
          className={
            `${path === "/" ? "text-cyan-400" : "text-gray-700"}` +
            " px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold"
          }
        >
          Beranda
        </Link>
        <Link
          href={"/penyaluran"}
          className={
            `${path === "/penyaluran" ? "text-cyan-400" : "text-gray-700"}` +
            " px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold"
          }
        >
          Penyaluran
        </Link>
        <Link
          href={"/tentang-kami"}
          className={
            `${path === "/tentang-kami" ? "text-cyan-400" : "text-gray-700"}` +
            " px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold mr-2"
          }
        >
          Tentang Kami
        </Link>
        <Donation />
      </div>
      <div className="static md:hidden">
        <HamburgerMenuIcon
          className="w-8 h-8 z-20 cursor-pointer transition-all duration-1000"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div
            className={`block absolute px-4 py-6 bg-sky-100 w-full h-screen z-30 top-0 left-0  transition-all duration-1000`}
          >
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex justify-end w-full mb-4">
                <Cross1Icon
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              </div>
              <Link
                onClick={() => setOpen(!open)}
                href={"/"}
                className={
                  `${path === "/" ? "text-cyan-400" : "text-gray-700"}` +
                  " px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold"
                }
              >
                Beranda
              </Link>
              <Separator orientation="horizontal" className="bg-gray-400" />
              <Link
                onClick={() => setOpen(!open)}
                href={"/galeri"}
                className={
                  `${path === "/galeri" ? "text-cyan-400" : "text-gray-700"}` +
                  " px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold"
                }
              >
                Galeri
              </Link>
              <Separator orientation="horizontal" className="bg-gray-400" />
              <Link
                onClick={() => setOpen(!open)}
                href={"/tentang-kami"}
                className={
                  `${
                    path === "/tentang-kami" ? "text-cyan-400" : "text-gray-700"
                  }` +
                  " px-4 py-2 border-2 border-transparent hover:text-cyan-400 font-bold"
                }
              >
                Tentang Kami
              </Link>
              <Separator
                orientation="horizontal"
                className="bg-gray-400 mb-4"
              />
              <Donation />
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}