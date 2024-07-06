// import { useEffect, useState } from "react"
import { useState } from "react"
import { ModeToggle } from "../mode-toggle"
import ItemsNavbar from "./Navbar-components/items"
import { Icon } from "@iconify/react"
// import { useTokenStore } from "@/stores/user.store"
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
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-light"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setOpen(!open)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {authUser && (
                <div>
                  {open == true ? (
                    <Icon
                      icon="material-symbols:close"
                      width="26"
                      height="26"
                    />
                  ) : (
                    <Icon
                      icon="material-symbols:menu"
                      width="26"
                      height="26"
                    />
                  )}
                </div>
              )}
            </button>
          </div>

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
                      <Icon icon="tdesign:heart-filled" width="40" height="40" />
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

                      {/* <div className="flex justify-center items-center">
                        <div className="rounded-full h-10 w-10 bg-dark dark:bg-light"></div>
                      </div> */}
                      {/* <div>
                        <p>{authUser?.user.email}</p>
                        <p>{authUser?.user.username}</p>
                      </div> */}
                    </div>

                    <ModeToggle />

                    {/* <div className="flex text-black rounded-md items-center text-sm font-medium">
                      <button 
                        onClick={() => logOut()}
                      >
                        <Icon
                          icon="material-symbols:logout"
                          width="36"
                          height="36"
                        />
                      </button>
                    </div> */}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <div>
                      <ItemsNavbar
                        name="LOGIN"
                        path="/login"
                        key={crypto.randomUUID()}
                      />
                    </div>

                    <div>
                      <ItemsNavbar
                        name="SIGNUP"
                        path="/signup"
                        key={crypto.randomUUID()}
                      />
                    </div>

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

      {authUser && (
        <div
          className={`relative m-0 p-0 bg-transparent top-0 z-10`}
          id="mobile-menu"
        >
          <div
            className={`h-[90vh] w-[50%] fixed top-[64px] duration-300 right-[0%] ${
              !open ? "translate-x-[100%]" : ""
            } border-l-[1px] border-l-dark bg-light dark:bg-dark dark:border-l-light  `}
          >
            <div className="flex flex-col px-2 pb-3 pt-2 gap-10 h-full">
              <h2 className="text-center text-2xl">Tech Library</h2>

              <div>
                <ItemsNavbar
                  name="DASHBOARD"
                  path="/dashboard"
                  key={crypto.randomUUID()}
                />
              </div>

              <div>
                <ItemsNavbar
                  name="FAVORITES"
                  path="/favorites"
                  key={crypto.randomUUID()}
                />
              </div>

              <section className="flex flex-row flex-1 items-end">
                <div className="basis-1/4 flex justify-center items-center py-2 h-20">
                  <div className="rounded-full h-10 w-10 bg-dark dark:bg-light"></div>
                </div>

                <div className="basis-3/4 flex flex-col justify-center items-start text-left py-2 h-20">
                  <h5>ejemplo@gmail.com</h5>
                  <button>LOGOUT</button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
