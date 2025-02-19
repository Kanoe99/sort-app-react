# Project Setup

## Requirements

Before setting up the project, make sure you have the following installed:

-   [PHP](https://www.php.net/) (preferably PHP 8.1 or higher)
-   [Composer](https://getcomposer.org/)
-   [Node.js](https://nodejs.org/)
-   [NPM](https://www.npmjs.com/)
-   [Mailpit](https://github.com/axllent/mailpit) for email testing

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Kanoe99/sort-app-react.git
cd sort-app-react
```

### 2. Install dependencies

```bash
composer install
npm i
```

### 3. ENV

Copy contents of .env.example into newly created .env

### 4. DB

Create database.sqlite in database folder
run

```bash
php artisan migrate:fresh --seed
```

### 5. KEY

run

```bash
php artisan key:generate
```

### 6. Run App

```bash
composer run dev
mailpit
```

---

# Настройка проекта

## Требования

Прежде чем настроить проект, убедитесь, что у вас установлены следующие компоненты:

-   [PHP](https://www.php.net/) (желательно PHP 8.1 или выше)
-   [Composer](https://getcomposer.org/)
-   [Node.js](https://nodejs.org/)
-   [NPM](https://www.npmjs.com/)
-   [Mailpit](https://github.com/axllent/mailpit) для тестирования email

## Установка

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/Kanoe99/sort-app-react.git
cd sort-app-react
```

### 2. Установка зависимостей

```bash
composer install
npm i
```

### 3. ENV

Скопируйте содержимое из .env.example в новый файл .env.

### 4. DB

Создайте файл database.sqlite в папке database.
Затем выполните команду:

```bash
php artisan migrate:fresh --seed
```

### 5. Ключ

Выполните команду

```bash
php artisan key:generate
```

### 6. Запустите приложение

```bash
composer run dev
```
