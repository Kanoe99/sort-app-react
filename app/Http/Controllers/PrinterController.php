<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

#######################################

use App\Models\Printer;

use App\Http\Requests\Printer\StorePrinterRequest;
use App\Http\Requests\Printer\UpdatePrinterRequest;

use App\Services\PrinterService;
use App\Services\DataRefreshService;
use App\Services\InertiaPrinterService;

class PrinterController extends Controller
{ 
  public function index()
    {
        return Inertia::render('Printer/Index', (new InertiaPrinterService)->index()); 
    }

  public function edit(Printer $printer)
    {
      return Inertia::render('Printer/Edit', (new InertiaPrinterService)->edit($printer));
    }    

  public function create()
    {
        return Inertia::render('Printer/Create', (new InertiaPrinterService)->create());
    }

    //change to StorePrinterRequest
  public function store(StorePrinterRequest $request)
    {        
      // dd($request->all());
      $printer = (new PrinterService)->store($request);
    
      return redirect('/main')->with(['success' => 'Принтер добавлен.', 'refreshed' => true, 'time'=>time()]);
    }

  public function update(UpdatePrinterRequest $request, Printer $printer)
    {
        // dd($request->all());

        $refreshed = (new DataRefreshService)->refreshed($request, $printer->id);
        $printer = (new PrinterService)->update($request, $printer);
    
        return redirect()->back()->with(['success' => 'Данные обновлены.', 'refreshed' => $refreshed, 'time' => time()
        ]);
    }

  public function destroy(Printer $printer)
    {
      $printer->delete();
      return redirect('/main')->with(['success' => 'Принтер удалён.', 'refreshed' => true, 'time'=> time()]);        
    }
}