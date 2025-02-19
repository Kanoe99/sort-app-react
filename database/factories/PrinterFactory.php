<?php

namespace Database\Factories;

use App\Models\Printer;
use App\Services\TagService;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Services\DepartmentService;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Printer>
 */
class PrinterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $prefixes = ['принтер', 'HP', 'станок'];
        $names = ['Samsung', 'LaserJet'];

        $randomPrefixKey = array_rand($prefixes);
        $randomNameKey = array_rand($names);

        $model = $prefixes[$randomPrefixKey] . ' ' . $names[$randomNameKey] . ' ' . strval(rand(100, 999));

        $statuses = ['подготовка к списанию', 'в эксплуатации', 'требуется ремонт', 'резерв'];

        // Decide whether to generate IPv4 or IPv6
        $isIPv4 = $this->faker->boolean();
        $ip = $isIPv4 ? $this->faker->unique()->ipv4() : $this->faker->unique()->ipv6();

        $types = ['принтер', 'печатная машинка', 'станок'];

        $departments = (new DepartmentService)->getAll();      
        $department_head = array_rand($departments);
        $department = $departments[$department_head];

        $network_capable = ['Сетевой', 'Нет возможности', 'Есть возможность'];
        $fixDate = [now()->subDays(rand(1, 365))->format('Y-m-d'), now()->subDays(rand(1, 365))->format('Y-m-d'), null];

        $isLocal = $this->faker->boolean();
        $PC_name = $isLocal ? 'p66-ws' . strval($this->faker->numberBetween(123456, 934535)) : null;

        return [
            'type' => $types[array_rand($types)],
            'department' => $department,
            'department_head' => $department_head,
            'network_capable' =>$network_capable[array_rand($network_capable)],
            'isLocal' => $isLocal,
            'PC_name' => $PC_name,
            'counterDate' => now()->format('Y-m-d H:i:s'),
            'fixDate' =>  $fixDate[array_rand($fixDate)],
            'model' => $model,
            'number' => $this->faker->unique()->numberBetween(1000, 9999),
            'location' => 'Location ' . rand(1, 100),
            'status' => $statuses[array_rand($statuses)],
            'comment' => $this->faker->text(200),
            'attention' => $this->faker->boolean(),
            'counter' => $this->faker->numberBetween(100, 9999),
            'isIPv4' => $isIPv4,
            'IP' => $ip,
        ];
    }

    /**
     * Generate tags for the printer after creation.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function withTags(): Factory
    {
        return $this->afterCreating(function (Printer $printer) {
            $tagService = new TagService();
            $tagService->generateTagsForPrinter($printer);
        });
    }
}
