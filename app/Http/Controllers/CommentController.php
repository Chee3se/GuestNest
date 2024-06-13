<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, $id)
    {
        $validatedData = $request->validate([
            'content' => 'required|string|max:100',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $comment = Comment::create([
            'content' => $validatedData['content'],
            'rating' => $validatedData['rating'],
            'property_id' => $id,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Comment created successfully',
            'comment' => Comment::with('user')->findOrFail($comment->id)
        ]);
    }
}
