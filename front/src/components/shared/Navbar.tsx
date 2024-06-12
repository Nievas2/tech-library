import { useState } from "react"
import { ModeToggle } from "../mode-toggle"
import ItemsNavbar from "./Navbar-components/items"
import { Icon } from "@iconify/react"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [isLoged, setIsLoged] = useState(true)
  return (
    <div>
      <main className="h-full w-full overflow-x-scroll-hidden">
        <nav className="sticky top-0 z-20 border-b-[1px] border-b-dark bg-light dark:bg-dark dark:border-b-light ">
          <div className="mx-auto max-w-7xl px-1 sm:px-3 lg:px-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center rounded-md p-2 bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => setOpen(!open)}
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  {isLoged && (
                    <svg
                      className="block h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      style={{ display: open ? "block" : "hidden" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}

                  {/*  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    style={{ display: open ? "block" : "hidden" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg> */}
                </button>
              </div>
              <div className="flex flex-1 items-center justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* lOGO Y TITULO */}
                  <button onClick={() => setIsLoged(!isLoged)}>test</button>
                </div>
                <div
                  className={`flex-grow items-center sm:ml-6 flex justify-end `}
                >
                  <div className="flex items-center gap-3">
                    {isLoged ? (
                      <section className="flex justify-end mr-8 sm:mr-0">
                        <a
                          href="/favorites"
                          className="text-black rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                        >
                          <Icon
                            icon="raphael:fave"
                            width="46"
                            height="46"
                          />
                        </a>
                        <div className="text-black rounded-md px-3 py-2 text-sm font-medium">
                          <ModeToggle />
                        </div>
                        <div className="flex text-black rounded-md items-center py-2 text-sm font-medium">
                          <Icon
                            icon="material-symbols:logout"
                            className="rounded-md mx-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                            width="36"
                            height="36"
                          />
                        </div>
                      </section>
                    ) : (
                      <div className="flex items-center gap-3">
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

                        <div className="text-black rounded-md px-3 py-2 text-sm font-medium">
                          <ModeToggle />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Agregar que si no hay token, no aparezca */}
          {isLoged && (
            <div
              className={`relative m-0 p-0 bg-transparent top-0 z-10`}
              id="mobile-menu"
            >
              <div
                className={`h-[100vh] w-[70%] fixed top-[64px] duration-300 right-[-20%] ${
                  !open ? "translate-x-[100%]" : ""
                } border-l-[1px] border-l-dark bg-light dark:bg-dark dark:border-l-light  `}
              >
                <div className="flex flex-col px-2 pb-3 pt-2 gap-10">
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
                  <div className="flex flex-1 justify-self-end">
                    <h4>asdsss</h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </main>
    </div>
  )
}

export default Navbar
