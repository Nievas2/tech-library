import CardsContainer from "@/components/shared/CardsContainer"
import SideBar from "./components/SideBar"

const HomePage = () => {
  const tagColors = {
    JavaScript: {
      bgColor: "#F7DC6F",
      borderColor: "#F7DC6F"
    },
    Frontend: {
      bgColor: "#3498DB",
      borderColor: "#3498DB"
    },
    UI: {
      bgColor: "#9B59B6",
      borderColor: "#9B59B6"
    },
    Backend: {
      bgColor: "#2E4053",
      borderColor: "#2E4053"
    },
    Server: {
      bgColor: "#8B9467",
      borderColor: "#8B9467"
    },
    "Version Control": {
      bgColor: "#4CAF50",
      borderColor: "#4CAF50"
    },
    Collaboration: {
      bgColor: "#8BC34A",
      borderColor: "#8BC34A"
    },
    Development: {
      bgColor: "#FFC107",
      borderColor: "#FFC107"
    },
    Database: {
      bgColor: "#4CAF50",
      borderColor: "#4CAF50"
    },
    NoSQL: {
      bgColor: "#8BC34A",
      borderColor: "#8BC34A"
    },
    "Data Storage": {
      bgColor: "#FFC107",
      borderColor: "#FFC107"
    },
    Containerization: {
      bgColor: "#2E4053",
      borderColor: "#2E4053"
    },
    DevOps: {
      bgColor: "#8B9467",
      borderColor: "#8B9467"
    },
    Cloud: {
      bgColor: "#4CAF50",
      borderColor: "#4CAF50"
    },
    AI: {
      bgColor: "#2E4053",
      borderColor: "#2E4053"
    },
    "Machine Learning": {
      bgColor: "#8BC34A",
      borderColor: "#8BC34A"
    },
    "Deep Learning": {
      bgColor: "#4CAF50",
      borderColor: "#4CAF50"
    },
    "Computer Vision": {
      bgColor: "#8BC34A",
      borderColor: "#8BC34A"
    },
    "Image Processing": {
      bgColor: "#4CAF50",
      borderColor: "#4CAF50"
    },
    CSS: {
      bgColor: "#2E4053",
      borderColor: "#2E4053"
    },
    Design: {
      bgColor: "#9B59B6",
      borderColor: "#9B59B6"
    }
  }

  const cardsData = [
    {
      title: "React",
      description:
        "Un framework de JavaScript para construir interfaces de usuario",
      tags: ["JavaScript", "Frontend", "UI"],
      createdBy: "John Doe",
      tagColors: tagColors
    },
    {
      title: "Node.js",
      description: "Un entorno de ejecución de JavaScript para servidores",
      tags: ["JavaScript", "Backend", "Server"],
      createdBy: "Jane Smith",
      tagColors: tagColors
    },
    {
      title: "Git",
      description: "Un sistema de control de versiones para proyectos",
      tags: ["Version Control", "Collaboration", "Development"],
      createdBy: "Bob Johnson",
      tagColors: tagColors
    },
    {
      title: "Express.js",
      description: "Un framework de Node.js para crear aplicaciones web",
      tags: ["Node.js", "Web Development", "API"],
      createdBy: "Alice Brown",
      tagColors: tagColors
    },
    {
      title: "MongoDB",
      description:
        "Un sistema de base de datos NoSQL para almacenar y recuperar datos",
      tags: ["Database", "NoSQL", "Data Storage"],
      createdBy: "Mike Davis",
      tagColors: tagColors
    },
    {
      title: "HTML/CSS",
      description:
        "Un lenguaje de marcado y un lenguaje de estilo para crear páginas web",
      tags: ["Web Development", "Frontend", "UI"],
      createdBy: "Emily Chen",
      tagColors: tagColors
    },
    {
      title: "JavaScript",
      description:
        "Un lenguaje de programación para crear aplicaciones web dinámicas",
      tags: ["Programming", "Web Development", "Frontend"],
      createdBy: "David Lee",
      tagColors: tagColors
    },
    {
      title: "Python",
      description:
        "Un lenguaje de programación para crear aplicaciones y scripts",
      tags: ["Programming", "Development", "Scripting"],
      createdBy: "Sarah Taylor",
      tagColors: tagColors
    },
    {
      title: "Java",
      description:
        "Un lenguaje de programación para crear aplicaciones y sistemas",
      tags: ["Programming", "Development", "Enterprise"],
      createdBy: "Kevin White",
      tagColors: tagColors
    },
    {
      title: "Ruby",
      description:
        "Un lenguaje de programación para crear aplicaciones web y scripts",
      tags: ["Programming", "Web Development", "Scripting"],
      createdBy: "Lisa Nguyen",
      tagColors: tagColors
    },
    {
      title: "PHP",
      description:
        "Un lenguaje de programación para crear aplicaciones web dinámicas",
      tags: ["Programming", "Web Development", "Backend"],
      createdBy: "Michael Brown",
      tagColors: tagColors
    },
    {
      title: "SQL",
      description:
        "Un lenguaje de consulta para interactuar con bases de datos",
      tags: ["Database", "Query", "Data Management"],
      createdBy: "James Johnson",
      tagColors: tagColors
    },
    {
      title: "PostgreSQL",
      description:
        "Un sistema de base de datos relacional para almacenar y recuperar datos",
      tags: ["Database", "Relational", "Data Storage"],
      createdBy: "Helen Kim",
      tagColors: tagColors
    },
    {
      title: "MySQL",
      description:
        "Un sistema de base de datos relacional para almacenar y recuperar datos",
      tags: ["Database", "Relational", "Data Storage"],
      createdBy: "Robert Martin",
      tagColors: tagColors
    },
    {
      title: "Redis",
      description:
        "Un sistema de base de datos NoSQL para almacenar y recuperar datos",
      tags: ["Database", "NoSQL", "Data Storage"],
      createdBy: "Karen Thompson"
    },
    {
      title: "Docker",
      description:
        "Un sistema de contenedores para ejecutar aplicaciones de manera aislada",
      tags: ["Containerization", "DevOps", "Cloud"],
      createdBy: "Brian Hall",
      tagColors: tagColors
    },
    {
      title: "Kubernetes",
      description:
        "Un sistema de orquestación de contenedores para gestionar aplicaciones",
      tags: ["Containerization", "DevOps", "Cloud"],
      createdBy: "Laura Lee",
      tagColors: tagColors
    },
    {
      title: "AWS",
      description:
        "Un servicio de nube para almacenar, procesar y almacenar datos",
      tags: ["Cloud", "Infrastructure", "Data Storage"],
      createdBy: "Mark Davis",
      tagColors: tagColors
    },
    {
      title: "Azure",
      description:
        "Un servicio de nube para almacenar, procesar y almacenar datos",
      tags: ["Cloud", "Infrastructure", "Data Storage"],
      createdBy: "Jessica Martin",
      tagColors: tagColors
    },
    {
      title: "Google Cloud",
      description:
        "Un servicio de nube para almacenar, procesar y almacenar datos",
      tags: ["Cloud", "Infrastructure", "Data Storage"],
      createdBy: "Ruth Brown",
      tagColors: tagColors
    },
    {
      title: "TensorFlow",
      description:
        "Un framework de inteligencia artificial para crear modelos de aprendizaje automático",
      tags: ["AI", "Machine Learning", "Deep Learning"],
      createdBy: "John Smith",
      tagColors: tagColors
    },
    {
      title: "Keras",
      description:
        "Un framework de inteligencia artificial para crear modelos de aprendizaje automático",
      tags: ["AI", "Machine Learning", "Deep Learning"],
      createdBy: "Jane Doe",
      tagColors: tagColors
    },
    {
      title: "PyTorch",
      description:
        "Un framework de inteligencia artificial para crear modelos de aprendizaje automático",
      tags: ["AI", "Machine Learning", "Deep Learning"],
      createdBy: "Bob Johnson",
      tagColors: tagColors
    },
    {
      title: "OpenCV",
      description:
        "Un framework de inteligencia artificial para crear aplicaciones de visión computacional",
      tags: ["AI", "Computer Vision", "Image Processing"],
      createdBy: "Alice Brown",
      tagColors: tagColors
    },
    {
      title: "Tailwind CSS",
      description:
        "Un framework de CSS para crear diseños y estilos de interfaz de usuario",
      tags: ["CSS", "UI", "Design"],
      createdBy: "Mike Davis",
      tagColors: tagColors
    },
    {
      title: "Bootstrap",
      description:
        "Un framework de CSS para crear diseños y estilos de interfaz de usuario",
      tags: ["CSS", "UI", "Design"],
      createdBy: "Emily Chen",
      tagColors: tagColors
    },
    {
      title: "Materialize",
      description:
        "Un framework de CSS para crear diseños y estilos de interfaz de usuario",
      tags: ["CSS", "UI", "Design"],
      createdBy: "David Lee",
      tagColors: tagColors
    }
  ]

  return (
    <>
      <section className="flex flex-row gap-8">
        <div className="flex flex-1">
          <SideBar />
        </div>
        <div>
          <h1>search</h1>
          <CardsContainer
            cards={cardsData}
            tagColors={tagColors}
          />
        </div>
      </section>
    </>
  )
}

export default HomePage
