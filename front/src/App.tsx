import Footer from "./components/shared/Footer"
import Navbar from "./components/shared/Navbar"
function App() {
  return (
    <main className="bg-light dark:bg-dark">
      <Navbar />
      <section className="h-[100vh] w-full">
        <h1 className="text-3xl font-bold underline ">Hello world!</h1>
        <h1 className="text-main font-extrabold text-4xl">text</h1>
        <h1 className="text-auxiliary font-bold text-4xl">text</h1>
        <h1 className="text-tertiary font-light text-4xl">text</h1>
      </section>
      <Footer />
    </main>
      
  )
}

export default App
