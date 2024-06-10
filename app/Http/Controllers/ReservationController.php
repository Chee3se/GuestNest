<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('property')
            ->where('user_id', auth()->id())
            ->get();

        return Inertia::render('Reservations/Index', [
            'reservations' => $reservations
        ]);
    }
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

    public function update(Request $request, Reservation $reservation)
    {
        // Check if the authenticated user is the owner of the property
        if (auth()->id() !== $reservation->property->user_id) {
            return response()->json(['error' => 'You do not have permission to approve this reservation'], 403);
        }


        // Validate the request
        $validatedData = $request->validate([
            'approved' => 'required|boolean',
        ]);

        // Update the reservation
        $reservation->approved = $validatedData['approved'];
        $reservation->save();

        return response()->json(['message' => 'Reservation updated successfully']);
    }

    public function userReservations()
    {
        $userProperties = Property::where('user_id', auth()->id())->pluck('id');

        return Reservation::whereIn('property_id', $userProperties)
            ->with('property')
            ->get();
    }

}
