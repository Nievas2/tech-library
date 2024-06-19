import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import FormAddLibrary from "./components/FormAddLibrary"
import StateCard from "./components/StateCard"
import { Library } from "@/interfaces/Library"
import { useState } from "react"
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
    link: "https://reactjs.org/",
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
    state: "PENDING",
    link: "https://reactjs.org/",
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
    state: "INACTIVE",
    link: "https://reactjs.org/",
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
const UserDashboardPage = () => {
  const [list, setList] = useState(cardDetails)

  function handleChangeSelect(value: string) {
    const cloneList = cardDetails
    if (value === "ALL") return setList(cloneList)
    const result = cloneList.filter((item) => item.state === value)
    setList(result)
  }
  return (
    <div className="flex flex-1 mx-auto max-w-[1240px] w-screen flex-col relative gap-6 pt-0 p-4 md:pt-0 sm:p-4 sm:pt-0 xl:p-0">
      <div className="flex">
        <div className="flex-1">
          <Select
            defaultValue="ALL"
            onValueChange={(value) => handleChangeSelect(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md flex">
              Sugerir
            </DialogTrigger>
            <DialogContent className="bg-[#F9D8DF] dark:bg-[#311421]">
              <DialogHeader className="">
                <DialogTitle>
                  <strong className="text-dark dark:text-light ">
                    Sugerir
                  </strong>
                </DialogTitle>
              </DialogHeader>
              <FormAddLibrary card={undefined} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5">
        {list.map((card) => (
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
