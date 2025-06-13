import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function WeddingInvitation() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const weddingDate = new Date("2026-02-28T21:00:00");
  const weddingDateFormatted = weddingDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio("/music.mp3");
  const [copiado, setCopiado] = useState(false);

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

  useEffect(() => {
    audio.loop = true;
    isPlaying ? audio.play() : audio.pause();
    return () => audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark-red delius-regular w-screen">
      {/* Hero Section */}
      <section className="h-screen bg-dark-red flex items-center justify-center w-screen">
        <div className="text-center">
          <motion.h1
            className="mb-4 text-almost-white vibur-regular text-7xl"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Tamy y Nano
          </motion.h1>

          <motion.h1
            className="mb-2 text-almost-white delius-regular text-3xl"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            ¡Nos casamos!
          </motion.h1>
        </div>
      </section>

      {/* Countdown - Date and Location  */}
      <section className="h-screen  text-center flex align-middle justify-around flex-col w-screen bg-light-beige">
        <div className="text-center bg-light-beige">
          <motion.p
            className="text-lg pt-1 italic tracking-wide font-bold text-almost-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <p className="text-lg pt-1 italic tracking-wide font-bold text-almost-black">
              A veces lo que empieza como una locura, <br /> se convierte en lo
              mejor de tu vida.
            </p>
          </motion.p>
        </div>
        <div className="space-y-5 py-5 text-center text-almost-white bg-dark-red ">
          <p className="text-lg">Te esperamos el día</p>
          <p className="text-3xl font-semibold  mt-3 mb-6">
            {weddingDate.toLocaleDateString("es-AR", {
              day: "numeric",
              month: "long",
            })}
          </p>

          <div className="flex justify-center items-center  text-center px-4">
            {/* Días */}
            <div className="w-1/4">
              <div>
                <p className="text-4xl font-bold">
                  {String(timeLeft.days).padStart(2, "0")}
                </p>
                <p className="text-sm mt-1">Días</p>
              </div>
            </div>
            <span className="text-3xl font-semibold">:</span>
            {/* Horas */}
            <div className="w-1/4">
              <div>
                <p className="text-4xl font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>
                <p className="text-sm mt-1">Hs</p>
              </div>
            </div>
            <span className="text-3xl font-semibold">:</span>

            {/* Minutos */}
            <div className="w-1/4">
              <div>
                <p className="text-4xl font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </p>
                <p className="text-sm mt-1">Min</p>
              </div>
            </div>
            <span className="text-3xl font-semibold">:</span>

            {/* Segundos */}
            <div className="w-1/4">
              <div>
                <p className="text-4xl font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>
                <p className="text-sm mt-1">Seg</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-light-beige ">
          <div className=" space-y-1 font-semibold">
            <h3 className="text-2xl font-bold">Detalles del evento</h3>
            <CalendarDaysIcon className="inline-block h-15 text-light-red" />
            <p className="text-lg">{weddingDateFormatted}</p>
            <ClockIcon className="inline-block h-15 text-light-red" />
            <p className="text-lg ">21:00 hs</p>
            <MapPinIcon className="inline-block h-15 text-light-red" />
            <p className="text-lg">
              Buenos Vecinos 7520,
              <br /> Colonia Segovia, Guaymallén
            </p>
            <a
              href="https://maps.app.goo.gl/GFPaRQjapVVqL3ur5"
              className="inline-block  px-5 py-3 bg-light-red text-almost-white rounded-full shadow-md hover:bg-dark-beige transition mb-5"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Slideshow */}
      <section className="h-screen text-center bg-light-beige ">
        <div className="">
          <motion.p
            className="text-lg py-4 italic tracking-wide font-bold text-almost-white bg-dark-red "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            “Un día soñamos este momento… Hoy, es realidad”
          </motion.p>
        </div>
        <div className="pb-6 pt-6">
          <h3 className="text-2xl font-semibold pb-6">
            Nuestra historia en fotos
          </h3>
          <div className="overflow-hidden relative w-full max-w-md mx-auto h-64 rounded-lg shadow-md">
            <motion.div
              className="absolute w-full h-full flex"
              animate={{ x: ["0%", "-100%", "-200%", "-300%", "0%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
            >
              {[1, 2, 3, 4].map((n) => (
                <img
                  key={n}
                  src={`/img/img${n}.jpg`}
                  className="w-full object-cover"
                  alt={`Foto ${n}`}
                />
              ))}
            </motion.div>
          </div>
          <motion.p
            className="text-lg pt-6 px-3 italic  font-bold text-almost-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            “Gracias por formar parte de nuestra historia de amor”
          </motion.p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">
            ¿Querés hacernos un regalo? 🎁
          </h3>
          <p className="mb-4 text-amost-black ">
            Podés colaborar con nuestra luna de miel 💕
          </p>
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
            Copiar
          </button>
        </div>
        {copiado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 inline-block px-4 py-2 bg-emerald-500 text-white rounded-full shadow-md"
          >
            ¡Alias copiado al portapapeles! 💖
          </motion.div>
        )}
      </section>

      {/* Donations */}
      <section className="py-12 px-6 text-center "></section>

      {/* Final Message */}
      <section className="py-12 px-6 text-center">
        <img
          src="/img/footer.jpg"
          alt="Foto final pareja"
          className="mx-auto rounded-lg shadow-lg mb-6"
        />
        <p className="text-2xl text-pink-700">
          Gracias por compartir este momento tan importante con nosotros ❤️
        </p>
      </section>

      {/* Music Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          className="bg-white/80 backdrop-blur p-3 rounded-full shadow-lg hover:bg-white transition border border-pink-200"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label="Toggle music"
        >
          {isPlaying ? "🔊" : "🔈"}
        </button>
      </div>
    </div>
  );
}
