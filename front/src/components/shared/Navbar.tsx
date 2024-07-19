import { ModeToggle } from "../mode-toggle"
import ItemsNavbar from "./Navbar-components/items"
import { Icon } from "@iconify/react"
import { Link, NavLink } from "react-router-dom"
import { useAuthContext } from "@/contexts"
import { useLogout } from "@/hooks"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

const Navbar = () => {
  const { logOut } = useLogout();
  const { authUser } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick  = () => {
    setIsDropdownOpen(false);
  };
  
  return (
    <nav className="fixed w-full top-0 z-20 border-b-[1px] border-b-dark bg-[#F9D8DF] dark:bg-[#311421] dark:border-b-light">

      <div className="mx-auto max-w-7xl p-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <Link
              className="flex flex-shrink-0 items-center gap-1"
              to="/home"
              aria-label="Home"
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
                  <div className="flex items-center justify-center gap-3">
                    <NavLink
                      to="/favorites"
                      className={({ isActive }) =>
                        `${isActive ? 'active-link' : ''}`
                      }
                    >
                      <Icon icon="tdesign:heart-filled" width="48" height="48" />
                    </NavLink>

                    <div className="flex gap-4">
                      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger>
                          <Icon className="h-12 w-12 cursor-pointer" icon="carbon:user-avatar-filled"  />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-[288px] bg-light dark:bg-dark border-dark dark:border-light text-dark dark:text-light">
                          <DropdownMenuLabel>
                            <div className="text-base">
                              <p>{authUser?.user.email}</p>
                              <p>@{authUser?.user.username}</p>
                            </div>
                          </DropdownMenuLabel>

                          <DropdownMenuSeparator className="bg-dark dark:bg-light" />

                          <DropdownMenuGroup>
                            <DropdownMenuItem className="focus:bg-main focus:text-light text-base cursor-pointer">
                              <Link 
                                className="px-[3px] flex items-center flex-row gap-2 w-full"
                                to="/favorites"
                                onClick={handleDropdownClick}
                              >
                                <Icon
                                  icon="tdesign:heart-filled"
                                  width="24"
                                  height="24"
                                />
                                <p>Favorites</p>
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="focus:bg-main focus:text-light text-base cursor-pointer">
                              <Link 
                                className="px-[3px] flex items-center flex-row gap-2 w-full"
                                to="/user-dashboard"
                                onClick={handleDropdownClick}
                              >
                                <Icon
                                  icon="icon-park-outline:config"
                                  width="24"
                                  height="24"
                                />
                                <p>Your Dashboard</p>
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem className="focus:bg-main focus:text-light text-base cursor-pointer">
                              {authUser?.user.role === "ADMIN" && (
                                <Link 
                                  className="px-[3px] flex items-center flex-row gap-2 w-full"
                                  to="/admin-dashboard"
                                  onClick={handleDropdownClick}
                                >
                                  <Icon 
                                    icon="fluent:globe-shield-48-filled"
                                    width="24" 
                                    height="24"  
                                  />
                                  <p>Admin Dashboard</p>
                                </Link>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuGroup>

                          <DropdownMenuSeparator className="bg-dark dark:bg-light" />

                          <DropdownMenuItem className="focus:bg-main focus:text-light text-base cursor-pointer" onClick={logOut}>
                            <button className="px-[3px] flex items-center flex-row gap-2 w-full" onClick={handleDropdownClick}>
                              <Icon
                                icon="material-symbols:logout"
                                width="24"
                                height="24"
                              />
                              <p>Logout</p>
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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