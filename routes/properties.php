<?php

use App\Http\Controllers\PropertyController;
use Illuminate\Support\Facades\Route;

Route::get('/browse', [PropertyController::class, 'index'])->name('property.index');

Route::post('/api/properties', [PropertyController::class, 'all'])->name('property.all');
