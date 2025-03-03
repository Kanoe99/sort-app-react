<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrinterResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'model' => $this->model,
            'type' => $this->type,
            'counter' => $this->counter,
            'number' => $this->number,
            'location' => $this->location,
            'status' => $this->status,
            'fixDate' => $this->fixDate,
            'IPBool' => $this->IPBool,
            'IP' => $this->IP,
            'comment' => $this->comment,
            'isIPv4' => $this->isIPv4,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'department' => $this->department,
            'department_head' => $this->department_head,
            'network_capable' => $this->network_capable,
            'isLocal' => $this->isLocal,
            'PC_name' => $this->PC_name,
        ];
    }
}
