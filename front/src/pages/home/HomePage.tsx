import SideBar from "./components/SideBar"

const HomePage = () => {
  return (
    <>
      <div className="flex flex-row gap-6 flex-wrap w-screen">
        <SideBar />
        <section>
       {/*    <Card />
          <Card />
          <Card />
          <Card />
          <Card /> */}
        </section>
      </div>
    </>
  )
}

export default HomePage