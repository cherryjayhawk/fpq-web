import Donation from './Donation'

function PenyaluranDonasi() {
  return (
    <div className="flex flex-col items-center w-full max-w-7xl px-4 py-6 mx-auto">
        <h1 className='text-center text-4xl md:text-4xl font-bold text-cyan-500'>Penyaluran Donasi</h1>
        <p className='hidden md:block text-center my-8'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim eligendi, praesentium, voluptatem explicabo vero quibusdam labore velit amet excepturi voluptas ut illo facere minima, assumenda in sunt atque ea? Eius.</p>
        <div className='my-16 w-full flex flex-wrap justify-around gap-10 md:gap-8'>
            <div className='flex justify-center items-center md:h-96 w-96 rounded-full md:bg-blue-100'>
                <div>
                    <h1 className='text-center text-7xl font-bold text-cyan-500'>2850</h1>
                    <p className='text-center text-lg font-semibold text-gray-700 py-2 max-w-xs'>Total Mushaf Al-quran yang telah tersalurkan</p>
                </div>
            </div>
            <div className='flex justify-center items-center md:h-96 w-96 rounded-full md:bg-blue-100'>
                <div>
                    <h1 className='text-center text-7xl font-bold text-cyan-500'>537</h1>
                    <p className='text-center text-lg font-semibold text-gray-700 py-2 max-w-xs'>Total Pesantren yang mendapat bantuan bahan pokok</p>
                </div>
            </div>
            <div className='flex justify-center items-center md:h-96 w-96 rounded-full md:bg-blue-100'>
                <div>
                    <h1 className='text-center text-7xl font-bold text-cyan-500'>257</h1>
                    <p className='text-center text-lg font-semibold text-gray-700 py-2 max-w-xs'>Total Pengajar Al-quran yang sudah menerima bantuan di seluruh Indonesia</p>
                </div>
            </div>
        </div>
        <div className='flex justify-center items-center w-96'>
            <Donation />
        </div>
    </div>
  )
}

export default PenyaluranDonasi