<?php

namespace App\Services;

use App\Models\Printer;
use App\Models\Tag;

use \App\Http\Resources\PrinterResource;
use \App\Http\Resources\PrinterPageResource;

use App\Services\DepartmentService;
use App\Services\PrinterPageService;

class InertiaPrinterService{

    public function index(): array
    {
        
        $perPage = 12;

        $printers = Printer::with(['tags'])->latest()->paginate($perPage);

        $tags = Tag::all();

        return [
            'printers' => $printers,
            'tags' => $tags,
        ];
    }

    public function edit(Printer $printer):array
    {
        (new PrinterPageService)->resetSumNoRecords($printer);

        return [
            'printer' => new PrinterResource($printer),
            'sums' => PrinterPageResource::collection($printer->printerPages->slice(0, 1))->toArray(request()),
            'printer_pages_no_sum' => PrinterPageResource::collection($printer->printerPages->slice(1)->values())->toArray(request()), // Convert collection to array
            'department_heads' => (new DepartmentService)->getDepartmentHeads(),
        ];
    }

    public function create(){
        return [
            'department_heads' => (new DepartmentService)->getDepartmentHeads(),
            'id'=> Printer::max('id') + 1,
        ];
    }
}