// deep-latency-audit.js
const axios = require('axios');
const { performance } = require('perf_hooks');

const URL = 'http://tudominio/tupoint/elvalor';
const TOTAL_REQUESTS = 10000;
const TIMEOUT_MS = 5000;

async function runDeepLatencyAudit() {
  const startTime = performance.now();
  const latencies = [];
  const errors = {
    timeout: [],
    network: [],
    server: [],
    client: [],
    unknown: []
  };

  console.log(`🚀 Iniciando auditoría profunda de latencia sobre ${TOTAL_REQUESTS} peticiones a:\n🔗 ${URL}\n`);

  const requests = Array.from({ length: TOTAL_REQUESTS }, (_, i) => {
    const reqStart = performance.now();
    return axios.get(URL, { timeout: TIMEOUT_MS })
      .then(res => {
        const latency = performance.now() - reqStart;
        latencies.push(latency);
      })
      .catch(err => {
        const latency = performance.now() - reqStart;
        latencies.push(latency);

        if (err.code === 'ECONNABORTED') {
          errors.timeout.push({ index: i, latency, message: err.message });
        } else if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
          errors.network.push({ index: i, latency, message: err.message });
        } else if (err.response) {
          const status = err.response.status;
          if (status >= 500) {
            errors.server.push({ index: i, latency, status });
          } else if (status >= 400) {
            errors.client.push({ index: i, latency, status });
          } else {
            errors.unknown.push({ index: i, latency, message: err.message });
          }
        } else {
          errors.unknown.push({ index: i, latency, message: err.message });
        }
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
  const totalErrors = Object.values(errors).reduce((sum, group) => sum + group.length, 0);

  // Reporte
  console.log(`🔁 Total de peticiones: ${TOTAL_REQUESTS}`);
  console.log(`❌ Total de errores: ${totalErrors}`);
  console.log(`⏱ Tiempo total: ${totalTime.toFixed(2)} ms`);
  console.log(`📊 Latencia promedio: ${avgLatency.toFixed(2)} ms`);
  console.log(`📈 Máxima latencia: ${maxLatency.toFixed(2)} ms`);
  console.log(`📉 Mínima latencia: ${minLatency.toFixed(2)} ms`);
  console.log(`📐 Percentil 95: ${p95.toFixed(2)} ms`);
  console.log(`📐 Percentil 99: ${p99.toFixed(2)} ms`);

  // Detalle de errores
  console.log(`\n🧯 Detalle de errores:`);
  for (const [type, group] of Object.entries(errors)) {
    if (group.length > 0) {
      console.log(`  • ${type.toUpperCase()}: ${group.length}`);
      group.slice(0, 3).forEach(e => {
        const info = e.status ? `Status ${e.status}` : e.message;
        console.log(`     🔸 #${e.index} → ${e.latency.toFixed(2)} ms → ${info}`);
      });
    }
  }
}

// Función para calcular percentiles
function percentile(arr, p) {
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.floor((p / 100) * sorted.length);
  return sorted[index];
}

runDeepLatencyAudit();
