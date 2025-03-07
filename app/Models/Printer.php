<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\PrinterPage;

class Printer extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'IP',
        'comment',
        'fixDate',
        'number',
        'counter',
        'model',
        'status',
        'location',
        'counterDate',
        'isIPv4',
        'department',
        'department_head',
        'network_capable',
        'isLocal',
        'PC_name',
    ];

    public function tag(string $name): void
    {
        $tag = Tag::firstOrCreate(['name' => strtolower($name)]);

        $this->tags()->attach($tag);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function pages(){
        return $this->hasMany(PrinterPage::class);
    }

    public function sumPages(){
        return $this->pages()->where('isSum', 1);
    }
  
    public function threeLastPages(){
        return $this->pages()->where('isSum', 0)->orderBy('end_year', 'desc')->limit(3);
    }
  
    
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function getPages()
    {
        return $this->pages()->where('isSum', 1)->get();
    }

}
