<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Printer;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PrinterPage extends Model
{
    /** @use HasFactory<\Database\Factories\PrinterPageFactory> */
    use HasFactory;

    protected $fillable = [
        'start_month',
        'start_year',
        'end_month',
        'end_year',
        'is_sum',
        'print_pages',
        'scan_pages'
    ];

    public function printer():BelongsTo
    {
        return $this->belongsTo(Printer::class);
    }
}
