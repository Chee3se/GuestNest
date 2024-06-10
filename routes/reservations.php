<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
    Route::post('/property/{id}/reserve', [ReservationController::class, 'store'])->name('property.reserve');
});

