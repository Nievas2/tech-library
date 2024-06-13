// import { Icon } from '@iconify/react';

const Footer = () => {
  return (
    <div className='border-t-[1px] border-t-dark bg-light dark:bg-dark dark:border-t-light p-4 text-dark dark:text-light'>
      <div className='flex flex-col gap-1 items-center justify-center'>
        <p className='font-semibold'>
          Created with 💖 by
        </p>
        <div className='flex flex-row gap-2 items-center justify-center font-bold'>
          <a href="">
            @Gabi
          </a>
          <a href="">
            @Emi
          </a>
          <a href="">
            @Sani
          </a>
        </div>

      </div>
      {/* Footer <Icon icon="fxemoji:roastedsweetpotato" width="24" height="24" /> */}
    </div>
  )
}

export default Footer