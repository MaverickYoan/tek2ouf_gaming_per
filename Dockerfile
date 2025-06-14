FROM php:8.2-apache

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y libpq-dev
RUN docker-php-ext-install pdo pdo_pgsql && docker-php-ext-enable pdo pdo_pgsql

EXPOSE 80
COPY ./src /var/www/html
RUN chown -R www-data:www-data /var/www/html