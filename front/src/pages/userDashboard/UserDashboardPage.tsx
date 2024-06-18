import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import FormAddLibrary from "./components/Form"
import StateCard from "./components/StateCard"

const UserDashboardPage = () => {
  const cardDetails: Library[] = [
    {
      id: 1,
      name: "React",
      description:
        "Un framework de JavaScript para construir interfaces de usuario",
      tags: [
        {
          id: 1,
          name: "JavaScript",
          bgColor: "#F7DC6F",
          borderColor: "#F7DC6F"
        },
        {
          id: 2,
          name: "Frontend",
          bgColor: "#3498DB",
          borderColor: "#3498DB"
        },
        { id: 3, name: "UI", bgColor: "#9B59B6", borderColor: "#9B59B6" }
      ],
      likes: 1,
      isActive: true,
      state: "ACTIVE",
      createdBy: {
        id: 1,
        name: "John",
        lastname: "Doe",
        username: "johndoe",
        password: "password123",
        email: "johndoe@me.com"
      }
    },
    {
      id: 1,
      name: "React",
      description:
        "Un framework de JavaScript para construir interfaces de usuario",
      tags: [
        {
          id: 1,
          name: "JavaScript",
          bgColor: "#F7DC6F",
          borderColor: "#F7DC6F"
        },
        {
          id: 2,
          name: "Frontend",
          bgColor: "#3498DB",
          borderColor: "#3498DB"
        },
        { id: 3, name: "UI", bgColor: "#9B59B6", borderColor: "#9B59B6" }
      ],
      likes: 1,
      isActive: true,
      state: "ACTIVE",
      createdBy: {
        id: 1,
        name: "John",
        lastname: "Doe",
        username: "johndoe",
        password: "password123",
        email: "johndoe@me.com"
      }
    }
  ]
  return (
    <div className="flex flex-1 w-screen flex-col relative ">
      <div className="flex justify-end p-10">
        <Dialog>
          <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md">
            Sugerir
          </DialogTrigger>
          <DialogContent className="bg-light dark:bg-dark ">
            <DialogHeader className="">
              <DialogTitle>
                <strong className="text-light dark:text-dark ">Sugerir</strong>
              </DialogTitle>
            </DialogHeader>
            <FormAddLibrary />
          </DialogContent>
        </Dialog>
      </div>
      <section className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mb-10">
        {cardDetails.map((card) => (
          <StateCard
            key={crypto.randomUUID()}
            card={card}
          />
        ))}
      </section>
    </div>
  )
}

export default UserDashboardPage
