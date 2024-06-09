<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $available_from = $this->faker->dateTimeBetween('-1 month', '+1 month');
        $available_to = (clone $available_from)->modify('+' . $this->faker->numberBetween(1, 30) . ' days');

        $beds = $this->faker->numberBetween(1, 5);
        $bedrooms = $this->faker->numberBetween(1, $beds);
        $guests = $this->faker->numberBetween($beds, $beds * 2);

        return [
            'title' => ucfirst(implode(' ', $this->faker->words($this->faker->numberBetween(1, 3)))),
            'description' => $this->faker->sentence(20),
            'category_id' => $this->faker->numberBetween(1, 5),
            'user_id' => $this->faker->numberBetween(2, 11),
            'price' => $this->faker->numberBetween(10, 1000),
            'guests' => $guests,
            'bedrooms' => $bedrooms,
            'beds' => $beds,
            'baths' => $this->faker->numberBetween(1, 5),
            'available' => $this->faker->boolean(),
            'available_from' => $available_from->format('Y-m-d'),
            'available_to' => $available_to->format('Y-m-d'),
            'address' => $this->faker->address(),
            'latitude' => $this->faker->latitude(),
            'longitude' => $this->faker->longitude(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($property) {
            Image::factory()->create([
                'property_id' => $property->id,
            ]);
        });
    }
}
