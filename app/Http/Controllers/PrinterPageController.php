<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use Illuminate\Http\Request;

use App\Models\Printer;
use App\Models\PrinterPage;


class PrinterPageController extends Controller
{
    public function printed(Request $request)
    {
        $printer_id = $request->input('printer_id');
        $end_year = $request->input('end_year');
        $end_month = $request->input('end_month');
        $start_year = $request->input('start_year');
        $start_month = $request->input('start_month');

        $data = $this->filter($printer_id, [
            'end_year' => $end_year,
            'end_month' => $end_month,
            'start_year' => $start_year,
            'start_month' => $start_month,
        ]);

       $data = $data->isEmpty() ? collect([
        'message' => 'no records found'
       ]) : $data;        
    
        return response()->json([
            'print_pages' => $data->pluck('print_pages')->toArray(),
        ]);
    }

    private function filter(string $printer_id, array $range){
        $query = PrinterPage::where('printer_id', $printer_id);

        $query_end = $range['end_year'] * 12 + $range['end_month'];
        $query_start = $range['start_year'] && $range['start_month'] ? $range['start_year'] * 12 + $range['start_month'] : $query_end;
    
        $query->whereRaw('(start_year * 12 + start_month) <= ?', [$query_end])
              ->whereRaw('(end_year * 12 + end_month) >= ?', [$query_start]);

        return $query->get();
    }

    public function scanned(Request $request)
    {
        $printer_id = $request->input('printer_id');
        $end_year = $request->input('end_year');
        $end_month = $request->input('end_month');
        $start_year = $request->input('start_year');
        $start_month = $request->input('start_month');

        $data = $this->filter($printer_id, [
            'end_year' => $end_year,
            'end_month' => $end_month,
            'start_year' => $start_year,
            'start_month' => $start_month,
        ]);

       $data = $data->isEmpty() ? collect([
        'message' => 'no records found'
       ]) : $data;        
    
        return response()->json([
            'scan_pages' => $data->pluck('scan_pages')->toArray(),
        ]);
    }
}
