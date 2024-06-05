import React from "react";
import "../../styles/HeroSection.css";
import { Link } from "react-router-dom";
function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover bg-center h-screen flex flex-col justify-center">
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-5 bg-transparent text-white">
        <img src="/firma-logo.png" alt="Utfpr" className="h-10 mx-4 my-2" />
        <div>
          <Link
            to="/logar"
            className="text-white px-4 py-2 hover:bg-white hover:text-black transition duration-300"
          >
            Entrar
          </Link>
          <Link
            to="/registrar"
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Registrar
          </Link>
        </div>
      </header>
      <div className="p-10">
        <h1
          className="text-3.25rem font-bold leading-tight text-center bg-highlight bg-200% animate-slide bg-clip-text"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          Gerenciamento inteligente para seus dispositivos inteligentes.
        </h1>
        <div className="mt-8 text-center">
          <p className="text-sm uppercase text-gray-700">Reconhecido por</p>
          <div className="flex justify-center mt-2 flex-wrap">
            <img src="/utfpr-logo.png" alt="Utfpr" className="h-6 mx-4 my-2" />
            <img
              src="/governo-logo.png"
              alt="Governo Federal"
              className="h-6 mx-4 my-2"
            />
            <img
              src="/cientech-logo.png"
              alt="Cientech"
              className="h-6 mx-4 my-2"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-300 to-transparent flex items-end justify-center pb-5">
        <a
          href="#saiba-mais"
          className="text-white text-lg cursor-pointer flex flex-col items-center"
        >
          <span>Saiba mais</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-6 h-6 animate-bounce"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default HeroSection;
