<?php
namespace App\Services;

use App\Models\Printer;
use App\Models\Tag;


class TagService
{
    public function generateTagsForPrinter(Printer $printer)
    {
        $tags = collect();

        switch ($printer->counter) {

            case $printer->counter > 0 && $printer->counter < 3000:
                $tags->push('до 3000');
                break;
            case $printer->counter > 3000 && $printer->counter < 6000:
                $tags->push('от 3000 до 6000');
                break;
            case $printer->counter > 6000 && $printer->counter < 9000:
                $tags->push('от 6000 до 9000');
                break;
            case $printer->counter > 9000:
                $tags->push('IT\'S OVER 9000!!!');
                break;
            default:
                break;
        }



        $tags->push($printer->status, $printer->type);

        $uniqueTags = $tags->unique();

        $uniqueTags->each(function ($tagName) use ($printer) {
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $printer->tags()->attach($tag->id);
        });
    }
}
