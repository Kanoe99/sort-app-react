<?php

namespace App\Services;

use App\Models\Printer;

class PrinterPageService
{
    private $now;

    function __construct(){
        $this->now = [
            "month" => (int )date("m") - 1,
            "year" => (int) date("Y"),
        ];
    }
    
  
    public function syncPrinterPages($printer, array $requestPages): void
    {
        $printerPages = $printer->printerPages;
        $dbNonSumEntries = $printerPages->slice(1)->values();
        $requestEntryCount = count($requestPages);

        $lastNoSumRequestEntry = $requestPages[count($requestPages) - 1];
        $firstNoSumRequestEntry = $requestPages[0];

        // dd($requestPages);

        //take those values from the request
        // $sumStartDates = $requestPages[0]->only(['start_month', 'start_year']);
        // $sumEndDates = $requestPages[count($printerPages) - 1]->only(['end_month', 'end_year']);

        // $sumDates = array_merge($sumStartDates, $sumEndDates);

        // dd($sumDates);
        
        // dd($requestPages);

        //somehow i get something here as reversed

        $calculatedSum = ['print_pages' => 0, 'scan_pages' => 0];
        foreach ($requestPages as $index => $pageData) {
            $calculatedSum['print_pages'] += $pageData['print_pages'];
            $calculatedSum['scan_pages'] += $pageData['scan_pages'];

            $dbEntry = $dbNonSumEntries->get($index);

            if ($dbEntry) {
                if ($pageData['print_pages'] !== null || $pageData['scan_pages'] !== null) {
                    $dbEntry->update([
                        'print_pages' => $pageData['print_pages'] ?? '',
                        'scan_pages' => $pageData['scan_pages'] ?? '',
                        'start_month' => $pageData['start_month'],
                        'start_year' => $pageData['start_year'],
                        'end_month' => $pageData['end_month'],
                        'end_year' => $pageData['end_year'],
                    ]);
                } else {
                    $dbEntry->delete();
                }
            } else {
                if ($pageData['print_pages'] !== null || $pageData['scan_pages'] !== null) {
                    $printer->printerPages()->create([
                        'printer_id' => $printer->id,
                        'start_month' => $pageData['start_month'],
                        'start_year' => $pageData['start_year'],
                        'end_month' => $pageData['end_month'],
                        'end_year' => $pageData['end_year'],
                        'isSum' => 0,
                        'print_pages' => $pageData['print_pages'] ?? '',
                        'scan_pages' => $pageData['scan_pages'] ?? '',
                    ]);
                }
            }
        }

        //update dates for sums on save

        if ($dbNonSumEntries->count() > $requestEntryCount) {
            $dbNonSumEntries->slice($requestEntryCount)->each->delete();
        }

        $printerPages[0]->update([
            'print_pages' => $requestEntryCount === 0 ? 0 : $calculatedSum['print_pages'],
            'scan_pages' => $requestEntryCount === 0 ? 0 : $calculatedSum['scan_pages'],
            'end_month' => $lastNoSumRequestEntry['end_month'],
            'end_year' => $lastNoSumRequestEntry['end_year'],
            'start_month' => $firstNoSumRequestEntry['start_month'],
            'start_year' => $firstNoSumRequestEntry['start_year'],
        ]);
    }

    public function resetSumNoRecords(Printer $printer){
        $printerPages = $printer->printerPages;
        if(count($printerPages) === 1){
            $printerPages[0]->update([
                'print_pages' => 0,
                'scan_pages' => 0,
                'start_month' => $this->now['month'],
                'start_year' => $this->now['year'],
                'end_month' => $this->now['month'],
                'end_year' => $this->now['year']
                ]);
        }
    }

}
