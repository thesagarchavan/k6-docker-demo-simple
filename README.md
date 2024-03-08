# Run tests with the k6 docker instance 
Run tests with the k6 docker container with minimal effort. K6 is a great tool to perform load testing, stress testing. The documentation is available at [Grafana official website](https://grafana.com/docs/k6/latest/) and [k6 website](https://k6.io/docs/).

1. [Write a test script](#script-to-run)
2. [Build and run k6](#build-and-run-k6-container)
3. [Analyse the result](#result)

## Script to run
You can copy a test script from k6 samples. K6 provided a lot of samples addressing several scenarios.

```
import http from 'k6/http';
import { sleep, check } from 'k6';

export default function() {
  const response = http.get('https://test.k6.io');
  check(response, {"Status is Ok(200)": (r) => r.status === 200})
  sleep(1);
}
```

## Build and run k6 container

1. Navigate to the folder where your script file is located.
2. Create a dockerfile to create a docker image with k6 base image.
3. Add your script file to image by copying the file into image.
```
FROM grafana/k6
WORKDIR /
COPY script.js .
CMD ["run", "script.js","--vus","10","--duration","1m"]
```

4. Build the docker image.
    `docker buildx build -t k6_image_name --file .\Dockerfile .`

5. Run a container with the docker image.
    `docker run -rm --name k6_container_name k6_image_name`


## Result

Once successfully executed the docker run command, the final result is displayed with all the metrics as shown below
```
default ↓ [ 100% ] 10 VUs  1m0s

     ✓ Status is Ok(200)

     checks.........................: 100.00% ✓ 466      ✗ 0
     data_received..................: 5.4 MB  89 kB/s
     data_sent......................: 49 kB   805 B/s
     http_req_blocked...............: avg=52.49ms  min=4.1µs    med=11.6µs   max=2.46s    p(90)=19.7µs   p(95)=24.72µs
     http_req_connecting............: avg=4.43ms   min=0s       med=0s       max=219.26ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=246.17ms min=198.38ms med=214.14ms max=1.21s    p(90)=413.81ms p(95)=429.35ms
       { expected_response:true }...: avg=246.17ms min=198.38ms med=214.14ms max=1.21s    p(90)=413.81ms p(95)=429.35ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 466
     http_req_receiving.............: avg=16.63ms  min=74.89µs  med=247.64µs max=232.3ms  p(90)=673.7µs  p(95)=203.07ms
     http_req_sending...............: avg=65.58µs  min=12.4µs   med=48.55µs  max=427.1µs  p(90)=158µs    p(95)=179.25µs
     http_req_tls_handshaking.......: avg=4.56ms   min=0s       med=0s       max=219.26ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=229.47ms min=198.1ms  med=211.9ms  max=1s       p(90)=232.92ms p(95)=418.86ms
     http_reqs......................: 466     7.633846/s
     iteration_duration.............: avg=1.29s    min=1.19s    med=1.21s    max=3.69s    p(90)=1.42s    p(95)=1.43s
     iterations.....................: 466     7.633846/s
     vus............................: 1       min=1      max=10
     vus_max........................: 10      min=10     max=10


running (1m01.0s), 00/10 VUs, 466 complete and 0 interrupted iterations
default ✓ [ 100% ] 10 VUs  1m0s
```
