FROM nginx
COPY server/static /usr/share/nginx/html
COPY nginx.conf /usr/share/nginx
RUN unlink /var/log/nginx/error.log
RUN unlink /var/log/nginx/access.log
VOLUME /var/log/nginx
