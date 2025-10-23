// test-throughput.js
const axios = require('axios');
const { performance } = require('perf_hooks');

const URL = 'http://localhost:8080/neurocode/api/posteos-preguntas/50/2';




const TOTAL_REQUESTS = 10000;

async function runTest() {
  const startTime = performance.now(); // ⏱️ Inicio del test

  let successCount = 0;               // ✅ Peticiones exitosas
  let errorCount = 0;                 // ❌ Peticiones fallidas
  const statusCodes = {};            // 📋 Conteo por código HTTP

  // 🔁 Generar 10000 promesas de petición
  const requests = Array.from({ length: TOTAL_REQUESTS }, (_, i) =>
    axios.get(URL)
      .then(response => {
        successCount++;
        const code = response.status;
        statusCodes[code] = (statusCodes[code] || 0) + 1;
      })
      .catch(error => {
        errorCount++;
        const code = error.response?.status || 'SIN_RESPUESTA';
        statusCodes[code] = (statusCodes[code] || 0) + 1;
      })
  );

  await Promise.all(requests); // 🧵 Esperar todas las peticiones

  const endTime = performance.now(); // ⏱️ Fin del test
  const totalTimeSeconds = (endTime - startTime) / 1000;

  const throughput = TOTAL_REQUESTS / totalTimeSeconds; // 🚀 Peticiones por segundo

  // 📊 Resultados
  console.log(`🔁 Total de peticiones: ${TOTAL_REQUESTS}`);
  console.log(`✅ Éxitos: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`📈 Throughput: ${throughput.toFixed(2)} req/s`);
  console.log(`📋 Códigos de estado:`);

  Object.entries(statusCodes).forEach(([code, count]) => {
    console.log(`   - ${code}: ${count}`);
  });
}

runTest();
