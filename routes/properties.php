<?php

use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ReservationController;
use App\Http\Middleware\CheckPropertyOwner;
use Illuminate\Support\Facades\Route;

// Index
Route::get('/browse', [PropertyController::class, 'index'])->name('property.index');

// Read
Route::get('/property/{id}', [PropertyController::class, 'show'])->name('property.show');

// Create
Route::middleware('auth')->group(function () {
    Route::get('/property/create', [PropertyController::class, 'create'])->name('property.create');
    Route::post('/property', [PropertyController::class, 'store'])->name('property.store');
});

// Update
Route::middleware(CheckPropertyOwner::class)->group(function () {
    Route::get('/property/{id}/edit', [PropertyController::class, 'edit'])->name('property.edit');
    Route::put('/property/{id}', [PropertyController::class, 'update'])->name('property.update');
});

// Delete
Route::middleware(CheckPropertyOwner::class)->group(function () {
    Route::delete('/property/{id}', [PropertyController::class, 'destroy'])->name('property.destroy');
});

// API
Route::post('/api/properties', [PropertyController::class, 'all'])->name('property.all');

// Reserve
Route::post('/property/{id}/reserve', [ReservationController::class, 'store'])->name('property.reserve');
