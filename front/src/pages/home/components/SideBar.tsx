import { Icon } from "@iconify/react/dist/iconify.js"
import ItemsSideBar from "./ItemsSideBar"

export default function SideBar() {

  return (
    <section className="h-full w-5/12 absolute left-0 top-0 bg-light dark:bg-dark">
      <div className="w-full h-[100vh] relative p-2 border-r-[1px] border-r-dark dark:border-r-light">
        <div className="absolute right-[-22px] top-1 bg-dark dark:bg-light rounded-full ">
          {/* <Icon
            icon="mingcute:right-fill"
            width="36"
            height="36"
            color="#f72585"
          /> */}
          <Icon
            icon="mingcute:left-fill"
            width="36"
            height="36"
            color="#f72585"
          />
        </div>
        <ul>
          <ItemsSideBar name="javascript" active={true} />
          <ItemsSideBar name="java" active={false} />
        </ul>
      </div>
    </section>
  )
}
