// import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    // bg-light dark:bg-dark
    <div className='border-t-[1px] w-full border-t-dark bg-[#F9D8DF] dark:bg-[#311421] dark:border-t-light p-4 text-dark dark:text-light z-50'>
      <div className='flex flex-col gap-1 items-center justify-center'>
        <p className='font-semibold'>
          Created with 💖 by
        </p>
        <div className='flex flex-row gap-2 items-center justify-center font-bold text-main'>
          <a href="" className="hover:underline">
            @Gabi
          </a>
          <a href="" className="hover:underline">
            @Emi
          </a>
          <a href="" className="hover:underline">
            @Sani
          </a>
        </div>
      </div>
      {/* Footer <Icon icon="fxemoji:roastedsweetpotato" width="24" height="24" /> */}
    </div>
  )
}

export default Footer