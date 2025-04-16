<?php

namespace App\Http\Controllers;


use DateTime;
use Inertia\Inertia;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

#######################################

use App\Models\Tag;
use App\Models\Printer;
use App\Models\PrinterPage;

use App\Http\Requests\Printer\StorePrinterRequest;
use App\Http\Requests\Printer\UpdatePrinterRequest;

use App\Services\TagService;
use App\Services\DepartmentService;
use App\Services\PrinterTagService;
use App\Services\DataRefreshService;
use App\Services\PrinterPageService;
use App\Services\InertiaPrinterService;

class PrinterController extends Controller
{
 
  public function index()
    {
        return Inertia::render('Printer/Index', (new InertiaPrinterService)->index()); 
    }

  public function edit(Printer $printer)
    {
        (new PrinterPageService)->resetSumNoRecords($printer);

        return Inertia::render('Printer/Edit', (new InertiaPrinterService)->edit($printer));
    }    

  public function create()
    {
        return Inertia::render('Printer/Create', (new InertiaPrinterService)->create());
    }

  public function store(Request $request)
    {

      $storePrinterRequest = new StorePrinterRequest();

      $attributes = $request->validate($storePrinterRequest->rules(), $storePrinterRequest->messages());
    
      $attributes = $printer->setAttributesLowercase($attributes, $request);
    
      $attributes = $printer->setOptionalAttributes($attributes, $request, $printer, $updatePrinterRequest);
    
      $printer = Auth::user()->printers()->create(Arr::except($attributes, 'tags'));
      $tagService = new TagService();
      $tagService->generateTagsForPrinter($printer);
    
      return redirect('/main')->with(['success' => 'Принтер добавлен.', 'refreshed' => true, 'time'=>time()]);
    }

  public function update(Request $request, Printer $printer)
    {
        $refreshed = (new DataRefreshService)->refreshed($request, $printer->id);

        $updatePrinterRequest = new UpdatePrinterRequest();
    
        $attributes = $request->validate($updatePrinterRequest->rules(), $updatePrinterRequest->messages());

        $attributes = $printer->setAttributesLowercase($attributes, $request);
    
        $attributes = $printer->setOptionalAttributes($attributes, $request, $printer, $updatePrinterRequest);

        $printerPageService = new PrinterPageService();
        $printerPageService->syncPrinterPages($printer, $request->printer_pages_no_sum);
        
        $printer->update(Arr::except($attributes, 'tags'));
        $tagService = new PrinterTagService();
        $tagService->syncTags($printer, $request->tags);
        
    
        return redirect()->back()->with(['success' => 'Данные обновлены.', 'refreshed' => $refreshed, 'time' => time()
        ]);
    }

  public function destroy(Printer $printer)
    {
      $printer->delete();
      return redirect('/main')->with(['success' => 'Принтер удалён.', 'refreshed' => true, 'time'=> time()]);        
    }
}