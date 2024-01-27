'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { currencyFormatter } from './functions/currencyFormat'
import { Label } from './ui/label'
// import { payment_option } from './donation/data'

const FormDonationSchema = z.object({
  fullname: z.string().min(3, "Nama harus 3 atau lebih karakter."),
  email: z.string().min(3, 'Alamat email harus diisi.').email('Alamat email tidak valid'),
  note: z.string().max(225),
  payment_option: z.string({
    required_error: "Mohon pilih pembayaran.",
  }),
  items: z.object({
    QB_quantity: z.number(),
    QB_price: z.number(),
    QB_amount: z.number(),
    QK_quantity: z.number(),
    QK_price: z.number(),
    QK_amount: z.number(),
    GN_amount: z.number(),
  }),
  total: z.string()
})

type Inputs = z.infer<typeof FormDonationSchema>

const steps = [
  {
    id: 'Langkah 1',
    name: 'Nominal dan Data Diri',
    fields: ['QB_quantity', 'QK_quantity', 'GN_amount', 'GN_amount', 'total', 'fullname', 'email',  'note']
  },
  {
    id: 'Langkah 2',
    name: 'Opsi Pembayaran',
    fields: ['payment_option']
  },
  { 
    id: 'Langkah 3',
    name: 'Bayar',
    fields: []
  }
]

