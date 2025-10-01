import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Entrada({ visible, monto = 65000 }) {
  if (!visible) return (
    <motion.section
      className="mt-8 mx-auto max-w-xl rounded-2xl py-2 text-center "
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className=" flex flex-row justify-center mb-5">
        <h3 className="text-2xl font-semibold pr-5">El REGALO</h3>
        <Heart size={32} className="animate-pulse" />
      </div>
      <div className="space-y-8">
        
        <p className="text-almost-black leading-relaxed text-lg  px-5">
          Tu presencia es el mejor regalo, pero si de todos modos queres colaborar con nuestra luna de miel
          te invitamos a hacerlo al alias que dejamos a continuacion.
        </p>
        <div className="">
          <p className="font-mono">
            Alias:{" "}
            <b className="font-bold" id="textoACopiar">
              lafiestademivida
            </b>
          </p>
          <button
            onClick={copiarAlPortapapeles}
            className="mt-2 font-semibold inline-block  px-5 py-3 bg-light-red text-almost-white rounded-full shadow-md hover:bg-dark-beige transition mb-5"
          >
            Copiar Alias
          </button>
        </div>
      </div>
    </motion.section>
  );
  function copiarAlPortapapeles() {
    const texto = document.getElementById("textoACopiar").innerText;
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 3000); // Oculta el mensaje después de 3s
      })
      .catch((err) => console.error("Error al copiar: ", err));
  }
  return (
    <motion.section
      className="mt-8 mx-auto max-w-xl rounded-2xl py-2 text-center "
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className=" flex flex-row justify-center mb-5">
        <h3 className="text-2xl font-semibold pr-5">El REGALO</h3>
        <Heart size={32} className="animate-pulse" />
      </div>
      <div className="space-y-4">
        <p className="text-almost-black leading-relaxed text-lg  px-5">
          Tu presencia es el mejor regalo, por lo que para celebrar con vos,
          te proponemos ayudarnos con una parte del costo de tu tarjeta con un aporte de{" "}
          <span className="font-bold text-light-red">
            ${monto.toLocaleString("es-AR")}
          </span>{" "}
          por persona al siguiente alias.
        </p>
        <div className="">
          <p className="font-mono">
            Alias:{" "}
            <b className="font-bold" id="textoACopiar">
              lafiestademivida
            </b>
          </p>
          <button
            onClick={copiarAlPortapapeles}
            className="mt-2 font-semibold inline-block  px-5 py-3 bg-light-red text-almost-white rounded-full shadow-md hover:bg-dark-beige transition mb-5"
          >
            Copiar Alias
          </button>
        </div>
        <p className="text-almost-black leading-relaxed text-lg  px-5">
          Y, si queres ayudarnos con nuestra luna de miel, sos libre de colaborar con otro monto al mismo alias.<br/>
          <span  className="font-bold text-light-red">¡Muchas gracias!</span>
        </p>
        
      </div>
    </motion.section>
  );
}
