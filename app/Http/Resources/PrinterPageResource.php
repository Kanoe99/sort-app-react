<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrinterPageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = false;

    public function toArray(Request $request): array
    {
        return [
            'start_month' => $this->start_month,
            'start_year' => $this->start_year,
            'end_month' => $this->end_month,
            'end_year' => $this->end_year,
            'isSum' => $this->isSum,
            'print_pages' => $this->print_pages,
            'scan_pages' => $this->scan_pages,
        ];
    }
}
