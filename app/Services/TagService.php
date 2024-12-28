<?php
namespace App\Services;

use App\Models\Printer;
use App\Models\Tag;


class TagService
{
    public function generateTagsForPrinter(Printer $printer)
    {
        $tags = collect();

        if ($printer->counter > 3000) {
            $tags->push('Over 3000');
        }

        if ($printer->attention) {
            $tags->push('Needs Attention');
        }

        $uniqueTags = $tags->unique();

        $uniqueTags->each(function ($tagName) use ($printer) {
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $printer->tags()->attach($tag->id);
        });
    }
}
