<?php

namespace App\Services;

use App\Models\Printer;

class PrinterTagService
{
    public function syncTags(Printer $printer, ?string $tagString): void
    {
        if (!$tagString) return;

        $newTags = array_unique(array_map('trim', explode(',', $tagString)));
        $printer->tags()->sync([]);

        foreach ($newTags as $tag) {
            if (!empty($tag)) {
                $tagModel = Tag::firstOrCreate(['name' => $tag]);
                $printer->tags()->attach($tagModel);
            }
        }
    }
}
