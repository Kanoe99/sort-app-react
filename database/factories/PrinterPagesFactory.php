<?php

namespace Database\Factories;

use App\Models\Printer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PrinterPages>
 */
class PrinterPagesFactory extends Factory
{
    private ?int $printer_id = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {}

    protected function customDefinition(int $print_pages, int $scan_pages, int $end_year, bool $isSum = false):array
    {
        $start_year = rand($end_year - 10, $end_year);

        $start_month = rand(1, 12);
        $end_month = $start_year === $end_year ? rand($start_month, 12) : rand(1, 12);

        // Ensure printer_id is set before returning data
        if ($this->printer_id === null) {
            throw new \Exception('Printer ID is not set.');
        }

        return [
            'printer_id' => $this->printer_id,
            'start_month' => !$isSum ? $start_month : null,
            'start_year' => !$isSum ? $start_year : null,
            'end_month' => $end_month,
            'end_year' => $end_year,
            'isSum' => $isSum,
            'print_pages' => $print_pages,
            'scan_pages' => $scan_pages,
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

        $rows = [];

        $printPages = [];
        $scanPages = [];
        $end_years = [1935];

        $totalPrintPages = 0;
        $totalScanPages = 0;
        
        
        for ($i = 0; $i < $count - 1; $i++)
        {
            $printPages[$i] = rand(1, 99999);
            $scanPages[$i] = rand(1, 99999);
            
            $totalPrintPages += $printPages[$i];
            $totalScanPages += $scanPages[$i];

            $end_years[$i + 1] = rand($end_years[$i], $end_years[$i] + 10); 
        }
        
        $rows[] = $this->customDefinition($totalPrintPages, $totalScanPages, end($end_years), true);
        for($i = 0; $i < $count - 1; $i++)
        {
            $rows[] = $this->customDefinition($printPages[$i], $scanPages[$i], $end_years[$i + 1]);
        }


        $createdRows = Printer::find($this->printer_id)->printerPages()->createMany($rows);
    }
}
