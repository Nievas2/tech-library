import { Library } from "@/interfaces/Library"
import { Icon } from "@iconify/react/dist/iconify.js"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import EditLibraryAdmin from "./EditLibraryAdmin"
import { formatGoogleUsername } from "@/utils/formatGoogleUsername"
import { formatDate } from "@/utils"
import { Button } from "@/components/ui/button"
import { deletelibrary } from "@/services/LibraryService"
const StateCardAdmin = ({ card }: { card: Library }) => {
  async function handleDelete() {
    try {
      await deletelibrary(card.id)
      window.location.reload()
    } catch (error) {
      return
    }
  }
  return (
    <div className="flex bg-main/15 flex-col justify-between border border-dark dark:border-light rounded-md shadow-xl p-4 min-w-[300px] sm:min-w-[300px] md:min-w-[320px]">
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
              {card.state === "ACTIVE"
                ? "ACTIVA"
                : card.state === "PENDING"
                ? "PENDIENTE"
                : "INACTIVA"}
            </span>
          </div>
        </div>

        <p className="text-base line-clamp-3">{card.description}</p>
      </div>
      <div className="flex items-center justify-between mt-4 gap-2">
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
              <DialogTitle>Sugerir</DialogTitle>
            </DialogHeader>
            <EditLibraryAdmin card={card} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className="bg-[#6e0202] focus:bg-[#ff284cbf] focus:dark:bg-[#ff284cbf] hover:bg-[#ff284cbf] hover:dark:bg-[#ff284cbf] focus:text-light text-base cursor-pointer duration-150 text-light p-2 px-4 rounded-sm">
            <Icon
              icon="mdi:trash"
              width="20"
              height="20"
            />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar libreria</DialogTitle>
            </DialogHeader>
            <h4>¿Seguro que quieres borrar esta sugerencia?</h4>
            <div className="flex w-full">
              <div className="w-full">
                <DialogClose className="text-dark bg-primary focus:bg-primary/60 focus:dark:bg-primary/60 hover:bg-primary/60 hover:dark:bg-primary/60 focus:text-light text-base cursor-pointer duration-150 p-2 px-4 rounded-sm">
                  Cancelar
                </DialogClose>
              </div>

              <Button
                onClick={handleDelete}
                className="bg-[#6e0202] focus:bg-[#ff284cbf] focus:dark:bg-[#ff284cbf] hover:bg-[#ff284cbf] hover:dark:bg-[#ff284cbf] focus:text-light text-base cursor-pointer duration-150 text-light p-2 px-4 rounded-sm"
              >
                Borrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-end justify-end w-full mt-4">
        <small className="text-dark dark:text-light font-medium">
          Sugerido por{" "}
          <span className="font-semibold text-main">
            @{formatGoogleUsername(card.createdBy.username)}
          </span>{" "}
          el {formatDate(card.createdAt)}
        </small>
      </div>
    </div>
  )
}

export default StateCardAdmin
