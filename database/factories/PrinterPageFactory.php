<?php

namespace Database\Factories;

use App\Models\Printer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PrinterPage>
 */
class PrinterPageFactory extends Factory
{
    private ?int $printer_id = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {}

    protected function customDefinition(int $print_pages, int $scan_pages, int $start_year, int $end_year, bool $isSum = false):array
    {
        $start_year = rand($start_year, $end_year);

        $start_month = rand(0, 11);
        $end_month = $start_year === $end_year ? rand($start_month, 11) : rand(0, 11);

        // Ensure printer_id is set before returning data
        if ($this->printer_id === null) {
            throw new \Exception('Printer ID is not set.');
        }

        return [
            'printer_id' => $this->printer_id,
            'start_month' => $start_month,
            'start_year' => $start_year,
            'end_month' => $end_month,
            'end_year' => $end_year,
            'isSum' => $isSum,
            'print_pages' => strval($print_pages),
            'scan_pages' => strval($scan_pages),
        ];
    }

    public function getPrinterId(int $printerId): self
    {
        $this->printer_id = $printerId;
        return $this;
    }

    public function checkWithDD(string $value)
    {
        dd($value . ' is passed');
    }

    public function generateData()
{
    $count = rand(1, 10);

    $printPages = [];
    $scanPages = [];
    $years = [1925];

    $totalPrintPages = 0;
    $totalScanPages = 0;
    $rows = [];

    for ($i = 0; $i < $count; $i++) {
        $printPages[$i] = rand(1, 99999);
        $scanPages[$i] = rand(1, 99999);

        $totalPrintPages += $printPages[$i];
        $totalScanPages += $scanPages[$i];

        if (!isset($years[$i + 1])) {
            $nextYear = rand($years[$i], $years[$i] + 10);
            while (in_array($nextYear, $years)) {
                $nextYear = rand($years[$i], $years[$i] + 50);
            }
            $years[] = $nextYear;
        }
    }

    // First, create all the regular rows
    for ($i = 0; $i < $count; $i++) {
        $rows[] = $this->customDefinition(
            $printPages[$i],
            $scanPages[$i],
            $years[$i],
            $years[$i + 1]
        );
    }

    // Now create the sum row
    $first = $rows[0];
    $last = $rows[$count - 1];

    $sumRow = [
        'printer_id' => $this->printer_id,
        'start_month' => $first['start_month'],
        'start_year' => $first['start_year'],
        'end_month' => $last['end_month'],
        'end_year' => $last['end_year'],
        'isSum' => true,
        'print_pages' => strval($totalPrintPages),
        'scan_pages' => strval($totalScanPages),
    ];

    // Add sum at the BEGINNING
    array_unshift($rows, $sumRow);

    Printer::find($this->printer_id)->printerPages()->createMany($rows);
}

}
