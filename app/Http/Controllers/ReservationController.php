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

        $existingReservation = Reservation::where('property_id', $property->id)
            ->where('user_id', auth()->id())
            ->first();

        if ($existingReservation) {
            return response()->json([
                'status' => 'error',
                'message' => 'You have already created a reservation for this listing!'
            ]);
        }

        try {
            Reservation::create([
                'property_id' => $property->id,
                'user_id' => auth()->id(),
                'check_in' => $request->get('check_in'),
                'check_out' => $request->get('check_out'),
                'guests' => $request->get('guests'),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Reservation made successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while making the reservation'
            ]);
        }
    }

}
