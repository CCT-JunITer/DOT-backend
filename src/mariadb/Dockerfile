FROM mariadb:latest
COPY assets/DOT-secrets/data/ /data/
COPY src/mariadb/init.sql /docker-entrypoint-initdb.d/
