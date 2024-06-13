<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Property;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $properties = Property::all();

        foreach ($properties as $property) {
            for ($i = 0; $i < rand(1, 5); $i++) {
                Image::create([
                    'property_id' => $property->id,
                    'path' => '/template-images/house-' . rand(1, 5) . '.jpg',
                    'is_main' => 0,
                ]);
            }
        }
    }
}
