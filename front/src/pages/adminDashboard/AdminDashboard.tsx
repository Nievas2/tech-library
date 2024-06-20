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
import { Library } from "@/interfaces/Library"
import { useState } from "react"
import { Icon } from "@iconify/react/dist/iconify.js"
import AddTag from "./components/AddTag"
import StateCardAdmin from "./components/StateCardAdmin"
const AdminDashboardPage = () => {
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
  const [list, setList] = useState(cardDetails)

  function handleChangeSelect(value: string) {
    const cloneList = cardDetails
    if (value === "ALL") return setList(cloneList)
    const result = cloneList.filter((item) => item.state === value)
    setList(result)
  }
  return (
    <div className="flex flex-1 w-screen flex-col relative max-w-[1240px] gap-4 p-4 xl:p-0">
      <div className="flex flex-wrap py-2 gap-1">
        <div className="flex flex-1 gap-4">
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
          <Dialog>
            <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md flex items-center">
              <Icon
                icon="material-symbols:add"
                width="16"
                height="16"
              />
              Add Tag
            </DialogTrigger>
            <DialogContent className="bg-light dark:bg-dark ">
              <DialogHeader className="">
                <DialogTitle>
                  <strong className="text-dark dark:text-light ">
                    Add tag
                  </strong>
                </DialogTitle>
              </DialogHeader>
              <AddTag />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger className="text-light dark:text-dark bg-dark dark:bg-light p-2 rounded-md flex">
              Sugerir
            </DialogTrigger>
            <DialogContent className="bg-light dark:bg-dark ">
              <DialogHeader className="">
                <DialogTitle>
                  <strong className="text-dark dark:text-light ">
                    Sugerir
                  </strong>
                </DialogTitle>
              </DialogHeader>
              {/* <FormAddLibrary card={undefined} /> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <section className="mx-auto max-w-[1240px] grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5 mt-2">
        {list.map((card) => (
          <StateCardAdmin
            key={crypto.randomUUID()}
            card={card}
          />
        ))}
      </section>
    </div>
  )
}

export default AdminDashboardPage
