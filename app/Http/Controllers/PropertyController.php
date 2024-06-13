<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
        $property = Property::with(['images', 'user', 'comments'])->findOrFail($id);
        return Inertia::render('Property/Show', ['property' => $property]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'guests' => 'required|numeric',
            'bedrooms' => 'required|numeric',
            'beds' => 'required|numeric',
            'baths' => 'required|numeric',
            'address' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Create a new property with the validated data
        $property = new Property($validatedData);

        // Set the user_id field
        $property->user_id = auth()->id();

        // Set the default values
        $property->available = true;
        $property->latitude = 0;
        $property->longitude = 0;
        $property->available_from = now();
        $property->available_to = now();

        // Save the property
        $property->save();

        // Handle the image
        if($request->hasfile('image'))
        {
            // Store the image and get the path
            $path = Storage::putFile('public/properties', $request->file('image'));

            // Prepend '/storage/' to the path
            $path = '/storage/' . substr($path, strlen('public/'));

            // Create a new image
            $image = new Image();
            $image->path = $path;
            $image->property_id = $property->id;
            $image->is_main = true;

            // Save the image
            $image->save();
        }

        return redirect()->route('property.index')->with('success', 'Property created successfully.');
    }

    public function destroy($id)
    {
        $property = Property::find($id);

        // Check if the authenticated user is the owner of the property
        if (auth()->id() !== $property->user_id) {
            return response()->json(['error' => 'You are not authorized to perform this action.'], 403);
        }

        $property->delete();

        return response()->json(['message' => 'Property deleted successfully.'], 200);
    }

    public function update(Request $request, $id)
    {
        $property = Property::find($id);

        // Check if the authenticated user is the owner of the property
        if (auth()->id() !== $property->user_id) {
            return response()->json(['error' => 'You are not authorized to perform this action.'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'guests' => 'required|numeric',
            'bedrooms' => 'required|numeric',
            'beds' => 'required|numeric',
            'baths' => 'required|numeric',
            'address' => 'required',
            'image' => '',
            'available' => 'required|boolean',
        ]);

        $property->update($validatedData);

        // Handle the image
        if($request->hasfile('image'))
        {
            // Store the image and get the path
            $path = Storage::putFile('public/properties', $request->file('image'));

            // Prepend '/storage/' to the path
            $path = '/storage/' . substr($path, strlen('public/'));

            // Create a new image
            $image = new Image();
            $image->path = $path;
            $image->property_id = $property->id;
            $image->is_main = true;

            // Save the image
            $image->save();
        }

        return redirect()->route('user.dashboard')->with('success', 'Property updated successfully.');
    }
}
