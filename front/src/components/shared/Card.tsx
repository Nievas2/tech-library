import { Link, Heart } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"

const Card = ({ card, tagColors  }: any) => {
  const [favorite, setFavorite] = useState(false)

  return (
    <div className="flex flex-col justify-between gap-6 border border-dark dark:border-[#fff] rounded-md shadow-xl hover:scale-[1.03] hover:transition-transform duration-500 p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          {card.title}
        </h2>

        <p className="text-base">
          {card.description}
        </p>

        <div className="flex flex-row flex-wrap gap-2 text-sm">
          {card.tags.map((tag: any) => {
            const tagColor = tagColors[tag] || { bgColor: '#ffffff45', borderColor: '#000000' }; // Default colors if tag not found
            return (
              <h4
                key={tag}
                style={{ backgroundColor: tagColor.bgColor, borderColor: tagColor.borderColor }}
                // className="px-2 py-1 rounded-lg border font-extrabold text-dark [text-shadow:_1px_1px_0px_rgb(255_255_255_/_100%)] dark:text-light dark:[text-shadow:_1px_1px_0_rgb(0_0_0_/_100%)]">
                className="px-2 py-1 rounded-lg border font-extrabold text-stroke-dark dark:text-stroke-light"> 
                {tag}
              </h4>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-center items-center">
          <Button variant="directLink" className="flex-grow flex flex-row gap-2 justify-center items-center cursor-pointer">
            <Link className="text-light" />
            <p className="text-light">Direct Link</p>
          </Button>

          <div onClick={() => setFavorite(!favorite)}>
            {favorite ? (
              <div className="animate-fade-in-scale mx-auto flex justify-center items-center cursor-pointer border border-[#E81224] px-4 py-2 rounded-lg bg-[#E81224]/35">
                <Heart className="text-[#E81224]" fill="#E81224" />
              </div>
            ) : (
              <div className="mx-auto flex justify-center items-center cursor-pointer border border-dark dark:border-[#fff] px-4 py-2 rounded-lg hover:bg-[#E81224]/20  transition-colors duration-300">
                <Heart className="dark:text-[#fff]" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          <small>Suggested by <span className="font-semibold text-main">{card.createdBy}</span></small>
          <small>|</small>
          <small>02-08-1999</small>
        </div>
      </div>
    </div>
  )
}

export default Card