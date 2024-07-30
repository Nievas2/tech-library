import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <main className="flex flex-col justify-center min-[60vh]">
      <section className="flex flex-col text-center gap-4">
        <div className="flex justify-center items-center gap-4">
          <Icon
            icon="fluent:plug-disconnected-48-regular"
            width="60"
            height="60"
          />
          <h1 className="text-7xl sm:text-9xl">404</h1>
          <Icon
            icon="fluent:plug-disconnected-48-regular"
            width="60"
            height="60"
          />
        </div>

        <h2 className="text-xl font-bold">Página no encontrada</h2>
        
        <div className="w-full sm:w-[410px]">
          <p className="text-center">
            Lo sentimos, no hemos podido encontrar la página que estabas buscando. Puede que haya sido eliminada o nunca haya existido.
          </p>
        </div>

        <div>
          <Button
            id="goHome"
            aria-label="Go Home"
            role="button"
            type="button"
            variant={"directLink"}
          >
            <Link to={"/home"}>Volver a la página principal</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
export default NotFoundPage
