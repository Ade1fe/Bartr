'use-client'

export default function Dashboard () {
  return (
    <>
      <section className='w-full py-6 md:py-8'>
        <div className='max-w-360 mx-auto px-4 md:px-8 grid grid-cols-1 items-center gap-8'>
          <div className='text-start'>
            <h1 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-poppins font-normal text-neutral-700 mb-3'>Welcome back, John!</h1>
            <p className='text-neutral-500 text-sm lg:text-base'>Here's what's happening with your trades</p>
          </div>
        </div>
      </section>
    </>
  )
}