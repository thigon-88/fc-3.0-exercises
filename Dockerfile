FROM nginx:1.23.1-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY html /user/share/nginx/html

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off"]