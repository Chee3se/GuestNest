<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\CommentController;
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

Route::get('/user/properties', [PropertyController::class, 'userProperties'])->name('user.properties');
Route::get('/user/reservations', [ReservationController::class, 'userReservations'])->name('user.reservations');

Route::patch('/reservations/{reservation}', [ReservationController::class, 'update'])->name('reservations.update');

//Comments
Route::middleware('auth')->group(function () {
    Route::post('/comment/{id}', [CommentController::class, 'store'])->name('comments.store');
});

Route::get('/gallery/{id}', [GalleryController::class, 'index'])->name('gallery');

Route::post('/property/{id}/images', [GalleryController::class, 'upload'])->name('property.images.upload');
Route::delete('/property/{id}/images/{imageId}', [GalleryController::class, 'delete'])->name('property.images.delete');
Route::post('/property/{id}/images/{imageId}/setMain', [GalleryController::class, 'setMain'])->name('property.images.setMain');
Route::get('/property/{id}/images', [GalleryController::class, 'get'])->name('property.images');
Route::delete('/property/{id}', [PropertyController::class, 'destroy'])->name('property.delete');


require __DIR__.'/dashboard.php';

require __DIR__.'/properties.php';

require __DIR__.'/auth.php';

require __DIR__.'/reservations.php';
