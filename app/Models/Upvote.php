<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Upvote extends Model
{
    use HasFactory;

    public function feature(): BelongsTo
    {
        return $this->belongsTo(Feature::class);
    }
}
