import { motion } from "framer-motion";

export default function Saludo({ invitado }) {
  if (!invitado) return null;

  // Helpers
  const firstCharCap = (str) => (!str ? "" : str.charAt(0).toUpperCase() + str.slice(1));

  // El JSON viene con estas claves: Nombre, Pareja, Acompañante
  const nombreRaw = invitado.Nombre || invitado.nombre || "";
  const nombre = firstCharCap(nombreRaw.trim());

  const pareja = Boolean(invitado.Pareja ?? invitado.pareja);
  const acompanante = Boolean(invitado.Acompanante ?? invitado.acompanante);
  // Plural si el nombre contiene " y "
  const esPlural = nombreRaw.includes(" y ");

  // Título
  const titulo = `¡Hola ${nombre}!`;

  // Mensaje base + destacado
  let cuerpoInicio = "Nos hace muy felices ";
  let destacado = esPlural ? "invitarlos" : "invitarte";
  let extra = "";
  let cuerpoFin = " a compartir este momento tan especial.";

  if (pareja) {
    extra = esPlural ? " junto a su pareja" : " junto a tu pareja";
  } else if (acompanante) {
    extra = " con un acompañante";
  }

  return (
    <section className="flex flex-col items-center justify-center text-center bg-light-beige px-6 my-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-3xl rounded-2xl"
      >
        <h2 className="vibur-regular text-5xl text-dark-red mb-6">{titulo}</h2>

        <p className="delius-regular text-lg leading-relaxed text-almost-black">
          {cuerpoInicio}
          <span className="font-bold text-light-red">{destacado}</span>
          {extra && (
            <span className="font-bold text-light-red">{extra}</span>
          )}
          {cuerpoFin}
        </p>
      </motion.div>
    </section>
  );
}
