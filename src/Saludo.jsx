import { motion } from "framer-motion";

export default function Saludo({ invitado }) {
  if (!invitado) return null;

  function firstCharCap(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const nombre = firstCharCap(invitado.nombre);
  const tieneCustom = invitado.header && invitado.mensaje;

  // Texto adicional condicional
  let adicional = "";
  if (invitado.pareja) adicional = " junto a tu pareja";
  else if (invitado.acompanante) adicional = " junto con un acompañante";

  return (
    <section className="flex flex-col items-center justify-center text-center bg-light-beige px-6 my-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-3xl rounded-2xl"
      >
        {tieneCustom ? (
          <>
            <h2 className="vibur-regular text-5xl text-dark-red mb-6">
              {invitado.header}
            </h2>
            <p className="delius-regular text-lg leading-relaxed text-almost-black whitespace-pre-wrap">
               Nos hace muy felices invitarlos a compartir nuestra boda {" "}
                <span className="font-bold text-light-red">
                  {invitado.mensaje}
                  .
                </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="vibur-regular text-5xl text-dark-red mb-6">
              ¡Hola {nombre}!
            </h2>
            <p className="delius-regular text-lg leading-relaxed text-almost-black">
              Nos hace muy felices{" "}
              <span className="font-bold text-light-red">
                invitarte{adicional}
              </span>{" "}
              a compartir este momento tan especial.
            </p>
          </>
        )}
      </motion.div>
    </section>
  );
}
