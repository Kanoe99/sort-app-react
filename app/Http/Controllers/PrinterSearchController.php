<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

#################################

use App\Queries\PrinterSearchQuery;

class PrinterSearchController{
    public function __invoke(Request $request)
    {
        return (new PrinterSearchQuery($request->all()))->searchPrinters($request);
    }
}