# 🧪 Scripts de prueba para rendimiento de APIs REST

Este repositorio contiene dos scripts en Node.js diseñados para evaluar el rendimiento de un endpoint HTTP. Ambos realizan 1000 peticiones GET al mismo endpoint, pero cada uno mide aspectos distintos del comportamiento del servidor.

###  
**Aquí, el debugging no es corrección: es transformación. El error no es enemigo, es maestro. El sistema no falla: evoluciona.**

---

### 🌐 Ecosistema Moleculax

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230A66C2.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/moleculax)
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=instagram&logoColor=white)](https://www.instagram.com/moleculax)
[![Build with ❤️](https://img.shields.io/badge/built%20with-%E2%9D%A4-red)]()
[![Status](https://img.shields.io/badge/status-en%20evolución-8A2BE2)]()
[![Blogspot](https://img.shields.io/badge/Blogspot-%23FF5722.svg?logo=blogger&logoColor=white)](http://moleculax.blogspot.com)
[![Docker Hub](https://img.shields.io/badge/Docker-%230db7ed.svg?logo=docker&logoColor=white)](https://hub.docker.com/u/moleculax)
[![Moleculax App 🚀](https://img.shields.io/badge/Moleculax%20App-%23000000.svg?logo=vercel&logoColor=white)](https://moleculaxapp.vercel.app/)


##
---

## 📄 `test-latencia.js`

Este script mide la **latencia individual** de cada una de las 1000 peticiones realizadas al endpoint.

### 🔍 ¿Qué hace?

- Ejecuta 1000 peticiones HTTP GET concurrentes.
- Mide el tiempo que tarda cada petición en completarse.
- Calcula:
  - ⏱️ Tiempo total de ejecución
  - 📊 Latencia promedio
  - 📈 Latencia máxima
  - 📉 Latencia mínima

### 🎯 ¿Para qué sirve?

Permite analizar la **velocidad de respuesta** del servidor bajo carga, útil para:

- Comparar entornos (local, Docker, nube).
- Detectar variaciones de rendimiento.
- Validar optimizaciones de infraestructura o código.

---

## 📄 `test-throughput.js`

Este script mide el **throughput** y los **errores HTTP** que ocurren durante las 1000 peticiones.

### 🔍 ¿Qué hace?

- Ejecuta 1000 peticiones HTTP GET concurrentes.
- Cuenta cuántas peticiones fueron exitosas y cuántas fallaron.
- Agrupa los resultados por **código de estado HTTP**.
- Calcula:
  - 🚀 Throughput (peticiones por segundo)
  - ✅ Total de respuestas exitosas
  - ❌ Total de errores
  - 📋 Distribución por código HTTP

### 📊 Métricas que mide

- **Rendimiento (Throughput):**  
  Total de peticiones ÷ tiempo total en segundos. Indica cuántas peticiones por segundo puede manejar el servidor bajo carga.

- **Tasa de éxito y error:**  
  Cuántas peticiones fueron exitosas (`2xx`) y cuántas fallaron (`4xx`, `5xx`, o sin respuesta).

- **Distribución de códigos de estado:**  
  Desglose detallado de respuestas por código HTTP (ej. `200`, `404`, `500`).

- **Tiempo de respuesta agregado:**  
  Refleja cuánto tarda el servidor en procesar un lote completo de 1000 solicitudes concurrentes.

### 🎯 ¿Para qué sirve?

Este tipo de prueba de carga es fundamental para:

- Evaluar la **capacidad de la API** sin degradación.
- Detectar **cuellos de botella** en código o infraestructura.
- Establecer un **benchmark evolutivo** para comparar antes y después de optimizaciones (DB, caché, despliegue).

---

## 🔧 Requisitos

- Node.js ≥ 18
- Instalar dependencias:

```bash
npm install axios
```

### ▶️ Ejecución

```bash
node test-latencia.js
node test-throughput.js
```

> 📌 En ambos scripts, sustituí la línea:
> ```js
> const URL = 'http://tudominio/tupoint/elvalor';
> ```
> por el dominio o IP de tu endpoint real.

---

## 👤 Autor

**Emilio (Moleculax)**  

