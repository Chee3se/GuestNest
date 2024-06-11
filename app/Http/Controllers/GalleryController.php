<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index($id)
    {
        return Inertia::render('Property/Gallery', [
            'property' => Property::with('images')->findOrFail($id)
        ]);
    }

    public function upload(Request $request, $id)
    {
        $property = Property::find($id);

        // Check if the authenticated user is the owner of the property
        if (auth()->id() !== $property->user_id) {
            return back()->with('error', 'You are not authorized to perform this action.');
        }

        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        // Store the image and get the path
        $path = Storage::putFile('public/images', $request->file('image'));

        // Prepend '/storage/' to the path
        $path = '/storage/' . substr($path, strlen('public/'));

        $property->images()->create(['path' => $path]);

        return back()->with('success','Image uploaded successfully.');
    }

    public function delete($id, $imageId)
    {
        $property = Property::find($id);

        // Check if the authenticated user is the owner of the property
        if (auth()->id() !== $property->user_id) {
            return back()->with('error', 'You are not authorized to perform this action.');
        }

        $image = $property->images()->find($imageId);

        if ($image) {
            // Delete the image from the storage
            Storage::delete('public/' . substr($image->path, strlen('/storage/')));

            $image->delete();
            return back()->with('success','Image deleted successfully.');
        }

        return back()->with('error','Image not found.');
    }

    public function setMain($id, $imageId)
    {
        $property = Property::find($id);

        // Check if the authenticated user is the owner of the property
        if (auth()->id() !== $property->user_id) {
            return back()->with('error', 'You are not authorized to perform this action.');
        }

        $image = $property->images()->find($imageId);

        if ($image) {
            // Unset the main image flag for all images of the property
            $property->images()->update(['is_main' => false]);

            // Set the main image flag for the selected image
            $image->is_main = true;
            $image->save();

            return back()->with('success','Main image set successfully.');
        }

        return back()->with('error','Image not found.');
    }

    public function get($id)
    {
        $property = Property::with('images')->find($id);

        // Check if the property exists
        if (!$property) {
            return response()->json(['error' => 'Property not found.'], 404);
        }

        // Return the images of the property
        return response()->json(['images' => $property->images], 200);
    }
}
