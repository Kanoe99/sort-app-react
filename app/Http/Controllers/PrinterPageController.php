<?php

namespace App\Http\Controllers;
use App\Models\Printer;
use App\Models\PrinterPage;

use Illuminate\Http\Request;

class PrinterPageController extends Controller
{
    public function printed(Request $request)
    {
        $printer_id = $request->input('printer_id');
        $data = PrinterPage::where('printer_id', $printer_id)->get();
        $end_year = $request->input('end_year');
        $end_month = $request->input('end_month');

        // Check if data exists
        if ($data->isEmpty()) {
            // Handle the case where no records are found
            return response()->json(['message' => 'No records found'], 404);
        }
        
        // Return the data if found
        // return response()->json($data);
          
    
        return response()->json([
            'printer_id' => $printer_id,
            'data' => $data,
            'end_year' => $end_year,
            'end_month' => $end_month,
        ]);
    }
    // public function scanned(){
    //     dd('scanned');
    // }
}
