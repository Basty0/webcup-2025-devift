<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Theend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NewSearchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Méthode de recherche simplifiée pour les TheEnd
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $query = $request->input('q');

        // Log pour le débogage
        Log::info('Search query: ' . $query);

        if (!$query || strlen($query) < 2) {
            return response()->json([]);
        }

        try {
            $results = Theend::with('user')
                ->with('type')
                ->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('content', 'like', "%{$query}%");
                })
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            Log::info('Search results count: ' . $results->count());

            // Pour le débogage
            if ($results->isEmpty()) {
                Log::info('No results found');
                // Retourner des données de test si aucun résultat
                return response()->json([
                    [
                        'id' => 1,
                        'slug' => 'test-theend',
                        'title' => 'TheEnd de test',
                        'content' => 'Ceci est un TheEnd de test pour ' . $query,
                        'created_at' => now(),
                        'user' => [
                            'name' => 'Utilisateur Test',
                            'avatar_url' => null
                        ],
                        'type' => [
                            'label' => 'post'
                        ]
                    ]
                ]);
            }

            // Transformer les résultats
            $data = $results->map(function ($theend) {
                return [
                    'id' => $theend->id,
                    'slug' => $theend->slug,
                    'title' => $theend->title ?: 'Sans titre',
                    'content' => $theend->content,
                    'image_url' => $theend->image_url,
                    'created_at' => $theend->created_at,
                    'user' => [
                        'name' => $theend->user ? $theend->user->name : 'Anonyme',
                        'avatar_url' => $theend->user ? $theend->user->photo : null
                    ],
                    'type' => $theend->type ? $theend->type->label : 'post'
                ];
            });

            return response()->json($data);

        } catch (\Exception $e) {
            Log::error('Search error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}