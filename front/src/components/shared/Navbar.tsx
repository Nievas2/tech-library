import { ModeToggle } from "../mode-toggle"
import ItemsNavbar from "./Navbar-components/items"
import { Icon } from "@iconify/react"
import { Link, NavLink, useLocation } from "react-router-dom"
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
import { formatGoogleUsername } from "@/utils/formatGoogleUsername"
import cofeeLogo from "../../assets/images/cofeeLogo2.svg"

const Navbar = () => {
  const { logOut } = useLogout();
  const { authUser } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick  = () => {
    setIsDropdownOpen(false);
  };

  const location = useLocation();
  
  return (
    <nav className="sticky w-full top-0 z-50 border-b-[1px] border-b-dark bg-[#F9D8DF] dark:bg-[#311421] dark:border-b-light">
      <div className="mx-auto max-w-7xl p-4 2xl:pl-0">
        <div className="relative flex h-16 items-center gap-10">
          <div className="flex items-center justify-between w-full">
            <Link
              className="flex flex-shrink-0 items-center justify-center gap-3"
              to="/home"
              aria-label="Home"
            >
              <img 
                className="w-16 h-16" 
                src={cofeeLogo} 
                alt="Techlibrary logo" 
              />

              <h1 className="text-2xl font-bold hidden leading-none md:block mt-5" translate="no">
                Tech Library
              </h1>
            </Link>

            <div className={`items-center flex justify-end gap-6`}>
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
                              <p>@{formatGoogleUsername(authUser?.user.username)}</p>
                            </div>
                          </DropdownMenuLabel>

                          <DropdownMenuSeparator className="bg-dark dark:bg-light" />

                          <DropdownMenuGroup className="flex gap-2 flex-col">
                            <Link
                              className="px-[3px] w-full"
                              to="/favorites"
                              onClick={handleDropdownClick}
                            >
                              <DropdownMenuItem 
                                className={`text-base w-full cursor-pointer ${location.pathname === '/favorites' ? 'bg-main text-light' : 'focus:bg-[#F84F9A] focus:dark:bg-[#C9216D] focus:text-light'}`}
                              >
                                <Icon
                                  icon="tdesign:heart-filled"
                                  width="24"
                                  height="24"
                                />
                                <p>Favoritos</p>
                              </DropdownMenuItem>
                            </Link>

                            <Link
                              className="px-[3px] w-full"
                              to="/user-dashboard"
                              onClick={handleDropdownClick}
                            >
                              <DropdownMenuItem 
                                className={`text-base cursor-pointer ${location.pathname === '/user-dashboard' ? 'bg-main text-light' : 'focus:bg-[#F84F9A] focus:dark:bg-[#C9216D] focus:text-light'}`}
                              >
                                <Icon
                                  icon="icon-park-outline:config"
                                  width="24"
                                  height="24"
                                />
                                <p>Panel de usuario</p>
                              </DropdownMenuItem>
                            </Link>

                            {authUser?.user.role === "ADMIN" && (
                              <Link
                                className="px-[3px] w-full"
                                to="/admin-dashboard"
                                onClick={handleDropdownClick}
                              >
                                <DropdownMenuItem 
                                  className={`text-base cursor-pointer ${location.pathname === '/admin-dashboard' ? 'bg-main text-light' : 'focus:bg-[#F84F9A] focus:dark:bg-[#C9216D] focus:text-light'}`}
                                >
                                  <Icon 
                                    icon="fluent:globe-shield-48-filled"
                                    width="24" 
                                    height="24"  
                                  />
                                  <p>Panel de administrador</p>
                                </DropdownMenuItem>
                              </Link>
                            )}
                          </DropdownMenuGroup>

                          <DropdownMenuSeparator className="bg-dark dark:bg-light" />

                          <DropdownMenuItem className="focus:bg-[#ff284cbf] focus:dark:bg-[#ff284cbf] focus:text-light text-base cursor-pointer" onClick={logOut}>
                            <button className="px-[3px] flex items-center flex-row gap-2 w-full" onClick={handleDropdownClick}>
                              <Icon
                                icon="material-symbols:logout"
                                width="24"
                                height="24"
                              />
                              <p>Cerrar sesión</p>
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <ModeToggle />

                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="hidden md:flex md:gap-3">
                      <ItemsNavbar
                        name="INICIAR SESION"
                        path="/login"
                        key={crypto.randomUUID()}
                      />

                      <ItemsNavbar
                        name="REGISTRARSE"
                        path="/signup"
                        key={crypto.randomUUID()}
                      />
                    </div>

                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                      <DropdownMenuTrigger>
                        <Icon icon="ph:user-list" className="h-[50px] w-auto md:hidden mr-1.5 mt-[2px]" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-[190px] bg-light dark:bg-dark border-dark dark:border-light text-dark dark:text-light">
                        <DropdownMenuGroup className="flex gap-2 flex-col mx-auto w-fit">
                          <Link
                            to="/login"
                            className="px-4 py-2 h-10 text-base font-bold bg-main text-light text-center rounded-md"
                            onClick={handleDropdownClick}
                          >
                            INICIAR SESIÓN
                          </Link>

                          <Link
                            to="/signup"
                            className="px-4 py-2 h-10 text-base font-bold bg-main text-light text-center rounded-md"
                            onClick={handleDropdownClick}
                          >
                            REGISTRARSE
                          </Link>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <ModeToggle />
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