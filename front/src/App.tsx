import Navbar from "./components/shared/Navbar"
function App() {
  return (
    <main className="bg-light dark:bg-dark">
      <Navbar />
      <section className="h-[100vh] w-full">
        <h1 className="text-3xl font-bold underline ">Hello world!</h1>
      </section>
      
    </main>
      
  )
}

export default App
