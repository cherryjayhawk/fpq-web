import Navbar from '@/components/Navbar'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/admin/data-table'
import Footer from '@/components/Footer'

type Penyaluran = {
  id: string,
  fullname: string,
  total: number,
  status: string,
  update: string
}

const columns: ColumnDef<Penyaluran>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fullname",
    header: "Atas Nama",
  },
  {
    accessorKey: "total",
    header: "Jumlah",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "updated_at",
    header: "Update",
  },

]

async function Penyaluran() {
  const res = await fetch(`${process.env.WEBSERVICE_URL}invoices`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
    },
    next: { revalidate: 3600 }
  })
  
  const data = await res.json()

  return (
    <>
      <Navbar />
      <div className='max-w-7xl min-h-dvh pt-20 pb-8 m-auto px-2'>
        <h2 className='text-left text-3xl font-bold text-cyan-500 px-2 pt-8 pb-2'>Riwayat Penyaluran</h2>
        <p className='text-left text-sm text-gray-400 px-2 pb-8'>Temukan riwayat lengkap penyaluran wakaf Al-Quran yang telah kami terima. </p>
        <DataTable columns={columns} data={data} usage='penyaluran' className='overflow-x-scroll' />
      </div>
      <Footer />
    </>
  )
}

export default Penyaluran