# Set the base image
FROM nginx

# File Author / Maintainer
MAINTAINER Jianyu Feng

# copy file to serve
ADD . /usr/share/nginx/html

# Expose ports
EXPOSE 80
