<?php

namespace Database\Factories;

use App\Models\Printer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PrinterPages>
 */
class PrinterPagesFactory extends Factory
{
    private int $printer_id;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start_year = rand(1925, date('Y'));
        $end_year = rand($start_year, date('Y'));

        $start_month = rand(1, 12);
        $end_month = $start_year === $end_year ? rand($start_month, 12) : rand(1, 12);

        $isSum = $this->faker->boolean();

        return [
            'printer_id' => $this->printer_id,
            'start_month' => $start_month,
            'start_year' => $start_year,
            'end_month' => !$isSum ? $end_month : null,
            'end_year' => !$isSum ? $end_year : null,
            'isSum' => $isSum,
            'print_pages' => rand(1, 99999),
            'scan_pages' => rand(1, 99999),
        ];
    }
    public function getPrinterId(int $printerId) :self
    {
        $this->printer_id = $printerId;
        return $this;
    }
    public function checkWithDD(string $value){
        dd($value . ' is passed');
    }
    public function generateData(): self
    {
        $count = rand(1, 10);
        dd($this->printer_id); //works here
        $rows = $this->count($count)->create(); // Persists rows to DB
        dd($this->printer_id); // breaks here
        $arr = $rows->pluck('print_pages')->toArray(); // Extracts 'print_pages' values


        dd($arr);

        return $this;
    }
    
}
