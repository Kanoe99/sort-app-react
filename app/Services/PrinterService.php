<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;


##################################

use App\Models\Printer;
use App\Http\Requests\Printer\StorePrinterRequest;
use App\Http\Requests\Printer\UpdatePrinterRequest;

use App\Services\PrinterPageService;

class PrinterService
{
    public function store(StorePrinterRequest $request): Printer
    {
        $printer = new Printer();
        $printer->id = Printer::max('id') + 1;
        $attributes = $request->validated();
        $attributes = $printer->setAttributesLowercase($attributes, $request);    
        $attributes = $printer->setOptionalAttributes($attributes, $request, $printer);

        
        $printer = Auth::user()->printers()->create(Arr::except($attributes, 'tags'));
        (new PrinterPageService)->createPrinterPages($printer, $request->printer_pages_no_sum);
        (new TagService)->generateTagsForPrinter($printer);

        return $printer;
    }

    public function update(UpdatePrinterRequest $request, Printer $printer): Printer
    {
        $attributes = $request->validated();
        $attributes = $printer->setAttributesLowercase($attributes, $request);
        $attributes = $printer->setOptionalAttributes($attributes, $request, $printer);

        (new PrinterPageService)->syncPrinterPages($printer, $request->printer_pages_no_sum);
        
        $printer->update(Arr::except($attributes, 'tags'));
        (new PrinterTagService)->syncTags($printer, $request->tags);

        return $printer;
    }
}