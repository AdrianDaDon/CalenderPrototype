import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL; // supabase url
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // supabase anon api key

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