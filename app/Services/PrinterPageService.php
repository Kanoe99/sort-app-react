<?php

namespace App\Services;

use App\Models\Printer;

class PrinterPageService
{
    public function syncPrinterPages($printer, array $requestPages): void
    {
        $printerPages = $printer->printerPages;
        $dbNonSumEntries = $printerPages->slice(1)->values();
        $requestEntryCount = count($requestPages);

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

        if ($dbNonSumEntries->count() > $requestEntryCount) {
            $dbNonSumEntries->slice($requestEntryCount)->each->delete();
        }

        $printerPages[0]->update([
            'print_pages' => $requestEntryCount === 0 ? 0 : $calculatedSum['print_pages'],
            'scan_pages' => $requestEntryCount === 0 ? 0 : $calculatedSum['scan_pages'],
        ]);
    }

    public function resetSumNoRecords(Printer $printer){
        $printerPages = $printer->printerPages;
        if(count($printerPages) === 1){
            $printerPages[0]->update([
                'print_pages' => 0,
                'scan_pages' => 0
                ]);
        }
    }

}
