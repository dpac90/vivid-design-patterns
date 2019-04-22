FROM nginx
COPY server/static /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN unlink /var/log/nginx/error.log
RUN unlink /var/log/nginx/access.log
VOLUME /var/log/nginx
