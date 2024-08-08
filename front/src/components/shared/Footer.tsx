import LinkedinIcon from "@/utils/linkedinIcon"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className='border-t-[1px] w-full border-t-dark bg-[#F9D8DF] dark:bg-[#311421] dark:border-t-light p-4 text-dark dark:text-light z-50'>
      <div className='flex flex-col gap-1 items-center justify-center'>
        <p className='font-semibold'>
          Creado con 💖 por
        </p>

        <div className='flex flex-row gap-4 items-center justify-center font-bold text-main'>
          <Link 
            to="https://www.linkedin.com/in/gabriel-nievas/" 
            className="hover:underline flex flex-row gap-1 justify-center items-center"
            target="_blank"
          >
            <LinkedinIcon />
            Gabi
          </Link>

          <Link 
            to="https://www.linkedin.com/in/emiigonzalez33/" 
            className="hover:underline flex flex-row gap-1 justify-center items-center"
            target="_blank"
          >
            <LinkedinIcon />
            Emi
          </Link>

          <Link 
            to="https://www.linkedin.com/in/santiago-herrera-501293239/" 
            className="hover:underline flex flex-row gap-1 justify-center items-center"
            target="_blank"
          >
            <LinkedinIcon />
            Sani
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
