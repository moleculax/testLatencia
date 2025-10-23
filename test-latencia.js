// test-latencia.js
const axios = require('axios');
const { performance } = require('perf_hooks');

//const URL = 'http://localhost:8080/neurocode/api/posteos-preguntas/50/2';
const URL = 'http://tudominio/tupoint/elvalor';
const TOTAL_REQUESTS = 10000;

async function runTest() {
  const startTime = performance.now();

  // Generar 10000 promesas de petición
  const requests = Array.from({ length: TOTAL_REQUESTS }, (_, i) => {
    const reqStart = performance.now();
    return axios.get(URL)
      .then(() => performance.now() - reqStart)
      .catch(() => performance.now() - reqStart); // capturar tiempo incluso si falla
  });

  const latencies = await Promise.all(requests);
  const endTime = performance.now();

  // Estadísticas básicas
  const totalTime = endTime - startTime;
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const maxLatency = Math.max(...latencies);
  const minLatency = Math.min(...latencies);

  console.log(`🔁 Total de peticiones: ${TOTAL_REQUESTS}`);
  console.log(`⏱️ Tiempo total: ${totalTime.toFixed(2)} ms`);
  console.log(`📊 Latencia promedio: ${avgLatency.toFixed(2)} ms`);
  console.log(`📈 Máxima latencia: ${maxLatency.toFixed(2)} ms`);
  console.log(`📉 Mínima latencia: ${minLatency.toFixed(2)} ms`);
}

runTest();
