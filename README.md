# 🧪 Scripts de prueba para rendimiento de APIs REST

Este repositorio contiene dos scripts en Node.js diseñados para evaluar el rendimiento de un endpoint HTTP. Ambos realizan 1000 peticiones GET al mismo endpoint, pero cada uno mide aspectos distintos del comportamiento del servidor.

---

## 📄 test-latencia.js

Este script mide la **latencia individual** de cada una de las 1000 peticiones realizadas al endpoint.

### ¿Qué hace?

- Ejecuta 1000 peticiones HTTP GET concurrentes.
- Mide el tiempo que tarda cada petición en completarse.
- Calcula:
  - ⏱️ Tiempo total de ejecución
  - 📊 Latencia promedio
  - 📈 Latencia máxima
  - 📉 Latencia mínima

### ¿Para qué sirve?

Este script permite analizar la **velocidad de respuesta** del servidor bajo carga, útil para comparar entornos (local, Docker, nube) y detectar variaciones de rendimiento.

---

## 📄 test-throughput.js

Este script mide el **throughput** y los **errores HTTP** que ocurren durante las 1000 peticiones.

### ¿Qué hace?

- Ejecuta 1000 peticiones HTTP GET concurrentes.
- Cuenta cuántas peticiones fueron exitosas y cuántas fallaron.
- Agrupa los resultados por **código de estado HTTP**.
- Calcula:
  - 🚀 Throughput (peticiones por segundo)
  - ✅ Total de respuestas exitosas
  - ❌ Total de errores
  - 📋 Distribución por código HTTP

### ¿Para qué sirve?

Este script permite evaluar la **estabilidad** del servidor bajo carga, detectar errores recurrentes y medir la capacidad de procesamiento concurrente.


Qué mide el script
Rendimiento (Throughput): La métrica principal es el rendimiento, que se calcula como el total de peticiones (1,000) dividido por el tiempo total en segundos que tardaron en completarse. Este valor indica cuántas peticiones por segundo puede manejar el servidor para esa ruta específica bajo la carga simulada.
Tasa de éxito y error: Mide cuántas de las 1,000 peticiones concurrentes fueron exitosas (código de estado HTTP 2xx) y cuántas fallaron (códigos de estado de error o no respuesta).
Distribución de códigos de estado: Registra la cantidad de veces que se recibió cada código de estado HTTP (por ejemplo, 200, 404, 500), proporcionando un desglose detallado del comportamiento del servidor.
Tiempo de respuesta agregado: Aunque no se calcula directamente el tiempo de respuesta individual, el tiempo total del script representa el tiempo que le toma al servidor procesar un lote de 1,000 solicitudes de forma concurrente, lo que refleja su capacidad de manejo de carga. 
Para qué sirve
Este tipo de prueba de carga es fundamental para:
Evaluar la capacidad de la API: Permite conocer el límite de peticiones que el servidor puede manejar por segundo sin degradar su rendimiento.
Detectar cuellos de botella: Un rendimiento bajo o un número elevado de errores pueden indicar problemas en la aplicación o en la infraestructura del servidor que deben ser optimizados.
Establecer un punto de referencia (benchmark): Proporciona métricas concretas que pueden ser usadas para comparar el rendimiento antes y después de realizar cambios en el código o en la infraestructura, como optimizaciones de bases de datos, despliegues en servidores más potentes o implementaciones de caché. 




---

## 🔧 Requisitos

- Node.js ≥ 18
- Instalar dependencias:

```bash
npm install axios

node test-latencia.js
node test-throughput.js

Para usar en el script sustituye:
const URL = 'http://tudominio/tupoint/elvalor';
por tu dominio o ip



Autor
Emilio (Moleculax) Moleculax Software
