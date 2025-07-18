import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import invitados from "./data/invitados.json";
import { motion } from "framer-motion";
import {
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
  ChevronDownIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function WeddingInvitation() {
  const { apellido } = useParams();
  const invitado = invitados.find(
    (inv) => inv.apellido.toLowerCase() === apellido?.toLowerCase()
  );

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
  const audio = new Audio("/sound/tusinmi_02.mp3");
  const [copiado, setCopiado] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageCount = 39;
  const images = Array.from({ length: imageCount }, (_, i) => i);
  const animationSteps = Array.from({ length: imageCount + 1 }, (_, i) => {
    if (i === imageCount) return "0%";
    return `-${i * 80}%`;
  });
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

  useEffect(() => {
    const handleScroll = () => {
      if (!isPlaying) {
        audio.play();
        setIsPlaying(true);
      }
      window.removeEventListener("click", handleScroll); // se ejecuta solo una vez
    };

    window.addEventListener("click", handleScroll);

    return () => window.removeEventListener("click", handleScroll);
  }, []);
  return (
    <div className="bg-dark-red delius-regular w-screen">
      {/* Hero Section */}
      <section className=" bg-dark-red flex justify-center w-screen  h-screen">
        <div className="text-center flex flex-col justify-between ">
          <motion.img
            src="/img/portada.jpg"
            alt="Código de vestimenta"
            className="w-full max-w-3xl"
            initial={{ opacity: 0, y: -180 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
          <div>
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
          <motion.div
            className="mt-6"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="inline-block h-15 text-light-red" />
          </motion.div>
        </div>
      </section>

      {/* Countdown - Date and Location  */}
      <section className=" text-center flex align-middle justify-around flex-col w-screen bg-light-beige ">
        {/* Mensaje motivador */}
        <div className="text-center bg-light-beige ">
          {invitado && (
            <section className=" flex flex-col items-center justify-center text-center bg-light-beige px-6 my-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="max-w-3xl  rounded-2xl p-8  "
              >
                {/* Saludo */}
                <h2 className="vibur-regular text-5xl text-dark-red mb-6">
                  ¡Hola familia {invitado.apellido}!
                </h2>

                {/* Texto elegante */}
                <p className="delius-regular text-lg leading-relaxed text-almost-black">
                  Nos hace muy felices{" "}
                  <span className="font-bold text-light-red">
                    invitarlos a los {invitado.cantidad}
                  </span>{" "}
                  a compartir este momento tan especial.
                </p>
              </motion.div>
            </section>
          )}

          <motion.p
            className="text-lg pt-1 italic tracking-wide font-bold text-almost-black mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <span className="text-lg pt-1 px-3 italic tracking-wide font-bold text-almost-black">
              El amor es la más fuerte de las pasiones, porque ataca al mismo
              tiempo a la cabeza, al cuerpo y al corazón.
            </span>
          </motion.p>
        </div>
        <div className="h-screen flex flex-col justify-evenly">
          {/* Fecha y cuenta regresiva */}
          <div className="space-y-5 py-5 text-center text-almost-white bg-dark-red">
            <p className="text-lg">Te esperamos el día</p>
            <p className="text-3xl font-semibold mt-3 mb-6">
              {weddingDate.toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
              })}
            </p>

            {/* CONTADOR */}
            <div className="flex justify-center items-center text-center px-4">
              {/* Días */}
              <div className="w-1/4">
                <p className="text-4xl font-bold">
                  {String(timeLeft.days).padStart(2, "0")}
                </p>
                <p className="text-sm mt-1">Días</p>
              </div>
              <span className="text-3xl font-semibold">:</span>
              {/* Horas */}
              <div className="w-1/4">
                <p className="text-4xl font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>
                <p className="text-sm mt-1">Hs</p>
              </div>
              <span className="text-3xl font-semibold">:</span>
              {/* Minutos */}
              <div className="w-1/4">
                <p className="text-4xl font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </p>
                <p className="text-sm mt-1">Min</p>
              </div>
              <span className="text-3xl font-semibold">:</span>
              {/* Segundos */}
              <div className="w-1/4">
                <p className="text-4xl font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>
                <p className="text-sm mt-1">Seg</p>
              </div>
            </div>
          </div>

          {/* Detalles del evento */}
          <div className="bg-light-beige">
            <div className="space-y-1 font-semibold">
              <h3 className="text-2xl font-bold mt-">Detalles del evento</h3>
              <CalendarDaysIcon className="inline-block h-15 text-light-red" />
              <p className="text-lg">{weddingDateFormatted}</p>
              <ClockIcon className="inline-block h-15 text-light-red" />
              <p className="text-lg">21:00 hs</p>
              <MapPinIcon className="inline-block h-15 text-light-red" />
              <p className="text-lg">
                Buenos Vecinos 7520,
                <br />
                Colonia Segovia, Guaymallén
              </p>
              <motion.a
                href="https://maps.app.goo.gl/GFPaRQjapVVqL3ur5"
                className="inline-block px-5 py-3 bg-light-red text-almost-white rounded-full shadow-md mb-5 mt-3"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0px rgba(0,0,0,0.2)",
                    "0 0 12px rgba(0,0,0,0.4)",
                    "0 0 0px rgba(0,0,0,0.2)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Ver en Google Maps
              </motion.a>
            </div>
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
            El día más esperado de nuestras vidas,
            <br /> <b className="font-extrabold">esta llegando</b>
          </motion.p>
        </div>
        <div className="pb-6 pt-6">
          <h3 className="text-2xl font-semibold pb-6">
            Nuestra historia en fotos
          </h3>
          <div
            className="overflow-hidden relative w-full max-w-md mx-auto h-64 rounded-lg shadow-md cursor-pointer"
            onClick={() => {
              setIsGalleryOpen(true);
              setCurrentIndex(0);
            }}
          >
            <motion.div
              className="absolute w-full h-full flex"
              animate={{ x: animationSteps }}
              transition={{
                repeat: Infinity,
                duration: 100,
                ease: "easeInOut",
              }}
            >
              {images.map((n) => (
                <img
                  key={n + 1}
                  src={`/img/img (${n + 1}).jpg`}
                  className="w-full object-cover"
                  alt={`Foto ${n}`}
                />
              ))}
            </motion.div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2 mt-15p">
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

      {/* Gala */}
      <section className="h-screen text-center bg-light-beige flex flex-col justify-evenly items-center ">
        <div className="bg-dark-red w-full">
          <motion.p
            className="text-lg py-4 italic tracking-wide font-bold text-almost-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            Una noche mágica nos espera...
            <br /> ¡y queremos vivirla con vos!
          </motion.p>
        </div>

        <div>
          <p className="text-lg tracking-wide px-3">
            Vestite como si esta fuera la noche más linda de nuestras vidas.
            Porque lo es.
          </p>
          <img
            src="/img/dresscode.png"
            alt="Código de vestimenta"
            className="w-20 h-auto mx-auto mb-2 rounded-full mt-3"
          />
        </div>

        <div>
          <p className="text-lg tracking-wide">
            Solo te pedimos que no uses
            <span className="font-bold text-dark-red"> este color.</span>
          </p>
          <div className="mx-auto mt-2 mb-3 rounded-full bg-dark-red h-16 w-16"></div>
        </div>

        <div>
          <p className="text-lg tracking-wide">
            Decile que <span className="font-bold">sí</span> a nuestra
            invitación.
          </p>
          <motion.a
            href="https://wa.me/5492613398485?text=Hola%2C%20quiero%20estar%20en%20su%20boda%21"
            target="_blank"
            className="inline-block px-5 py-3 bg-light-red text-almost-white rounded-full shadow-md mt-1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Confirmar Asistencia
          </motion.a>
        </div>

        <div>
          <p className="text-lg tracking-wide">
            ¡Ayudanos a armar la{" "}
            <span className="font-bold">playlist de la noche</span>!
            <br />
            Podés votar <span className="font-bold">más de una canción</span>.
          </p>
          <a
            href="https://eventos.topdjgroup.com/event/a38a51f0-32bd-4867-a7a5-7932e851e6cd"
            target="_blank"
            className="inline-block px-5 py-3 bg-light-red text-almost-white rounded-full shadow-md mt-2"
          >
            Votar la música
          </a>
        </div>
      </section>

      {/* Final Message */}
      <section className="py-12 px-6 text-center">
        <img
          src="/img/final.jpg"
          alt="Foto final pareja"
          className="mx-auto rounded-lg shadow-lg mb-6"
        />
        <p className="text-lg mb-10 italic tracking-wide font-bold text-almost-white bg-dark-red ">
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
          {isPlaying ? (
            <SpeakerWaveIcon className="h-6 w-6 text-dark-red" />
          ) : (
            <SpeakerXMarkIcon className="h-6 w-6 text-dark-red" />
          )}
        </button>
      </div>
      {isGalleryOpen && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIsGalleryOpen(false)}
          >
            ✕
          </button>
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            <img
              src={`/img/img (${currentIndex + 1}).jpg`}
              alt={`Foto ${currentIndex}`}
              className="max-h-[80vh] rounded-lg"
            />
            {/* Flechas de navegación */}
            <button
              className="absolute left-5 text-white text-4xl"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev > 0 ? prev - 1 : images.length - 1
                )
              }
            >
              ‹
            </button>
            <button
              className="absolute right-5 text-white text-4xl"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < images.length - 1 ? prev + 1 : 0
                )
              }
            >
              ›
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
