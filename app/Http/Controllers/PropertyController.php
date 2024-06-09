<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function all(Request $request) {
        $search = $request->get('search', '');
        $category = $request->get('category_id', '');
        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 10);

        return Property::with(['thumbnail', 'user'])
            ->where('title', 'like', "%$search%")
            ->when($category, function ($query, $category) {
                return $query->where('category_id', $category);
            })
            ->paginate($perPage, ['*'], 'page', $page);
    }
    public function index()
    {
        return Inertia::render('Property/Index');
    }

    public function show($id)
    {
        $property = Property::with(['images', 'user'])->findOrFail($id);
        return Inertia::render('Property/Show', ['property' => $property]);
    }
}
