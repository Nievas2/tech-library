import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Marketing = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Toda la documentación", "En un solo lugar"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex items-center justify-center flex-col p-5">
      <div className={cn("flex items-center justify-center flex-col")}>
        <motion.div
          className="font-bold text-3xl md:text-6xl bg-gradient-to-r from-main to-tertiary text-light px-6 py-2 rounded-md w-fit"
          translate="no"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, transition: { duration: 0.35 }, y: 0 }}
        >
          TechLibrary
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, transition: { duration: 0.35 }, y: 0 }}
          className="font-bold text-3xl mt-3 sm:mx-0 md:text-6xl text-center"
          ref={el}
          style={{
            minHeight: "72px",
            maxHeight: "72px"
          }}
        ></motion.h1>
      </div>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35 }, x: 0 }}
        className={cn(
          "text-sm font-semibold md:text-xl mt-4 max-w-xs md:max-w-2xl text-center mx-auto"
        )}
      >
        Explora entre las librerías más populares y útiles para tus proyectos,
        además de herramientas que facilitarán tus tareas diarias.
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35 }, x: 0 }}
        className={cn(
          "text-sm font-semibold md:text-xl text-neutral-400 max-w-xs md:max-w-2xl text-center"
        )}
      >
        Con un rápido acceso hacia su documentación oficial.
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: +100 }}
        animate={{ opacity: 1, transition: { duration: 0.35 }, y: 0 }}
      >
        <Button
          variant="marketing"
          className="mt-6 text-base md:text-lg"
          size="lg"
          id="explore"
          aria-label="explore"
          role="button"
        >
          <Link to="/home?currentPage=1&search=&tags=">EXPLORAR TECHLIBRARY</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default Marketing;
