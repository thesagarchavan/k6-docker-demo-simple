import http from 'k6/http';
import { sleep, check } from 'k6';

export default function() {
  const response = http.get('https://test.k6.io');
  check(response, {"Status is Ok(200)": (r) => r.status === 200})
  sleep(0.5);
}
