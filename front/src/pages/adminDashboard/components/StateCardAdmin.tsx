import { Library } from "@/interfaces/Library"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import EditLibraryAdmin from "./EditLibraryAdmin"
const StateCardAdmin = ({ card }: { card: Library }) => {
  return (
    <div className="flex bg-main/15 flex-col justify-between border border-dark dark:border-light rounded-md shadow-xl p-4">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">{card.name}</h2>
          <div
            className={`flex items-center gap-2 border ${
              card.state === "ACTIVE"
                ? "border-[#276827]"
                : card.state === "PENDING"
                ? "border-[#bf9000]"
                : "border-[#6e0202]"
            } border-main rounded-full px-4 ${
              card.state === "ACTIVE"
                ? "bg-[#a0eba0]"
                : card.state === "PENDING"
                ? "bg-[#f0f085]"
                : "bg-[#fc7b7b]"
            }`}
          >
            <span
              className={`font-bold ${
                card.state === "ACTIVE"
                  ? "text-[#276827]"
                  : card.state === "PENDING"
                  ? "text-[#bf9000]"
                  : "text-[#6e0202]"
              }`}
            >
              {card.state}
            </span>
          </div>
        </div>

        <p className="text-base">{card.description}</p>
      </div>
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
                  <strong className="text-dark dark:text-light ">
                    Sugerir
                  </strong>
                </DialogTitle>
              </DialogHeader>
              <EditLibraryAdmin card={card} />
            </DialogContent>
          </Dialog>
        </div>
    </div>
  )
}

export default StateCardAdmin
