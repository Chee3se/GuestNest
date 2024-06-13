<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/User/Index');
    }

    public function reservations() {
        $userProperties = Property::where('user_id', auth()->id())->pluck('id');

        return Reservation::whereIn('property_id', $userProperties)
            ->with(['property', 'thumbnail', 'user'])
            ->where('approved', false)
            ->get();
    }

    public function properties() {
        return Property::where('user_id', auth()->id())
            ->with('thumbnail')
            ->get();
    }
}
