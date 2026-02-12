# Meraki Gift Store

Aplicación web moderna para "Meraki Gift Store", construida con **Eleventy**, **Tailwind CSS** y **Alpine.js**. Diseñada para ser desplegada en **Netlify** y gestionada a través de **CloudCannon**.

## Características

- **Stack Moderno**: HTML estático generado por Eleventy (11ty) para máximo rendimiento y SEO.
- **Diseño Responsive**: Utiliza Tailwind CSS con un diseño "mobile-first".
- **Gestión de Contenido**: Configurado para CloudCannon (CMS visual).
- **Carrito de Compras**: Lógica de carrito en el cliente con Alpine.js (sin backend).
- **Checkout por WhatsApp**: Generación automática de mensajes de pedido con detalles y total.
- **Modo Oscuro**: Soporte nativo para tema claro/oscuro.

## Estructura del Proyecto

- `src/`: Código fuente.
  - `_data/`: Datos globales (productos, galería, sitio).
  - `_includes/`: Componentes (Navbar, Footer) y Layouts.
  - `admin/`: Configuración del CMS.
  - `assets/`: CSS, JS y recursos estáticos.
  - `products/`: Archivos de productos individuales (Markdown).
- `.eleventy.js`: Configuración del generador de sitio.
- `tailwind.config.js`: Configuración de estilos.
- `cloudcannon.config.yml`: Configuración de los campos editables del CMS.

## Instalación y Desarrollo Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo** (Eleventy + Tailwind):
   ```bash
   npm start
   ```
   El sitio estará disponible en `http://localhost:8080`.

3. **Construir para producción**:
   ```bash
   npm run build
   ```
   Los archivos generados estarán en la carpeta `_site`.

## Despliegue en Netlify

1. Conecta tu repositorio de GitHub a Netlify.
2. Netlify detectará automáticamente el archivo `netlify.toml`.
3. **Configuración de Build**:
   - **Comando de Build**: `npm run build`
   - **Directorio de publicación**: `_site`

## Integración con CloudCannon

1. Conecta tu repositorio a CloudCannon.
2. CloudCannon detectará `cloudcannon.config.yml` y `.eleventy.js`.
3. Podrás editar:
   - **Productos**: Añadir, eliminar o modificar precio e imágenes.
   - **Galería**: Gestionar las imágenes del portafolio.
   - **Contenido General**: Textos de la página de inicio, "Cómo comprar", etc.

## Notas Técnicas

- **CSS**: Se utiliza un script personalizado `build-css.js` para compilar TailwindCSS y asegurar compatibilidad tanto en local como en entornos de CI/CD.
- **Imágenes**: Actualmente se utilizan enlaces externos (Google Photos). Para producción se recomienda subir las imágenes directamente a CloudCannon/Repo o usar un CDN dedicado.
