# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2025-12-03

### ✨ Agregado (Added)
- **Carrusel de Fotos:** Componente `PhotoCarousel` con desplazamiento infinito y carga de 29 fotos.
- **Aleatoriedad:** Las fotos se mezclan (shuffle) automáticamente al cargar la página.
- **Efectos del Contador:** Los cajones de Días, Horas y Minutos ahora parpadean en amarillo al cambiar su valor.
- **Interactividad:** Modal de pantalla completa al hacer clic en las fotos del carrusel.
- **Social Sharing:** Etiquetas Open Graph configuradas para previsualización rica en WhatsApp (usando `foto20.jpeg`).
- **Documentación:** Archivos `README.md`, `WORKFLOW.md` y `spec.md` para referencia técnica y de usuario.

### 🐛 Corregido (Fixed)
- **Interacción Bloqueada:** Se ajustó el `z-index` y `pointer-events` para permitir clics en el carrusel sin ser bloqueado por el contenedor principal.
- **Diseño Móvil:** El carrusel ahora se posiciona en la parte inferior en pantallas pequeñas para no solaparse con el contador.

### 💄 Estilo (Style)
- Ajuste de velocidad del carrusel (más lento) para una experiencia más relajada.
- Efecto de "Evocación" (Sepia a Color) al pasar el mouse sobre las fotos.
