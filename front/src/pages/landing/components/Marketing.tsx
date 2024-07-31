import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Typed from 'typed.js';
import { useRef, useEffect } from "react";

const Marketing = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Toda la documentación', 'En un solo lugar'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true, 
      showCursor: false
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex items-center justify-center flex-col p-5">
      <div className={cn(
        "flex items-center justify-center flex-col",
      )}>
        <div className="font-bold text-3xl md:text-6xl bg-gradient-to-r from-main to-tertiary text-light px-6 py-2 rounded-md w-fit" translate="no">
          TechLibrary
        </div>
        <h1 className="font-bold text-3xl mt-3 sm:mx-0 md:text-6xl text-center mb-4" ref={el} style={{ minHeight: '72px', maxHeight: '72px' /* Ajusta esto según el tamaño de tu texto */ }}>
        </h1>
      </div>
      <div className={cn(
        "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
      )}>
        Explora entre las librerías más populares y útiles para tus proyectos, además de herramientas que facilitarán tus tareas diarias.
      </div>
      <div className={cn(
        "text-sm md:text-xl text-neutral-400 max-w-xs md:max-w-2xl text-center",
      )}>
        Con un rápido acceso hacia su documentación oficial.
      </div>
      <Button variant="marketing" className="mt-6" size="lg"
      id="explore"
      aria-label="explore"
      role="button"
      >
        <Link to="/home">
          EXPLORAR TECHLIBRARY
        </Link>
      </Button>
    </div>
  );
}

export default Marketing;
