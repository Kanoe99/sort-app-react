<?php

namespace App\Queries;

use Illuminate\Http\Request;

#################################

use App\Models\Printer;

class PrinterMainQuery{
    public function getPrinters(Request $request)
    {
        $perPage = $request->input('perPage', 2);
        $page = $request->input('page', 1);
    
        $printers = Printer::latest()->paginate($perPage, ['*'], 'page', $page);

        $printers->load([
            'tags',
            'sumPages',
            'threeLastPages'
        ]);
    
        return response()->json([
            'printers' => $printers->items(), 
            'current_page' => $printers->currentPage(),
            'last_page' => $printers->lastPage(),
        ]);
    }
}