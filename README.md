
# Desafio 6 - Conversion Moneda Nacional

# 💱 Conversor de Monedas Nacional

Aplicación web responsive moderna y profesional desarrollada en **HTML5**, **CSS3**, **JavaScript ES6+** y **Bootstrap 5**, que permite realizar la conversión de divisas a partir de un monto en Pesos Chilenos (CLP) consumiendo en tiempo real la API pública de [mindicador.cl](https://mindicador.cl/) y visualizando un gráfico interactivo con el historial de los últimos 10 días mediante **Chart.js**.

---

## 📸 Vista Previa del Proyecto

El proyecto cuenta con un diseño **Dark Mode** elegante, utilizando efectos de *Glassmorphism*, gradientes cian resplandecientes, componentes accesibles de Bootstrap 5 y fuentes tipográficas de Google Fonts (*Poppins*).

---

## 🌟 Características Principales

- **Consumo de API REST en Tiempo Real:** Obtención de tipos de cambio actualizados desde `https://mindicador.cl/api/{moneda}` usando `fetch` y `async/await`.
- **Soporte Multi-divisa:** Conversión a **Dólar Estadounidense (USD)**, **Euro (EUR)**, **Unidad de Fomento (UF)**, **Unidad Tributaria Mensual (UTM)** y **Bitcoin (BTC)**.
- **Gráfico Histórico Interactivo:** Gráfica de líneas con los registros de los últimos 10 días de la moneda seleccionada, ordenados cronológicamente con Chart.js.
- **Manejo Robusto de Errores:** Estructura `try...catch` que captura fallos de red o respuestas erróneas de la API y notifica al usuario dinámicamente en el DOM.
- **Diseño 100% Responsive:** Adaptación fluida a dispositivos móviles, tablets y monitores de escritorio.
- **Código Profesional y Modular:** Separación estricta de estructura (`index.html`), estilos (`assets/css/style.css`) y lógica (`assets/js/script.js`).

---

## 📁 Estructura del Proyecto

```text
codigos/
├── index.html                  # Marcado HTML5 semántico y contenedores Bootstrap 5
├── README.md                   # Documentación detallada del proyecto
└── assets/
    ├── css/
    │   └── style.css           # Estilos Dark Mode, Glassmorphism y media queries
    └── js/
        └── script.js           # Lógica asíncrona, manipulación del DOM y Chart.js
```


## 🔗 Enlaces

- Repositorio
  - https://github.com/vn-vrgs/conversor-moneda.git

- Desplegar
  - https://vn-vrgs.github.io/conversor-moneda/


---

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica y accesible.
- **CSS3:** Variables CSS, Flexbox, CSS Grid, Glassmorphism, animaciones `@keyframes` y media queries.
- **JavaScript (ES6+):** Programación asíncrona (`async/await`, `fetch`), manipulación del DOM, formateo de números (`Intl.NumberFormat`) y manejo de eventos.
- **Bootstrap 5 (v5.3.3):** Sistema de rejilla responsive y utilidades visuales.
- **Chart.js (v4.x):** Librería de visualización de datos para renderizado de canvas responsive.
- **FontAwesome (v6.5.1):** Iconografía vectorial.
- **API mindicador.cl:** Fuente de datos financieros públicos en Chile.

---

## 🚀 Instalación y Ejecución

No se requieren dependencias de Node.js ni herramientas de compilación para ejecutar este proyecto.

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITO>
   ```
2. **Navegar a la carpeta del proyecto:**
   ```bash
   cd codigos
   ```
3. **Abrir en el navegador:**
   - Abre directamente el archivo `index.html` en tu navegador web (Google Chrome, Firefox, Edge, Safari).
   - O bien, si usas **Visual Studio Code**, haz clic derecho en `index.html` y selecciona **Open with Live Server**.

---

## 📋 Cumplimiento de Requerimientos de Evaluación

| # | Requerimiento | Estado | Implementación |
| :-: | :--- | :-: | :--- |
| **1** | Obtención de tipos de cambio desde `mindicador.cl` | ✅ Cumplido | Función asíncrona `fetchCurrencyData()` consultando la API en tiempo real. |
| **2** | Cálculo correcto y renderizado en el DOM | ✅ Cumplido | Operación `monto / tasa` formateada dinámicamente en `#resultText`. |
| **3** | Select con más de un tipo de moneda | ✅ Cumplido | Opciones para USD, EUR, UF, UTM y BTC. |
| **4** | Uso de `try...catch` para captura de errores | ✅ Cumplido | Bloque `try...catch` que despliega mensajes amigables en `#errorBox`. |
| **5** | Gráfico de 10 días históricos con Chart.js | ✅ Cumplido | Extracción de los últimos 10 registros (`slice(0, 10).reverse()`) y renderizado en canvas. |

---

## ✒️ Autor

Desarrollado como solución profesional para el módulo de JavaScript en **Desafío Latam**.
