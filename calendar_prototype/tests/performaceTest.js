import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = "https://odbwammbspfwnilxonnd.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kYndhbW1ic3Bmd25pbHhvbm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTM4NjgsImV4cCI6MjA1ODQ2OTg2OH0.ki60Q1E7PrIt2cw2jVWzC4obSneq9wj-V41kubl_pZE";


export let options = {
  stages: [
    { duration: '30s', target: 15 },  // Normal load
    { duration: '1m', target: 150 },  // Heavy load
    { duration: '35s', target: 0 },   // Cool down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% under 3s
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/rest/v1/tableName`, {
    headers: {
      apikey: `${API_KEY}`,
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  check(res, {
    'is status 200': (r) => r.status === 200,
    'response time < 3s': (r) => r.timings.duration < 3000,
  });

  sleep(1);
}