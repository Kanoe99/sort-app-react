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
        'printer_id',
        'print_pages',
        'scan_pages',
        'end_year',
        'end_month',
        'start_year',
        'start_month',
        'isSum'
    ];

    public function printer():BelongsTo
    {
        return $this->belongsTo(Printer::class);
    }
}
