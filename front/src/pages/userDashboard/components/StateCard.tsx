import { Library } from "@/interfaces/Library"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import FormAddLibrary from "./Form"

const StateCard = ({ card }: { card: Library }) => {
  return (
    <div className="flex bg-main/15 flex-col justify-between border border-dark dark:border-light rounded-md shadow-xl hover:scale-[1.03] hover:transition-transform duration-500 p-4">
      <div className="flex items-end justify-end">
        <div className="flex items-center gap-2">
          <span
            className={`${
              card.state === "ACTIVE"
                ? "text-[#0f0]"
                : card.state === "PENDING"
                ? "text-[#Ff0]"
                : "text-[#Ff0000]"
            }`}
          >
            {card.state}
          </span>
          <div
            className={`w-4 h-4 rounded-full ${
              card.state === "ACTIVE"
                ? "bg-[#0f0]"
                : card.state === "PENDING"
                ? "bg-[#Ff0]"
                : "bg-[#Ff0000]"
            }`}
          ></div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h2 className="text-2xl font-bold">{card.name}</h2>
        <p className="text-base">{card.description}</p>
      </div>
      {card.state === "ACTIVE" ? 
        ""
       : (
        <div className="flex items-center justify-between mt-4">
          <Dialog>
            <DialogTrigger className="flex-grow flex flex-row gap-2 justify-center items-center cursor-pointe bg-main hover:bg-main/80 text-light py-2 rounded-sm">
              Edit
              <Icon
                icon="fluent:edit-24-filled"
                width="16"
                height="16"
              />
            </DialogTrigger>
            <DialogContent className="bg-light dark:bg-dark ">
              <DialogHeader className="">
                <DialogTitle>
                  <strong className="text-light dark:text-dark ">
                    Sugerir
                  </strong>
                </DialogTitle>
              </DialogHeader>
              <FormAddLibrary card={card} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default StateCard
