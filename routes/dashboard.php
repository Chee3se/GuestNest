<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('role:admin')->group(function () {
    Route::get('/dashboard/admin', [AdminController::class, 'index'])->name('admin.dashboard');
});
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('user.dashboard');
});
