<?php

namespace App\Http\Controllers;

use App\Models\Theend;
use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Available reaction types from migration
    private $reactionTypes = ['joy', 'cry', 'fire', 'heart', 'nauseated', 'clap', 'angry', 'surprised'];

    // Get the total count of reactions for display in UI 
    // and map them to our UI categories (likes, comments, shares)
    private function getReactionCounts($reactions)
    {
        return [
            'likes' => $reactions->whereIn('type', ['heart', 'joy', 'clap'])->count(),
            'shares' => $reactions->whereIn('type', ['fire', 'surprised'])->count(),
            // Negative reactions count
            'negative' => $reactions->whereIn('type', ['cry', 'nauseated', 'angry'])->count(),
            'total' => $reactions->count()
        ];
    }

    public function index()
    {
        $user = Auth::user();

        $theends = Theend::with(['user', 'type', 'comments', 'reactions'])
            ->where('is_public', true)
            ->where('is_draft', false)
            ->orderBy('created_at', 'desc')
            ->take(30)
            ->get()
            ->map(function ($theend) use ($user) {
                // Get reaction stats
                $reactionStats = $this->getReactionCounts($theend->reactions);
                $commentCount = $theend->comments->count();
                $viewsCount = $theend->views()->count();

                // Get the current user's reaction for this post (if any)
                $userReaction = null;
                if ($user) {
                    $userReaction = $theend->reactions
                        ->where('user_id', $user->id)
                        ->first();
                }

                return [
                    'id' => $theend->id,
                    'slug' => $theend->slug,
                    'author' => [
                        'id' => $theend->user->id,
                        'name' => $theend->user->name,
                        'image' => $theend->user->photo ?? '/placeholder.svg',
                        'type' => $theend->type->label
                    ],
                    'content' => [
                        'title' => $theend->title,
                        'description' => $theend->content,
                        'image' => $theend->image_url ?? $theend->gif_url ?? '/images/placeholder-theend.jpg',
                        'tone' => $theend->tone
                    ],
                    'stats' => [
                        'likes' => $reactionStats['likes'],
                        'comments' => $commentCount,
                        'shares' => $reactionStats['shares'],
                        'total_reactions' => $reactionStats['total'],
                        'views' => $viewsCount
                    ],
                    'user_reaction' => $userReaction ? $userReaction->type : null,
                    'created_at' => $theend->created_at->diffForHumans()
                ];
            });

        return Inertia::render('dashboard', [
            'theends' => $theends
        ]);
    }
}