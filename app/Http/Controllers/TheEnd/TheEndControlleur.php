<?php

namespace App\Http\Controllers\TheEnd;

use App\Models\Theend;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TheEndControlleur extends Controller
{
    public function index()
    {
        return Inertia::render('TheEnd/Index', [
            'theends' => Theend::with('user', 'type')->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('TheEnd/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type_id' => 'required|exists:types,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_public' => 'boolean',
            'tone' => 'required|string',
            'image_url' => 'nullable|url',
            'gif_url' => 'nullable|url',
            'sound_url' => 'nullable|url',
        ]);

        $data['slug'] = Str::slug($data['title']);
        Theend::create($data);

        return redirect()->route('theends.index')->with('success', 'TheEnd created.');
    }

    public function edit(Theend $theend)
    {
        return Inertia::render('TheEnd/Edit', ['theend' => $theend]);
    }

    public function update(Request $request, Theend $theend)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_public' => 'boolean',
            'tone' => 'required|string',
            'image_url' => 'nullable|url',
            'gif_url' => 'nullable|url',
            'sound_url' => 'nullable|url',
        ]);

        $data['slug'] = Str::slug($data['title']);
        $theend->update($data);

        return redirect()->route('theends.index')->with('success', 'TheEnd updated.');
    }

    public function destroy(Theend $theend)
    {
        $theend->delete();
        return redirect()->route('theends.index')->with('success', 'TheEnd deleted.');
    }
}
