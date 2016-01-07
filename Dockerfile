FROM mengzyou/docker-php:5.6-apache-server
MAINTAINER Mengz <mz@dasudian.com>

RUN sed -i -e 's/htdocs/dsd_docs/' /etc/apache2/default-server.conf
ADD static/ /srv/www/dsd_docs/
