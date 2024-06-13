import { Link, Heart } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"

const Card = () => {
  const [favorite, setFavorite] = useState(false)

  return (
    // w-72 sm:w-80
    <div className="flex flex-col border-2 rounded-md shadow-xl hover:scale-[1.03] hover:transition-transform duration-500 p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-[19px]">Titulo del Libro</h2>
        <h3 className="max-h-12 text-ellipsis">
          Una descripción breve a cerca de lo que trata el libro
        </h3>
        <div className="flex flex-row flex-wrap gap-2">
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
          <h4 className="border px-3 py-1 rounded-lg">Tag</h4>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <Button className="flex-grow flex flex-row gap-2 justify-center items-center cursor-pointer">
            <Link />
            <p>Direct Link</p>
          </Button>

          <div onClick={() => setFavorite(!favorite)}>
            {favorite ? (
              <div className="mx-auto flex justify-center items-center cursor-pointer border px-4 py-2 rounded-lg">
                <Heart className="text-[#E81224]" fill="#E81224" />
              </div>
            ) : (
              <div className="mx-auto flex justify-center items-center cursor-pointer border px-4 py-2 rounded-lg">
                <Heart className="dark:text-[#fff]" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          <small>Created By @Random</small>
          <small>|</small>
          <small>02-08-1999</small>
        </div>
      </div>
    </div>
  )
}

export default Card