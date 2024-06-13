import { Icon } from "@iconify/react/dist/iconify.js"
import ItemsSideBar from "./ItemsSideBar"
import { useTecnologies } from "@/stores/Tecnologies"
import { Tecnology } from "@/interfaces/Tecnology"
import { useState } from "react"

export default function SideBar() {
  const [open, setOpen] = useState(true)
  const tecnologies = useTecnologies((state) => state.tecnologies)
  console.log(tecnologies)

  return (
    <section
      className={`h-full duration-500 ease-out ${
        open ? "w-32 sm:w-60" : "w-0"
      } bg-light dark:bg-dark`}
    >
      <div
        className={`w-full h-[100vh] relative  border-r-[1px] border-r-dark dark:border-r-light ${
          open ? "p-2" : "p-0"
        }`}
      >
        <div
          className={`absolute duration-150 ${
            open ? "right-[-16px]" : "right-[-40px]"
          } top-1`}
        >
          <button
            onClick={() => setOpen(!open)}
            className="bg-dark dark:bg-light rounded-full"
          >
            <Icon
              icon="mingcute:right-fill"
              width="36"
              height="36"
              color="#f72585"
              className={`duration-300 ${open ? " rotate-180" : ""}`}
            />
          </button>
        </div>
        <ul className={`${open ? "block" : "hidden"}`}>
          <li>
            <h1 className="text-xl font-bold">Tecnologies</h1>
          </li>
          {tecnologies?.map((tecnology: Tecnology) => (
            <ItemsSideBar
              key={tecnology.name}
              tecnology={tecnology}
            />
          ))}
          {/* 
          <ItemsSideBar
            name={"javascript"}
            selected={true}
          /> */}
        </ul>
      </div>
    </section>
  )
}
