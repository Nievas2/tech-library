import { useState } from "react"
import { ModeToggle } from "../mode-toggle"
import ItemsNavbar from "./Navbar-components/items"
import { Icon } from "@iconify/react"
import { Link } from "react-router-dom"
import { useAuthContext } from "@/contexts"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Separator } from "../ui/separator"
import { useLogout } from "@/hooks"

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const { logOut } = useLogout();
  const { authUser } = useAuthContext();
  
  return (
    <nav className="fixed w-full top-0 z-20 border-b-[1px] border-b-dark bg-[#F9D8DF] dark:bg-[#311421] dark:border-b-light">

      <div className="mx-auto max-w-7xl p-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <Link
              className="flex flex-shrink-0 items-center gap-1"
              to="/home"
            >
              <Icon
                icon="system-uicons:book"
                width="42"
                height="42"
              />
              <h1 className="text-2xl font-bold hidden sm:block">
                Tech Library
              </h1>
            </Link>

            <div className={`flex-grow items-center flex justify-end gap-6`}>
              <div className="flex items-center justify-center gap-3">
                {authUser ? (
                  <div className="flex items-center justify-center gap-4">
                    <Link
                      to="/favorites"
                    >
                      <Icon className="hover:text-[#E81224] transition-colors duration-150 hover:animate-pulse" icon="tdesign:heart-filled" width="46" height="46" />
                    </Link>

                    <div className="flex gap-4">
                      <Popover>
                        <PopoverTrigger>
                          <div className="rounded-full h-10 w-10 bg-dark dark:bg-light"></div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="p-[5px]">
                            <p>{authUser?.user.email}</p>
                            <p>@{authUser?.user.username}</p>
                          </div>

                          <Separator className="mt-[10px] mx-[5px] mb-[10px]" />

                          <div className="flex flex-col">
                            <Link 
                              className="cursor-pointer p-[5px] flex items-center flex-row gap-2"
                              to="/favorites"
                            >
                              <Icon
                                icon="tdesign:heart-filled"
                                width="24"
                                height="24"
                              />
                              <p>Favorites</p>
                            </Link>

                            <Link 
                              className="cursor-pointer p-[5px] flex items-center flex-row gap-2"
                              to="/user-dashboard"
                            >
                              <Icon
                                icon="icon-park-outline:config"
                                width="24"
                                height="24"
                              />
                              <p>Your Dashboard</p>
                            </Link>

                            {authUser?.user.role === "ADMIN" && (
                              <Link 
                                className="cursor-pointer p-[5px] flex items-center flex-row gap-2"
                                to="/admin-dashboard"
                              >
                                <Icon 
                                  icon="fluent:globe-shield-48-filled"
                                  width="24" 
                                  height="24"  
                                />
                                <p>Admin Dashboard</p>
                              </Link>
                            )}
                          </div>

                          <Separator className="mt-[10px] mx-[5px] mb-[10px]" />

                          <div className="flex flex-col" onClick={logOut}>
                            <button className="cursor-pointer p-[5px] flex items-center flex-row gap-2">
                              <Icon
                                icon="material-symbols:logout"
                                width="24"
                                height="24"
                              />
                              <p>Logout</p>
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <ModeToggle />

                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <ItemsNavbar
                      name="LOGIN"
                      path="/login"
                      key={crypto.randomUUID()}
                    />

                    <ItemsNavbar
                      name="SIGNUP"
                      path="/signup"
                      key={crypto.randomUUID()}
                    />

                    <div className="text-black flex rounded-md text-sm font-medium">
                      <ModeToggle />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
