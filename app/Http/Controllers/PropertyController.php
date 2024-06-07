<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function all(Request $request) {
        $query = Property::query();

        return $query->paginate(10);
    }
    public function index()
    {
        return Inertia::render('Property/Index');
    }
}
