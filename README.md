# Mega Evento Familiar 🎉

¡Bienvenido al repositorio oficial del **Mega Evento Familiar**!
Esta es una aplicación web moderna, interactiva y emotiva diseñada para generar expectativa y emoción antes del gran reencuentro familiar.

![Preview](https://alarcone1.github.io/Mega-Evento-Familiar/photos/foto20.jpeg)

## ✨ Características Principales

*   **⏳ Cuenta Regresiva Dinámica:**
    *   Muestra Días, Horas, Minutos y Segundos restantes para el evento.
    *   **Efectos Visuales:** Los cajones de tiempo parpadean en amarillo cuando cambian, marcando el paso del tiempo de forma dinámica.
    *   Animación de celebración al llegar a cero.

*   **📸 Carrusel de Recuerdos "Evocativo":**
    *   **Desplazamiento Infinito:** Las fotos familiares giran suavemente en el fondo.
    *   **Efecto Nostalgia:** Las fotos tienen un filtro sepia/blanco y negro que se elimina al pasar el mouse, revelando los colores originales.
    *   **Interactivo:** Al hacer clic en una foto, se abre en pantalla completa (modal).
    *   **Orden Aleatorio:** Cada vez que recargas la página, las fotos aparecen en un orden diferente.
    *   **Diseño Responsivo:** En celulares, el carrusel se ubica en la parte inferior para no estorbar; en PC, se mantiene centrado.

*   **✨ Atmósfera Mágica:**
    *   Fondo con partículas flotantes interactivas (se conectan al acercarse, simulando lazos familiares).
    *   Diseño elegante con gradientes y tipografías modernas.

*   **📲 Listo para Compartir:**
    *   Configurado con etiquetas **Open Graph** para que al compartir el enlace en WhatsApp o Facebook aparezca una hermosa tarjeta de previsualización con foto.

## 🛠️ Tecnologías Usadas

*   **React** (con Vite)
*   **TypeScript**
*   **Tailwind CSS** (Estilos y animaciones)
*   **Lucide React** (Iconos)

## 🚀 Cómo correr el proyecto localmente

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/alarcone1/Mega-Evento-Familiar.git
    cd Mega-Evento-Familiar
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre tu navegador en `http://localhost:5173` (o el puerto que indique la consola).

## 🖼️ Cómo agregar más fotos

El sistema está diseñado para ser fácil de actualizar. Para agregar nuevas fotos al carrusel:

1.  Guarda tus fotos en la carpeta `public/photos`.
2.  Asegúrate de nombrarlas siguiendo la secuencia: `foto30.jpeg`, `foto31.jpeg`, etc.
3.  Abre el archivo `src/components/PhotoCarousel.tsx`.
4.  Busca la constante `PHOTO_COUNT` al inicio del archivo y actualiza el número:
    ```typescript
    // Ejemplo: si subiste hasta la foto 50
    const PHOTO_COUNT = 50;
    ```
5.  ¡Listo! El carrusel cargará automáticamente las nuevas fotos.

## 🌍 Despliegue (GitHub Pages)

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages.
Solo necesitas hacer `push` a la rama `main` y los cambios se reflejarán en unos minutos en:

👉 **https://alarcone1.github.io/Mega-Evento-Familiar/**

## 📚 Documentación del Proyecto

Para entender mejor cómo se construyó y cómo evoluciona este proyecto, consulta los siguientes documentos:

*   [**WORKFLOW.md**](./WORKFLOW.md): Análisis del flujo de trabajo con IA (Gemini + Antigravity).
*   [**spec.md**](./spec.md): Especificaciones técnicas y arquitectura del sistema.
*   [**CHANGELOG.md**](./CHANGELOG.md): Historial de cambios y versiones.


Prompt inicial:
Analiza este proyecto, instala las dependencias necesarias y ejecuta la aplicación para que pueda verla en el navegador. No hagas ningún cambio en el código, solo quiero verla funcionando
---

Hecho con ❤️ para la familia.