const price = {
  QB_price: 150000,
  QK_price: 75000
}

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [items, setItems] = useState({
    QB_quantity: 0,
    QK_quantity: 0
  })
  const [QB_amount, setQB_amount] = useState(0)
  const [QK_amount, setQK_amount] = useState(0)
  const [GN_amount, setGN_amount] = useState(0)
  const [total, setTotal] = useState(0)
  const [payment, setPayment] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDonationSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  const incrementQB = () => {
    setItems(prevItems => ({
      ...prevItems,
      QB_quantity: prevItems.QB_quantity + 1,
    }));
  }

  const decrementQB = () => {
    if (items.QB_quantity > 0) {
      setItems(prevItems => ({
        ...prevItems,
        QB_quantity: prevItems.QB_quantity - 1,
      }));
    }
  }
  const incrementQK = () => {
    setItems(prevItems => ({
      ...prevItems,
      QK_quantity: prevItems.QK_quantity + 1,
    }));
  }

  const decrementQK = () => {
    if (items.QK_quantity > 0) {
      setItems(prevItems => ({
        ...prevItems,
        QK_quantity: prevItems.QK_quantity - 1,
      }));
    }
  }

  useEffect(() => {
    setQB_amount(items.QB_quantity * price.QB_price)
    setQK_amount(items.QK_quantity * price.QK_price)
  }, [items])

  useEffect(() => {
    setTotal(QB_amount + QK_amount + GN_amount)
  }, [QB_amount, QK_amount, GN_amount])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={'w-full rounded-full px-4 py-2 border-2 border-transparent bg-lime-500 text-white font-bold hover:text-lime-500 hover:border-lime-500 hover:bg-transparent md:w-auto'}>Donasi yuk!</Button>
      </AlertDialogTrigger>
      <AlertDialogContent  className="max-h-dvh overflow-y-scroll">
    <section className='inset-0 flex flex-col justify-between mx-auto p-4 w-full max-w-lg shadow-2xl'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='flex space-x-8 space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-sky-600 transition-colors border-t-4 pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.name}
                  </span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-sky-600 border-t-4 pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-gray-200 transition-colors border-t-4 pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <br />
      <hr />

      {/* Form */}
      <form className='py-4' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Nominal dan Data Diri
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Lengkapi data berikut untuk berdonasi, kemudian klik Pembayaran.
            </p>
            <div className='mt-6 flex flex-col gap-x-6 gap-y-8'>
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full">Jenis</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex flex-col gap-4 w-full font-medium">
                    <p>Quran Besar</p>
                    <span>{ currencyFormatter.format(QB_amount) }</span>
                    <Input
                      type='number'
                      id='QB_amount'
                      value={QB_amount}
                      {...register('items.QB_amount')}
                      autoComplete='given-name'
                      className='hidden'
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className='flex justify-end gap-4'>
                      <MinusCircle opacity={0.8} color={`${QB_amount === 0 ? 'gray' : 'black'}`} className='cursor-pointer' onClick={decrementQB} />
                          <span>
                            { items.QB_quantity }
                          </span>
                          <Input
                            type='number'
                            id='QB_quantity'
                            value={items.QB_quantity}
                            {...register('items.QB_quantity')}
                            autoComplete='given-name'
                            className='hidden'
                          />
                      <PlusCircle opacity={0.8} className='cursor-pointer' onClick={incrementQB} />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col gap-4 w-full font-medium">
                    <p>Quran Kecil</p>
                    <span>{ currencyFormatter.format(QK_amount) }</span>
                    <Input
                      type='number'
                      id='QB_amount'
                      value={QK_amount}
                      {...register('items.QK_amount')}
                      autoComplete='given-name'
                      className='hidden'
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className='flex justify-end gap-4'>
                      <MinusCircle opacity={0.8} color={`${QK_amount === 0 ? 'gray' : 'black'}`} className='cursor-pointer' onClick={decrementQK} />
                          <span>{ items.QK_quantity }</span>
                          <Input
                            type='number'
                            id='QK_quantity'
                            value={items.QK_quantity}
                            {...register('items.QK_quantity')}
                            autoComplete='given-name'
                            className='hidden'
                          />
                      <PlusCircle opacity={0.8} className='cursor-pointer' onClick={incrementQK} />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-col gap-4 w-full font-medium">
                    <Label htmlFor='GN_amount'>
                      Guru Ngaji
                    </Label>
                    <div className='flex'>
                      <span className='rounded-l-md rounded-r-none border-2 border-r-0 bg-slate-200 w-12 h-10 flex justify-center items-center'>Rp</span>
                      <Input
                        type='number'
                        id='GN_amount'
                        {...register('items.GN_amount')}
                        autoComplete='given-name'
                        step={1000}
                        min={0}
                        placeholder={'0'}
                        value={GN_amount === 0 ? '' : GN_amount}
                        onChange={e => setGN_amount(Number(e.target.value))}
                        className='block w-full rounded-l-none rounded-r-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <Label htmlFor='total' className='font-bold'>
                      Total
                    </Label>
                    <div className='flex'>
                      <span>{ currencyFormatter.format(total) }</span>
                      <Input
                        type='number'
                        id='total'
                        value={total}
                        {...register('total')}
                        autoComplete='given-name'
                        className='hidden'
                      />
                    </div>
                    {errors.total?.message && (
                      <p className='mt-2 text-sm text-red-400'>
                        {errors.total.message}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='fullname'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Nama Lengkap
                </label>
                <div className='mt-2'>
                  <Input
                    type='text'
                    id='fullname'
                    maxLength={225}
                    {...register('fullname')}
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.fullname?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Alamat Email
                </label>
                <div className='mt-2'>
                  <Input
                    id='email'
                    type='email'
                    maxLength={225}
                    {...register('email')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.email?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='note'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Catatan <span className='text-gray-400'>(opsional)</span>
                </label>
                <div className='mt-2'>
                  <Textarea
                    id='note'
                    maxLength={225}
                    {...register('note')}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    autoComplete='note'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.note?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.note.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Opsi Pembayaran
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Pastikan informasi yang Anda masukkan sesuai.
            </p>
            

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='payment'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Pembayaran
                </label>
                <div className='mt-2'>
                  <Input
                    id='payment'
                    type='text'
                    {...register('payment_option')}
                    value={payment}
                    onChange={e => setPayment(e.target.value)}
                    autoComplete='payment'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.payment_option?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.payment_option.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )} 

        {currentStep === 1 && (
          <>
              <ol className='mt-1 text-sm leading-6 text-gray-600'>
                <li>fullname: {fullname}</li>
                <li>email: {email}</li>
                <li>note: {note}</li>
                <li>payment: {payment}</li>
                <li>QB_quantity: {items.QB_quantity}</li>
                <li>QB_price: {price.QB_price}</li>
                <li>QB_amount: {QB_amount}</li>
                <li>QK_quantity: {items.QK_quantity}</li>
                <li>QK_price: {price.QK_price}</li>
                <li>QK_amount: {QK_amount}</li>
                <li>GN_amount: {GN_amount}</li>
                <li>total: {total}</li>
              </ol>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Complete
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Thank you for your submission.
            </p>
          </>
        )}


      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-around'> 
          {
            currentStep === 0 && (
            <>
              <AlertDialogCancel className='ring-inset ring-sky-300'>
                  Tutup
              </AlertDialogCancel>
              <Button 
                onClick={next}
                disabled={total === 0}
                className='rounded-md px-2 py-1 text-sm font-semibold text-sky-50 shadow-sm ring-1 ring-inset hover:ring-sky-300 hover:bg-sky-50 hover:text-sky-900 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Pembayaran
              </Button>
            </>
            )
          }
          {
            currentStep === 1 && (
              <>
              <Button 
                type='button' 
                onClick={prev} 
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Kembali
              </Button>
              <Button 
                onClick={next}
                disabled={payment === ''}
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Bayar
              </Button>
              </>
            )
          }
          {
            currentStep === 2 && (
              <>
              <Button 
                type='button' 
                onClick={prev} 
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Kembali
              </Button>
              {/* <Button 
                onClick={next}
                disabled={payment === ''}
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  Bayar
              </Button> */}
              </>
            )
          }
        </div>
      </div>
      </form>
    </section>
    </AlertDialogContent>
    </AlertDialog>
  )
}