import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import FormAddLibrary from "./components/form"

const UserDashboardPage = () => {
  return (
    <div className="flex flex-1 w-screen flex-col relative ">
      <div className="flex justify-end p-10">
        <Dialog>
          <DialogTrigger className="text-light dark:text-dark " >
            Sugerir
          </DialogTrigger>
          <DialogContent className="bg-dark dark:bg-light ">
            <DialogHeader className="text-dark dark:text-light">
              <DialogTitle>Sugerir</DialogTitle>
            </DialogHeader>
            <FormAddLibrary />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default UserDashboardPage
