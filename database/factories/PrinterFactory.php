<?php

namespace Database\Factories;

use App\Models\Printer;
use App\Services\TagService;
use Illuminate\Database\Eloquent\Factories\Factory;

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
        $prefixes = ['Принтер', 'HP'];
        $names = ['Samsung', 'LaserJet'];

        $randomPrefixKey = array_rand($prefixes);
        $randomNameKey = array_rand($names);

        $model = $prefixes[$randomPrefixKey] . ' ' . $names[$randomNameKey] . ' ' . strval(rand(100, 999));

        $statuses = ['подготовка к списанию', 'в эксплуатации', 'требуется ремонт', 'резерв'];

        return [
            'type' => 'принтер',
            'counterDate' => now()->format('Y-m-d H:i:s'),
            'fixDate' => now()->subDays(rand(1, 365))->format('Y-m-d'),
            'model' => $model,
            'number' => fake()->unique()->numberBetween(1000, 9999),
            'location' => 'Location ' . rand(1, 100),
            'IP' => $this->faker->unique()->ipv4(),
            'status' => $statuses[array_rand($statuses)],
            'comment' => $this->faker->text(200),
            'attention' => $this->faker->boolean,
            'counter' => $this->faker->numberBetween(100, 9999),
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
