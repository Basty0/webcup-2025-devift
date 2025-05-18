<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Theend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

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
     * @param string $query
     * @return \Inertia\Response
     */
    public function search($query)
    {


        if (!$query || strlen($query) < 2) {
            return Inertia::render('resulatrecherche/resulats-recherche', [
                'results' => [],
                'query' => $query
            ]);
        }

        try {
            // Recherche dans les TheEnds
            $theendResults = Theend::with('user')
                ->with('type')
                ->with('comments')
                ->with('reactions')
                ->where(function ($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                        ->orWhere('content', 'like', "%{$query}%");
                })
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            // Recherche dans les utilisateurs 
            $userResults = User::where('name', 'like', "%{$query}%")
                ->orWhere('email', 'like', "%{$query}%")
                ->orWhere('bio', 'like', "%{$query}%")
                ->limit(5)
                ->get();

            Log::info('Search results - TheEnds: ' . $theendResults->count() . ', Users: ' . $userResults->count());

            // Transformer les résultats TheEnd
            $theendData = $theendResults->map(function ($theend) {
                return [
                    'type' => 'theend',
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
                    'content_type' => $theend->type ? $theend->type->label : 'post',
                    'reactions_count' => $theend->reactions->count(),
                    'comments_count' => $theend->comments->count()
                ];
            });

            // Transformer les résultats User
            $userData = $userResults->map(function ($user) {
                return [
                    'type' => 'user',
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'bio' => $user->bio,
                    'slug' => $user->slug,
                    'avatar_url' => $user->photo,
                    'created_at' => $user->created_at
                ];
            });

            // Combiner les résultats
            $combinedResults = [
                'theends' => $theendData,
                'users' => $userData
            ];

            return Inertia::render('resulatrecherche/resulats-recherche', [
                'results' => $combinedResults,
                'query' => $query
            ]);

        } catch (\Exception $e) {
            Log::error('Search error: ' . $e->getMessage());
            return Inertia::render('resulatrecherche/resulats-recherche', [
                'error' => $e->getMessage(),
                'query' => $query
            ]);
        }
    }
}