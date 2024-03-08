FROM grafana/k6
WORKDIR /
COPY script.js .
CMD ["run", "script.js", "--vus", "10", "--duration", "1m"]
