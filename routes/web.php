<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\ReservationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('role:admin')->group(function () {
    Route::get('/admin/users', [AdminUserController::class, 'index'])->name('admin.users.index');
    Route::post('/admin/users' , [AdminUserController::class, 'store'])->name('admin.users.store');
    Route::put('/admin/users/edit/{id}', [AdminUserController::class, 'update'])->name('admin.users.update');
    Route::put('/admin/users/edit/pass/{id}', [AdminUserController::class, 'updatePass'])->name('admin.users.password');
    Route::delete('/admin/users/delete/{id}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');
});


Route::middleware('auth')->group(function () {
    // Comments
    Route::post('/comment/{id}', [CommentController::class, 'store'])->name('comments.store');

    // Gallery
    Route::get('/gallery/{id}', [GalleryController::class, 'index'])->name('gallery.index');
    Route::get('/api/gallery/{id}', [GalleryController::class, 'get'])->name('gallery.get');

    Route::post('/gallery/{id}', [GalleryController::class, 'save'])->name('gallery.save');
    Route::delete('/gallery/{id}', [GalleryController::class, 'delete'])->name('gallery.delete');
    Route::post('/gallery/{id}/main', [GalleryController::class, 'main'])->name('gallery.main');

    //Dashboard
    Route::get('/user/properties', [DashboardController::class, 'properties'])->name('user.properties');
    Route::get('/user/reservations', [DashboardController::class, 'reservations'])->name('user.reservations');
});

require __DIR__.'/dashboard.php';

require __DIR__.'/properties.php';

require __DIR__.'/auth.php';

require __DIR__.'/reservations.php';

/*
    Fix comments make coool ass rating and some message charachter limit DONE

    Make better looking reservations images and shit DONE

    Make it so users can cancel their reservations DONE

    Make user dashboard better

    Make galerry better

*/
