<?php

namespace App\Http\Controllers;

use App\Models\Theend;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PopularController extends Controller
{
    /**
     * Display popular content grouped by categories
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        try {
            // Get all categories (types)
            $types = Type::all();

            $categorizedContent = [];

            foreach ($types as $type) {
                // For each type, get popular theends
                // Popular = most reactions
                $theends = Theend::with('user')
                    ->with('type')
                    ->where('type_id', $type->id)
                    ->where('is_public', true)
                    ->withCount(['reactions', 'comments', 'views'])
                    ->orderBy('reactions_count', 'desc')
                    ->limit(5)
                    ->get();

                if ($theends->count() > 0) {
                    // Transform the results
                    $transformedTheends = $theends->map(function ($theend) {
                        return [
                            'type' => 'theend',
                            'id' => $theend->id,
                            'slug' => $theend->slug,
                            'title' => $theend->title ?: 'Sans titre',
                            'content' => Str::limit($theend->content, 200),
                            'image_url' => $theend->image_url,
                            'created_at' => $theend->created_at,
                            'user' => [
                                'name' => $theend->user ? $theend->user->name : 'Anonyme',
                                'avatar_url' => $theend->user ? $theend->user->photo : null
                            ],
                            'content_type' => $theend->type ? $theend->type->label : 'post',
                            'reactions_count' => $theend->reactions_count,
                            'comments_count' => $theend->comments_count,
                            'views_count' => $theend->views_count
                        ];
                    });

                    // Add to categorized content if there are results
                    $categorizedContent[] = [
                        'type_id' => $type->id,
                        'type_label' => $type->label,
                        'theends' => $transformedTheends
                    ];
                }
            }

            // Also get overall most popular content
            $mostPopular = Theend::with('user')
                ->with('type')
                ->where('is_public', true)
                ->withCount(['reactions', 'comments', 'views'])
                ->orderBy('reactions_count', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($theend) {
                    return [
                        'type' => 'theend',
                        'id' => $theend->id,
                        'slug' => $theend->slug,
                        'title' => $theend->title ?: 'Sans titre',
                        'content' => Str::limit($theend->content, 200),
                        'image_url' => $theend->image_url,
                        'created_at' => $theend->created_at,
                        'user' => [
                            'name' => $theend->user ? $theend->user->name : 'Anonyme',
                            'avatar_url' => $theend->user ? $theend->user->photo : null
                        ],
                        'content_type' => $theend->type ? $theend->type->label : 'post',
                        'reactions_count' => $theend->reactions_count,
                        'comments_count' => $theend->comments_count,
                        'views_count' => $theend->views_count
                    ];
                });

            return Inertia::render('popular/PopularPage', [
                'categorizedContent' => $categorizedContent,
                'mostPopular' => $mostPopular
            ]);

        } catch (\Exception $e) {
            Log::error('Error loading popular content: ' . $e->getMessage());
            return Inertia::render('popular/PopularPage', [
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display popular content for a specific category
     *
     * @param int $typeId
     * @return \Inertia\Response
     */
    public function showCategory($typeId)
    {
        try {
            $type = Type::findOrFail($typeId);

            $theends = Theend::with('user')
                ->with('type')
                ->where('type_id', $type->id)
                ->where('is_public', true)
                ->withCount(['reactions', 'comments', 'views'])
                ->orderBy('reactions_count', 'desc')
                ->paginate(15);

            // Transform the results
            $transformedTheends = $theends->map(function ($theend) {
                return [
                    'type' => 'theend',
                    'id' => $theend->id,
                    'slug' => $theend->slug,
                    'title' => $theend->title ?: 'Sans titre',
                    'content' => Str::limit($theend->content, 200),
                    'image_url' => $theend->image_url,
                    'created_at' => $theend->created_at,
                    'user' => [
                        'name' => $theend->user ? $theend->user->name : 'Anonyme',
                        'avatar_url' => $theend->user ? $theend->user->photo : null
                    ],
                    'content_type' => $theend->type ? $theend->type->label : 'post',
                    'reactions_count' => $theend->reactions_count,
                    'comments_count' => $theend->comments_count,
                    'views_count' => $theend->views_count
                ];
            });

            return Inertia::render('popular/CategoryPage', [
                'type' => $type,
                'theends' => $transformedTheends,
                'pagination' => [
                    'total' => $theends->total(),
                    'per_page' => $theends->perPage(),
                    'current_page' => $theends->currentPage(),
                    'last_page' => $theends->lastPage()
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error loading category: ' . $e->getMessage());
            return Inertia::render('popular/CategoryPage', [
                'error' => $e->getMessage()
            ]);
        }
    }
}
