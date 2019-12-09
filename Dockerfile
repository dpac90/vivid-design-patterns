FROM nginx
COPY server/static /usr/share/nginx/html
RUN unlink /var/log/nginx/error.log
RUN unlink /var/log/nginx/access.log
VOLUME /var/log/nginx
ADD nginx/nginx.conf /etc/nginx/nginx.conf
ARG app_sha=null
LABEL APP_SHA $app_sha
