<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

#################################

use App\Queries\PrinterMainQuery;

class PrinterGetController{
    public function __invoke(Request $request)
    {
        return (new PrinterMainQuery($request->all()))->getPrinters($request);
    }
}