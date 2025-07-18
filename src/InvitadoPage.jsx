import { useParams } from "react-router-dom";
import invitados from "./data/invitados.json";

export default function InvitadoPage() {
  const { apellido } = useParams();
  const data = invitados.find(
    (inv) => inv.apellido.toLowerCase() === apellido.toLowerCase()
  );

  if (!data) {
    return <h2 className="text-center mt-10">Invitación no encontrada ❌</h2>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-light-beige text-center">
      <h1 className="text-4xl font-bold text-dark-red">¡Hola {data.apellido}!</h1>
      <p className="mt-4 text-xl">Tu invitación es para <b>{data.cantidad}</b> persona(s).</p>
      <a href="/" className="mt-6 px-4 py-2 bg-light-red text-white rounded-full">
        Volver al inicio
      </a>
    </div>
  );
}
