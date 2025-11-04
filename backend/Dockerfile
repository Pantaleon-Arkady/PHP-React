FROM php:8.3-fpm

# Install system dependencies needed for Composer
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install Composer globally
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

# Set working directory
WORKDIR /var/www
