<?php

namespace App\Enum;

enum RolesEnum: string
{
    case Admin = 'admin';
    case User = 'user';

    public static function labels(): array
    {
        return [
            self::Admin->value => 'Администратор',
            self::User->value => 'Пользователь',
        ];
    }

    public function label()
    {
        return match ($this) {
            self::Admin => 'Admin',
            self::User => 'User',
        };
    }
}
