import { Library } from "@/interfaces/Library"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import FormAddLibrary from "../../../components/shared/FormAddLibrary"
import { motion } from "framer-motion"

const StateCard = ({ card }: { card: Library }) => {
  return (
    <motion.div 
      className="flex bg-main/15 flex-col justify-between border border-dark dark:border-light rounded-md shadow-xl p-4 min-w-[300px] sm:min-w-[300px] md:min-w-[320px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div 
        className="flex flex-1 flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between gap-4">
          <h2 className="text-2xl font-bold truncate">{card.name}</h2>

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
              {card.state === "ACTIVE" ? "ACTIVA" : card.state === "PENDING" ? "PENDIENTE" : "INACTIVA"}
            </span>
          </div>
        </div>

        <p className="text-base line-clamp-3">{card.description}</p>
      </motion.div>

      {card.state === "ACTIVE" ? (
        ""
      ) : (
        <div className="flex items-center justify-between mt-4">
          <Dialog>
            <DialogTrigger className="flex-grow flex flex-row gap-2 justify-center items-center cursor-pointe bg-main hover:bg-[#F84F9A] hover:dark:bg-[#C9216D] transition-colors duration-150 text-light py-2 rounded-sm">
              <Icon
                icon="fluent:edit-24-filled"
                width="20"
                height="20"
              />
              <p className="font-medium text-sm">Editar</p>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Sugerir
                </DialogTitle>
              </DialogHeader>
              <FormAddLibrary card={card} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </motion.div>
  )
}

export default StateCard