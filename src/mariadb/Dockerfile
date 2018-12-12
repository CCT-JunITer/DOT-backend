FROM mariadb:latest
COPY assets/DOT-secrets/data/ /data/
COPY src/mariadb/init.sql /docker-entrypoint-initdb.d/
COPY src/mariadb/xtra-data.sql /docker-entrypoint-initdb.d/
COPY src/mariadb/trigger.sql /docker-entrypoint-initdb.d/
