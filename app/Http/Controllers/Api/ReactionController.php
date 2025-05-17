<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reaction;
use App\Models\Theend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReactionController extends Controller
{
    /**
     * React to a Theend post
     * 
     * If user has already reacted with this type, remove it (toggle)
     * Otherwise create a new reaction
     */
    public function react(Request $request, $id)
    {
        $request->validate([
            'type' => 'required|string|in:joy,cry,fire,heart,nauseated,clap,angry,surprised'
        ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // Check if user already has any reaction on this theend
        $existingReaction = Reaction::where('user_id', $user->id)
            ->where('theend_id', $id)
            ->first();

        if ($existingReaction) {
            // Update existing reaction with new type
            $existingReaction->type = $request->type;
            $existingReaction->save();

            return response()->json([
                'message' => 'Reaction updated',
                'action' => 'updated',
                'type' => $request->type
            ]);
        }

        // Create new reaction if none exists
        $reaction = new Reaction();
        $reaction->user_id = $user->id;
        $reaction->theend_id = $id;
        $reaction->type = $request->type;
        $reaction->save();

        return response()->json([
            'message' => 'Reaction added',
            'action' => 'added',
            'type' => $request->type
        ]);
    }
}