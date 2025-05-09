import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // Virtual users
  duration: '30s', // Test duration
};

const SUPABASE_URL = "https://odbwammbspfwnilxonnd.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kYndhbW1ic3Bmd25pbHhvbm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTM4NjgsImV4cCI6MjA1ODQ2OTg2OH0.ki60Q1E7PrIt2cw2jVWzC4obSneq9wj-V41kubl_pZE";

export default function () {
  // Example: GET all rows from a public "profiles" table
  const res = http.get(`${SUPABASE_URL}/rest/v1/profiles`, {
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`, // or use user JWT if testing with auth
      'Content-Type': 'application/json',
    },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
