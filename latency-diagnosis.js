// latency-diagnosis.js
const axios = require('axios');
const { performance } = require('perf_hooks');

//const URL = 'http://localhost:8080/neurocode/api/posteos-preguntas/50/2';
const URL = 'http://tudominio/tupoint/elvalor';
const TOTAL_REQUESTS = 10000;
const TIMEOUT_MS = 5000;

async function runLatencyDiagnosis() {
  const startTime = performance.now();
  const latencies = [];
  const errors = [];

  console.log(`🚀 Iniciando diagnóstico de latencia sobre ${TOTAL_REQUESTS} peticiones a:\n🔗 ${URL}\n`);

  const requests = Array.from({ length: TOTAL_REQUESTS }, (_, i) => {
    const reqStart = performance.now();
    return axios.get(URL, { timeout: TIMEOUT_MS })
      .then(() => {
        const latency = performance.now() - reqStart;
        latencies.push(latency);
      })
      .catch((err) => {
        const latency = performance.now() - reqStart;
        latencies.push(latency);
        errors.push({ index: i, latency, message: err.message });
      });
  });

  await Promise.all(requests);
  const endTime = performance.now();

  // Estadísticas
  const totalTime = endTime - startTime;
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const maxLatency = Math.max(...latencies);
  const minLatency = Math.min(...latencies);
  const p95 = percentile(latencies, 95);
  const p99 = percentile(latencies, 99);

  // Reporte
  console.log(`🔁 Total de peticiones: ${TOTAL_REQUESTS}`);
  console.log(`❌ Errores: ${errors.length}`);
  console.log(`⏱️ Tiempo total: ${totalTime.toFixed(2)} ms`);
  console.log(`📊 Latencia promedio: ${avgLatency.toFixed(2)} ms`);
  console.log(`📈 Máxima latencia: ${maxLatency.toFixed(2)} ms`);
  console.log(`📉 Mínima latencia: ${minLatency.toFixed(2)} ms`);
  console.log(`📐 Percentil 95: ${p95.toFixed(2)} ms`);
  console.log(`📐 Percentil 99: ${p99.toFixed(2)} ms`);

  if (errors.length > 0) {
    console.log(`🧯 Primeros 5 errores:`);
    errors.slice(0, 5).forEach(e =>
      console.log(`  🔸 #${e.index} → ${e.latency.toFixed(2)} ms → ${e.message}`)
    );
  }
}

// Función para calcular percentiles
function percentile(arr, p) {
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.floor((p / 100) * sorted.length);
  return sorted[index];
}

runLatencyDiagnosis();
