import './App.css'

function App() {
  return (
    /* Contenedor principal:
       - min-h-screen: altura mínima de pantalla completa
       - bg-linear-to-b: gradiente lineal de arriba hacia abajo
       - from-black via-sky-950 to-gray-800: colores del gradiente (negro, azul cielo oscuro, gris)
       - flex: contenedor flexible
       - items-center: centra elementos verticalmente
       - justify-center: centra elementos horizontalmente */
    <div className="min-h-screen bg-linear-to-b from-black via-sky-950 to-gray-800 flex items-center justify-center">
      {/* Contenedor de contenido:
          - max-w-xl: ancho máximo de 36rem (576px)
          - w-full: ancho 100% hasta el máximo
          - px-4: padding horizontal de 1rem (16px) */}
      <div className="max-w-xl w-full px-4">
      {/* Header principal - text-white: todo el texto en blanco */}
      <header className="text-white">
        {/* Imagen de perfil con efectos:
            - h-[50vh]: altura del 50% del viewport
            - object-cover: cubre el área sin deformar la imagen
            - mask-radial-at-center: máscara radial centrada
            - mask-radial-from-45% mask-radial-to-80%: gradiente de la máscara del 45% al 80%
            - animate-pulse-fade-in: animación de aparición suave
            - w-full: ancho completo del contenedor
            - mb-8: margen inferior de 2rem (32px) */}
        <img 
          alt="Nicolas sonriendo" 
          src="https://unavatar.io/github/ngallardo91" 
          className="h-[50vh] object-cover mask-radial-at-center mask-radial-from-45% mask-radial-to-80% animate-pulse-fade-in w-full mb-8"
        />
        
        {/* Sección de usuario - flex: contenedor flexible, flex-col: dirección columna, 
            justify-center: centra horizontalmente, items-center: centra elementos, mb-8: margen inferior 2rem */}
        <div className="flex flex-col justify-center items-center mb-8">
          {/* Badge de usuario:
              - text-sky-400: color azul cielo claro
              - text-xl: tamaño de texto extra large
              - font-mono: fuente monoespaciada
              - px-3 py-1: padding horizontal 0.75rem, vertical 0.25rem
              - border border-sky-500/50: borde azul con 50% de opacidad
              - rounded-full: bordes completamente redondeados
              - inline-flex: flex inline para alinear contenido
              - items-center justify-center: centra contenido interno
              - shadow-sm: sombra pequeña
              - bg-black/65: fondo negro con 65% de opacidad
              - cursor-crosshair: cursor en cruz al pasar sobre el elemento
              - z-10: índice z de 10 (para estar sobre otros elementos) */}
          <span className="text-sky-400 text-xl font-mono px-3 py-1 border border-sky-500/50 rounded-full inline-flex items-center justify-center shadow-sm bg-black/65 cursor-crosshair z-10">
            @Nicolas
            {/* SVG de verificación - ml-1: margen izquierdo 0.25rem, w-5 h-5: ancho y alto 1.25rem, 
                text-sky-400: color azul cielo, inline: elemento inline */}
            <svg className="ml-1 w-5 h-5 text-sky-400 inline" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 00-1.414-1.414L9 11.172l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          {/* Título principal:
              - text-3xl: tamaño de texto 1.875rem
              - font-extrabold: peso de fuente extra negrita
              - leading-tight: interlineado ajustado
              - mt-6: margen superior de 1.5rem */}
          <h1 className="text-3xl font-extrabold leading-tight mt-6">
            Nicolas Gallardo
          </h1>
        </div>

        {/* Botones de redes sociales:
            - flex: contenedor flexible
            - gap-2: espacio de 0.5rem entre elementos
            - justify-center: centra horizontalmente
            - mt-8: margen superior de 2rem */}
        <section className="flex gap-2 justify-center mt-8">
          {/* Botón Twitch:
              - bg-purple-100: fondo morado claro
              - p-2: padding de 0.5rem
              - size-10: tamaño base 2.5rem, xs:size-12: en pantallas xs 3rem
              - flex items-center justify-center: centra el contenido
              - rounded-full: botón circular
              - hover:scale-110: escala 110% al pasar el mouse
              - transition-transform: transición suave de transformaciones */}
          <a className="bg-purple-100 p-2 size-10 xs:size-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform" href="https://twitch.tv/nicolas" target="_blank" aria-label="Twitch">
            {/* SVG Twitch - w-5 h-5: 1.25rem de ancho y alto, fill: color morado de Twitch */}
            <svg className="w-5 h-5" fill="#6441a5" viewBox="0 0 24 24">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
            </svg>
          </a>
          
          {/* Botón GitHub:
              - bg-zinc-900: fondo gris oscuro
              - Mismo sistema de tamaños y hover que Twitch */}
          <a className="bg-zinc-900 p-2 size-10 xs:size-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform" href="https://github.com/nicolas" target="_blank" aria-label="GitHub">
            {/* SVG GitHub - fill: color blanco */}
            <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          
          {/* Botón Instagram:
              - bg-linear-to-tr: gradiente lineal de abajo-izquierda a arriba-derecha
              - from-yellow-300 via-pink-600 to-purple-600: colores del gradiente de Instagram */}
          <a className="bg-linear-to-tr from-yellow-300 via-pink-600 to-purple-600 p-2 size-10 xs:size-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform" href="https://instagram.com/nicolas" target="_blank" aria-label="Instagram">
            {/* SVG Instagram - fill: color blanco */}
            <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          
          {/* Botón YouTube:
              - bg-white: fondo blanco */}
          <a className="bg-white p-2 size-10 xs:size-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform" href="https://youtube.com/nicolas" target="_blank" aria-label="YouTube">
            {/* SVG YouTube - fill: rojo de YouTube */}
            <svg className="w-5 h-5" fill="#FF0000" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          
          {/* Botón X (Twitter):
              - bg-black: fondo negro */}
          <a className="bg-black p-2 size-10 xs:size-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform" href="https://x.com/nicolas" target="_blank" aria-label="X">
            {/* SVG X - fill: color blanco */}
            <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          
          {/* Botón LinkedIn:
              - bg-white: fondo blanco */}
          <a className="bg-white p-2 size-10 xs:size-12 flex items-center justify-center rounded-full hover:scale-110 transition-transform" href="https://linkedin.com/in/nicolas" target="_blank" aria-label="LinkedIn">
            {/* SVG LinkedIn - fill: azul de LinkedIn */}
            <svg className="w-5 h-5" fill="#0077b5" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </section>

        {/* Párrafo de descripción:
            - text-sky-200: color azul cielo claro
            - text-center: texto centrado
            - text-sm: tamaño de texto pequeño
            - px-4: padding horizontal 1rem
            - mt-8 mb-8: margen superior e inferior de 2rem */}
        <p className="text-sky-200 text-center text-sm px-4 mt-8 mb-8">
          Divulgador de programación, streamer y creador de contenido. Enseñando JavaScript, React, Node.js de forma divertida
        </p>

        {/* Sección principal de cursos:
            - px-4: padding horizontal 1rem
            - pb-16: padding inferior de 4rem */}
        <main className="px-4 pb-16">
          {/* Grid de cursos:
              - grid: contenedor grid
              - grid-cols-3: 3 columnas
              - grid-rows-2: 2 filas
              - gap-2: espacio de 0.5rem entre elementos
              - w-full: ancho completo */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full">
            {/* Tarjeta React (ocupa 2 columnas):
                - relative: posicionamiento relativo para elementos absolute internos
                - rounded-3xl: bordes muy redondeados (1.5rem)
                - overflow-hidden: oculta contenido que sobresale
                - bg-linear-to-br: gradiente de arriba-izquierda a abajo-derecha
                - from-cyan-900 via-cyan-700 to-cyan-500: colores cyan oscuro a claro
                - border border-cyan-900: borde cyan oscuro
                - flex flex-col: contenedor flex en columna
                - items-start: alinea elementos al inicio
                - hover:scale-105: escala 105% al hacer hover
                - hover:contrast-125: aumenta contraste 125% al hover
                - transition: transición suave
                - group: agrupa elementos para hover conjunto
                - col-span-2: ocupa 2 columnas
                - p-7: padding de 1.75rem
                - min-h-[180px]: altura mínima de 180px */}
            <a href="https://cursoreact.dev" className="relative rounded-3xl overflow-hidden bg-linear-to-br from-cyan-900 via-cyan-700 to-cyan-500 border border-cyan-900 flex flex-col items-start hover:scale-105 hover:contrast-125 transition group col-span-2 p-7 min-h-[180px]">
              {/* Texto del curso:
                  - absolute bottom-2 left-4: posicionado abajo a la izquierda
                  - font-bold text-2xl: negrita y tamaño grande
                  - text-white: color blanco
                  - group-hover:-translate-y-1: se mueve 0.25rem arriba al hover del grupo
                  - transition-transform: transición suave de transformación */}
              <span className="absolute bottom-2 left-4 font-bold text-2xl text-white group-hover:-translate-y-1 transition-transform">
                React.js
              </span>
              {/* Círculo decorativo:
                  - absolute -right-4 -bottom-4: posicionado fuera en esquina inferior derecha
                  - -rotate-6: rotado -6 grados
                  - w-28 h-28: 7rem de ancho y alto
                  - group-hover:-rotate-12: rota -12 grados al hover
                  - group-hover:scale-125: escala 125% al hover
                  - bg-sky-400: fondo azul cielo
                  - rounded-full: círculo perfecto
                  - opacity-50: 50% de opacidad */}
              <div className="absolute -right-4 -bottom-4 -rotate-6 w-28 h-28 group-hover:-rotate-12 group-hover:scale-125 transition-transform bg-sky-400 rounded-full opacity-50" />
              {/* Badge superior:
                  - absolute top-2 left-4: posicionado arriba a la izquierda
                  - text-xs: texto extra pequeño
                  - border border-white/50: borde blanco semi-transparente
                  - rounded-xl: bordes redondeados
                  - px-1 py-0.5: padding pequeño */}
              <span className="absolute top-2 left-4 text-xs text-white border border-white/50 rounded-xl px-1 py-0.5">
                Curso de +14 clases
              </span>
            </a>

            {/* Tarjeta HTML (ocupa 1 columna):
                - Mismo sistema que React pero col-span-1 (1 columna)
                - from-[#E44D26] via-orange-300 to-white: colores naranja de HTML
                - border-[#E44D26]: borde naranja HTML */}
            <a href="https://midu.link/html" className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#E44D26] via-orange-300 to-white border border-[#E44D26] flex flex-col items-start hover:scale-105 hover:contrast-125 transition group col-span-1 p-7 min-h-[180px]">
              <span className="absolute bottom-2 left-4 font-bold text-2xl text-white group-hover:-translate-y-1 transition-transform">
                HTML
              </span>
              {/* Círculo decorativo naranja */}
              <div className="absolute -right-4 -bottom-4 -rotate-6 w-28 h-28 group-hover:-rotate-12 group-hover:scale-125 transition-transform bg-orange-500 rounded-full opacity-50" />
              <span className="absolute top-2 left-4 text-xs text-white border border-white/50 rounded-xl px-1 py-0.5">
                Para principiantes
              </span>
            </a>

            {/* Tarjeta CSS (ocupa 1 columna):
                - from-[#663399] via-[#8e44ad] to-white: colores morados de CSS
                - border-[#663399]: borde morado CSS */}
            <a href="https://midu.link/css" className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#663399] via-[#8e44ad] to-white border border-[#663399] flex flex-col items-start hover:scale-105 hover:contrast-125 transition group col-span-1 p-7 min-h-[180px]">
              <span className="absolute bottom-2 left-4 font-bold text-2xl text-white group-hover:-translate-y-1 transition-transform">
                CSS
              </span>
              {/* Círculo decorativo morado */}
              <div className="absolute -right-4 -bottom-4 -rotate-6 w-28 h-28 group-hover:-rotate-12 group-hover:scale-125 transition-transform bg-purple-500 rounded-full opacity-50" />
              <span className="absolute top-2 left-4 text-xs text-white border border-white/50 rounded-xl px-1 py-0.5">
                Para principiantes
              </span>
            </a>

            {/* Tarjeta Node.js (ocupa 2 columnas):
                - from-[#215732] via-[#3C873A] to-[#8CC84B]: colores verdes de Node.js
                - border-[#215732]: borde verde oscuro Node.js
                - col-span-2: ocupa 2 columnas como React */}
            <a href="https://nodejs.dev" className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#215732] via-[#3C873A] to-[#8CC84B] border border-[#215732] flex flex-col items-start hover:scale-105 hover:contrast-125 transition group col-span-2 p-7 min-h-[180px]">
              <span className="absolute bottom-2 left-4 font-bold text-2xl text-white group-hover:-translate-y-1 transition-transform">
                Node.js
              </span>
              {/* Círculo decorativo verde */}
              <div className="absolute -right-4 -bottom-4 -rotate-6 w-28 h-28 group-hover:-rotate-12 group-hover:scale-125 transition-transform bg-green-500 rounded-full opacity-50" />
              <span className="absolute top-2 left-4 text-xs text-white border border-white/50 rounded-xl px-1 py-0.5">
                Curso de +14 clases
              </span>
            </a>
          </div>
        </main>
      </header>
      </div>
    </div>
  )
}

export default App
