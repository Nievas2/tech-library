import { Library } from "@/interfaces/Library"
import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer";

interface LibraryState {
  // libraries             : Library[];
  favorites             : Library[];
  addFavoriteLibrary    : (library: Library) => void;
  deleteFavoriteLibrary : (libraryId: number) => void;
}

const storeApi: StateCreator<LibraryState, [["zustand/immer", never]]> = (set) => ({
  // libraries: [
  //   {
  //     id: 1,
  //     name: "React",
  //     description:
  //       "Un framework de JavaScript para construir interfaces de usuario",
  //     tags: [
  //       {
  //         id: 1,
  //         name: "JavaScript",
  //         color: "#F7DC6F",
  //         borderColor: "#F7DC6F"
  //       },
  //       {
  //         id: 2,
  //         name: "Frontend",
  //         color: "#3498DB",
  //         borderColor: "#3498DB"
  //       },
  //       { id: 3, name: "UI", color: "#9B59B6", borderColor: "#9B59B6" }
  //     ],
  //     likes: 1,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 1,
  //       name: "John",
  //       lastname: "Doe",
  //       username: "johndoe",
  //       password: "password123",
  //       email: "johndoe@me.com"
  //     },
  //     link: "https://example.com/react"
  //   },
  //   {
  //     id: 2,
  //     name: "Node.js",
  //     description:
  //       "Un entorno de ejecución de JavaScript para servidores",
  //     tags: [
  //       {
  //         id: 4,
  //         name: "JavaScript",
  //         color: "#F7DC6F",
  //         borderColor: "#F7DC6F"
  //       },
  //       {
  //         id: 5,
  //         name: "Backend",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 6,
  //         name: "Server",
  //         color: "#8B9467",
  //         borderColor: "#8B9467"
  //       }
  //     ],
  //     likes: 2,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 2,
  //       name: "Jane",
  //       lastname: "Smith",
  //       username: "janesmith",
  //       password: "password123",
  //       email: "janesmith@me.com"
  //     },
  //     link: "https://example.com/nodejs"
  //   },
  //   {
  //     id: 3,
  //     name: "Git",
  //     description: "Un sistema de control de versiones para proyectos",
  //     tags: [
  //       {
  //         id: 7,
  //         name: "Version Control",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       },
  //       {
  //         id: 8,
  //         name: "Collaboration",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 9,
  //         name: "Development",
  //         color: "#FFC107",
  //         borderColor: "#FFC107"
  //       }
  //     ],
  //     likes: 3,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 3,
  //       name: "Bob",
  //       lastname: "Johnson",
  //       username: "bobjohnson",
  //       password: "password123",
  //       email: "bobjohnson@me.com"
  //     },
  //     link: "https://example.com/git"
  //   },
  //   {
  //     id: 4,
  //     name: "Express.js",
  //     description: "Un framework de Node.js para crear aplicaciones web",
  //     tags: [
  //       {
  //         id: 10,
  //         name: "Node.js",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 11,
  //         name: "Web Development",
  //         color: "#8B9467",
  //         borderColor: "#8B9467"
  //       },
  //       {
  //         id: 12,
  //         name: "API",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 4,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 4,
  //       name: "Alice",
  //       lastname: "Brown",
  //       username: "alicebrown",
  //       password: "password123",
  //       email: "alicebrown@me.com"
  //     },
  //     link: "https://example.com/expressjs"
  //   },
  //   {
  //     id: 5,
  //     name: "MongoDB",
  //     description:
  //       "Un sistema de base de datos NoSQL para almacenar y recuperar datos",
  //     tags: [
  //       {
  //         id: 13,
  //         name: "Database",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       },
  //       {
  //         id: 14,
  //         name: "NoSQL",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 15,
  //         name: "Data Storage",
  //         color: "#FFC107",
  //         borderColor: "#FFC107"
  //       }
  //     ],
  //     likes: 5,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 5,
  //       name: "Mike",
  //       lastname: "Davis",
  //       username: "mikedavis",
  //       password: "password123",
  //       email: "mikedavis@me.com"
  //     },
  //     link: "https://example.com/mongodb"
  //   },
  //   {
  //     id: 6,
  //     name: "HTML/CSS",
  //     description:
  //       "Un lenguaje de marcado y un lenguaje de estilo para crear páginas web",
  //     tags: [
  //       {
  //         id: 16,
  //         name: "Web Development",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 17,
  //         name: "Frontend",
  //         color: "#3498DB",
  //         borderColor: "#3498DB"
  //       },
  //       { id: 18, name: "UI", color: "#9B59B6", borderColor: "#9B59B6" }
  //     ],
  //     likes: 6,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 6,
  //       name: "Emily",
  //       lastname: "Chen",
  //       username: "emilychen",
  //       password: "password123",
  //       email: "emilychen@me.com"
  //     },
  //     link: "https://example.com/htmlcss"
  //   },
  //   {
  //     id: 7,
  //     name: "JavaScript",
  //     description:
  //       "Un lenguaje de programación para crear aplicaciones web dinámicas",
  //     tags: [
  //       {
  //         id: 19,
  //         name: "Programming",
  //         color: "#F7DC6F",
  //         borderColor: "#F7DC6F"
  //       },
  //       {
  //         id: 20,
  //         name: "Web Development",
  //         color: "#8B9467",
  //         borderColor: "#8B9467"
  //       },
  //       {
  //         id: 21,
  //         name: "Frontend",
  //         color: "#3498DB",
  //         borderColor: "#3498DB"
  //       }
  //     ],
  //     likes: 7,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 7,
  //       name: "David",
  //       lastname: "Lee",
  //       username: "davidlee",
  //       password: "password123",
  //       email: "davidlee@me.com"
  //     },
  //     link: "https://example.com/javascript"
  //   },
  //   {
  //     id: 8,
  //     name: "Python",
  //     description:
  //       "Un lenguaje de programación para crear aplicaciones y scripts",
  //     tags: [
  //       {
  //         id: 22,
  //         name: "Programming",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       },
  //       {
  //         id: 23,
  //         name: "Development",
  //         color: "#FFC107",
  //         borderColor: "#FFC107"
  //       },
  //       {
  //         id: 24,
  //         name: "Scripting",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       }
  //     ],
  //     likes: 8,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 8,
  //       name: "Sarah",
  //       lastname: "Taylor",
  //       username: "sarahtaylor",
  //       password: "password123",
  //       email: "sarahtaylor@me.com"
  //     },
  //     link: "https://example.com/python"
  //   },
  //   {
  //     id: 9,
  //     name: "Java",
  //     description:
  //       "Un lenguaje de programación para crear aplicaciones y sistemas",
  //     tags: [
  //       {
  //         id: 25,
  //         name: "Programming",
  //         color: "#F7DC6F",
  //         borderColor: "#F7DC6F"
  //       },
  //       {
  //         id: 26,
  //         name: "Development",
  //         color: "#FFC107",
  //         borderColor: "#FFC107"
  //       },
  //       {
  //         id: 27,
  //         name: "Enterprise",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 9,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 9,
  //       name: "Kevin",
  //       lastname: "White",
  //       username: "kevinwhite",
  //       password: "password123",
  //       email: "kevinwhite@me.com"
  //     },
  //     link: "https://example.com/java"
  //   },
  //   {
  //     id: 10,
  //     name: "Ruby",
  //     description:
  //       "Un lenguaje de programación para crear aplicaciones web y scripts",
  //     tags: [
  //       {
  //         id: 28,
  //         name: "Programming",
  //         color: "#F7DC6F",
  //         borderColor: "#F7DC6F"
  //       },
  //       {
  //         id: 29,
  //         name: "Web Development",
  //         color: "#8B9467",
  //         borderColor: "#8B9467"
  //       },
  //       {
  //         id: 30,
  //         name: "Scripting",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       }
  //     ],
  //     likes: 10,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 10,
  //       name: "Anna",
  //       lastname: "Green",
  //       username: "annagreen",
  //       password: "password123",
  //       email: "annagreen@me.com"
  //     },
  //     link: "https://example.com/ruby"
  //   },
  //   {
  //     id: 11,
  //     name: "PHP",
  //     description:
  //       "Un lenguaje de programación para crear aplicaciones web dinámicas",
  //     tags: [
  //       {
  //         id: 31,
  //         name: "Programming",
  //         color: "#F7DC6F",
  //         borderColor: "#F7DC6F"
  //       },
  //       {
  //         id: 32,
  //         name: "Web Development",
  //         color: "#8B9467",
  //         borderColor: "#8B9467"
  //       },
  //       {
  //         id: 33,
  //         name: "Backend",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       }
  //     ],
  //     likes: 11,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 11,
  //       name: "Paul",
  //       lastname: "Martinez",
  //       username: "paulmartinez",
  //       password: "password123",
  //       email: "paulmartinez@me.com"
  //     },
  //     link: "https://example.com/php"
  //   },
  //   {
  //     id: 12,
  //     name: "AWS",
  //     description:
  //       "Un servicio de nube para almacenar, procesar y almacenar datos",
  //     tags: [
  //       {
  //         id: 34,
  //         name: "Cloud",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       },
  //       {
  //         id: 35,
  //         name: "Infrastructure",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 36,
  //         name: "Data Storage",
  //         color: "#FFC107",
  //         borderColor: "#FFC107"
  //       }
  //     ],
  //     likes: 12,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 12,
  //       name: "Mark",
  //       lastname: "Davis",
  //       username: "markdavis",
  //       password: "password123",
  //       email: "markdavis@me.com"
  //     },
  //     link: "https://example.com/aws"
  //   },
  //   {
  //     id: 13,
  //     name: "Azure",
  //     description:
  //       "Un servicio de nube para almacenar, procesar y almacenar datos",
  //     tags: [
  //       {
  //         id: 37,
  //         name: "Cloud",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       },
  //       {
  //         id: 38,
  //         name: "Infrastructure",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 39,
  //         name: "Data Storage",
  //         color: "#FFC107",
  //         borderColor: "#FFC107"
  //       }
  //     ],
  //     likes: 13,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 13,
  //       name: "Jessica",
  //       lastname: "Martin",
  //       username: "jessicamartin",
  //       password: "password123",
  //       email: "jessicamartin@me.com"
  //     },
  //     link: "https://example.com/azure"
  //   },
  //   {
  //     id: 14,
  //     name: "Google Cloud",
  //     description:
  //       "Un servicio de nube para almacenar, procesar y almacenar datos",
  //     tags: [
  //       {
  //         id: 40,
  //         name: "Cloud",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       },
  //       {
  //         id: 41,
  //         name: "Infrastructure",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 42,
  //         name: "Data Storage",
  //         color: "#FFC107",
  //         borderColor: "#FFC107"
  //       }
  //     ],
  //     likes: 14,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 14,
  //       name: "Ruth",
  //       lastname: "Brown",
  //       username: "ruthbrown",
  //       password: "password123",
  //       email: "ruthbrown@me.com"
  //     },
  //     link: "https://example.com/googlecloud"
  //   },
  //   {
  //     id: 15,
  //     name: "TensorFlow",
  //     description:
  //       "Un framework de inteligencia artificial para crear modelos de aprendizaje automático",
  //     tags: [
  //       {
  //         id: 43,
  //         name: "AI",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 44,
  //         name: "Machine Learning",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 45,
  //         name: "Deep Learning",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 15,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 15,
  //       name: "John",
  //       lastname: "Smith",
  //       username: "johnsmith",
  //       password: "password123",
  //       email: "johnsmith@me.com"
  //     },
  //     link: "https://example.com/tensorflow"
  //   },
  //   {
  //     id: 16,
  //     name: "Keras",
  //     description:
  //       "Un framework de inteligencia artificial para crear modelos de aprendizaje automático",
  //     tags: [
  //       {
  //         id: 46,
  //         name: "AI",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 47,
  //         name: "Machine Learning",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 48,
  //         name: "Deep Learning",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 16,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 16,
  //       name: "Jane",
  //       lastname: "Doe",
  //       username: "janedoe",
  //       password: "password123",
  //       email: "janedoe@me.com"
  //     },
  //     link: "https://example.com/keras"
  //   },
  //   {
  //     id: 17,
  //     name: "PyTorch",
  //     description:
  //       "Un framework de inteligencia artificial para crear modelos de aprendizaje automático",
  //     tags: [
  //       {
  //         id: 49,
  //         name: "AI",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 50,
  //         name: "Machine Learning",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 51,
  //         name: "Deep Learning",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 17,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 17,
  //       name: "Bob",
  //       lastname: "Johnson",
  //       username: "bobjohnson",
  //       password: "password123",
  //       email: "bobjohnson@me.com"
  //     },
  //     link: "https://example.com/pytorch"
  //   },
  //   {
  //     id: 18,
  //     name: "OpenCV",
  //     description:
  //       "Un framework de inteligencia artificial para crear aplicaciones de visión computacional",
  //     tags: [
  //       {
  //         id: 52,
  //         name: "AI",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 53,
  //         name: "Computer Vision",
  //         color: "#8BC34A",
  //         borderColor: "#8BC34A"
  //       },
  //       {
  //         id: 54,
  //         name: "Image Processing",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 18,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 18,
  //       name: "Alice",
  //       lastname: "Brown",
  //       username: "alicebrown",
  //       password: "password123",
  //       email: "alicebrown@me.com"
  //     },
  //     link: "https://example.com/opencv"
  //   },
  //   {
  //     id: 19,
  //     name: "Tailwind CSS",
  //     description:
  //       "Un framework de CSS para crear diseños y estilos de interfaz de usuario",
  //     tags: [
  //       {
  //         id: 55,
  //         name: "CSS",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 56,
  //         name: "UI",
  //         color: "#9B59B6",
  //         borderColor: "#9B59B6"
  //       },
  //       {
  //         id: 57,
  //         name: "Design",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 19,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 19,
  //       name: "Sarah",
  //       lastname: "Wilson",
  //       username: "sarahwilson",
  //       password: "password123",
  //       email: "sarahwilson@me.com"
  //     },
  //     link: "https://example.com/tailwindcss"
  //   },
  //   {
  //     id: 20,
  //     name: "Bootstrap",
  //     description:
  //       "Un framework de CSS para crear diseños y estilos de interfaz de usuario",
  //     tags: [
  //       {
  //         id: 58,
  //         name: "CSS",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 59,
  //         name: "UI",
  //         color: "#9B59B6",
  //         borderColor: "#9B59B6"
  //       },
  //       {
  //         id: 60,
  //         name: "Design",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 20,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 20,
  //       name: "David",
  //       lastname: "Lee",
  //       username: "davidlee",
  //       password: "password123",
  //       email: "davidlee@me.com"
  //     },
  //     link: "https://example.com/bootstrap"
  //   },
  //   {
  //     id: 21,
  //     name: "Materialize",
  //     description:
  //       "Un framework de CSS para crear diseños y estilos de interfaz de usuario",
  //     tags: [
  //       {
  //         id: 61,
  //         name: "CSS",
  //         color: "#2E4053",
  //         borderColor: "#2E4053"
  //       },
  //       {
  //         id: 62,
  //         name: "UI",
  //         color: "#9B59B6",
  //         borderColor: "#9B59B6"
  //       },
  //       {
  //         id: 63,
  //         name: "Design",
  //         color: "#4CAF50",
  //         borderColor: "#4CAF50"
  //       }
  //     ],
  //     likes: 21,
  //     isActive: true,
  //     state: "ACTIVE",
  //     createdBy: {
  //       id: 21,
  //       name: "Emily",
  //       lastname: "Kim",
  //       username: "emilykim",
  //       password: "password123",
  //       email: "emilykim@me.com"
  //     },
  //     link: "https://example.com/materialize"
  //   }
  // ],

  favorites: [],

  addFavoriteLibrary: (library: Library) => {
    set((state) => {
      state.favorites.push(library);
    });
  },
  
  deleteFavoriteLibrary: (libraryId: number) => {
    set((state) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== libraryId);
    });
  },
})

export const useLibraryStore = create<LibraryState>()(
  persist(
    immer(storeApi),
    {
      name: "library-storage",
    }
  )
)