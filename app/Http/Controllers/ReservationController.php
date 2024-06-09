<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request, $id)
    {
        $request->validate([
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:from',
            'guests' => 'required|integer|min:1',
        ]);

        $property = Property::findOrFail($id);

        try {
            Reservation::create([
                'property_id' => $property->id,
                'user_id' => auth()->id(),
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
                'guests' => $request->guests,
            ]);

            return redirect()->route('property.show', $property->id)
                ->with('success', 'Reservation made successfully');
        } catch (\Exception $e) {
            return redirect()->route('property.show', $property->id)
                ->with('error', 'An error occurred while making the reservation');
        }
    }

}
