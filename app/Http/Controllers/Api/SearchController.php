<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Theend;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Recherche de contenu
     */
    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query || strlen($query) < 2) {
            return response()->json([]);
        }

        // Rechercher dans les titres et les contenus
        $results = Theend::with('user')
            ->where('is_public', true)
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                    ->orWhere('content', 'like', "%{$query}%");
            })
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Transformer les résultats
        $formattedResults = $results->map(function ($theend) {
            return [
                'id' => $theend->id,
                'slug' => $theend->slug,
                'title' => $theend->title,
                'content' => $theend->content,
                'image_url' => $theend->image_url,
                'created_at' => $theend->created_at,
                'user' => [
                    'name' => $theend->user->name,
                    'avatar_url' => $theend->user->photo ?: null
                ],
                'type' => $theend->type ? $theend->type->label : 'post'
            ];
        });

        return response()->json($formattedResults);
    }
}