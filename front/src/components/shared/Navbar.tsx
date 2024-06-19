import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import ItemsNavbar from "./Navbar-components/items";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoged] = useState(true);

  return (
    <nav className="fixed w-full top-0 z-20 border-b-[1px] border-b-dark bg-[#F9D8DF] dark:bg-[#311421] dark:border-b-light">
      {/* bg-light dark:bg-dark */}
      {/* px-1 sm:px-3 lg:px-4 */}
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
              {isLoged && (
                <div>
                  {open == true ? (
                    <Icon
                      icon="material-symbols:close"
                      width="26"
                      height="26"
                    />
                  ) : (
                    <Icon icon="material-symbols:menu" width="26" height="26" />
                  )}
                </div>
              )}
            </button>
          </div>
          
          <div className="flex flex-1 items-center justify-start">
            <a className="flex flex-shrink-0 items-center gap-1" href="/home">
              <Icon icon="system-uicons:book" width="42" height="42" />
              <h1 className="text-2xl font-bold hidden sm:block">
                Tech Library
              </h1>
            </a>

            <div className={`flex-grow items-center flex justify-end `}>
              <div className="flex items-center justify-center gap-3">
                {isLoged ? (
                  <section className="flex justify-end mr-8 sm:mr-0">
                    <a
                      href="/favorites"
                      className="text-black rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon icon="raphael:fave" width="46" height="46" />
                    </a>
                    <div className="text-black rounded-md px-3 py-2 text-sm font-medium">
                      <ModeToggle />
                    </div>
                    <div className="flex text-black rounded-md items-center py-2 text-sm font-medium">
                      <button>
                        <Icon
                          icon="material-symbols:logout"
                          className="rounded-md mx-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                          width="36"
                          height="36"
                        />
                      </button>
                    </div>
                  </section>
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

      {isLoged && (
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
  );
};

export default Navbar;
