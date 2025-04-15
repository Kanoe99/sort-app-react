<?php

namespace App\Helpers;

class StringHelper{
    public static function lowercaseRussianOnly($text)
    {
        return preg_replace_callback('/[А-ЯЁ]+/u', function ($matches) {
            return mb_strtolower($matches[0]);
        }, $text);
    }
}