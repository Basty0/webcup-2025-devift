<?php

namespace App\Http\Controllers;

use App\Models\Theend;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TheEndController extends Controller
{
    public function createStep1()
    {
        $types = Type::all();
        return Inertia::render('theend/step1', [
            'types' => $types
        ]);
    }

    public function storeStep1(Request $request)
    {
        $validated = $request->validate([
            'type_id' => 'required|exists:types,id',
            'tone' => 'required|string',
        ]);


        $theend = new Theend();
        $theend->user_id = auth()->id();
        $theend->type_id = $validated['type_id'];

        $theend->tone = $validated['tone'];

        $theend->is_draft = true;

        try {
            $theend->save();
        } catch (\Exception $e) {
            dd($e);
        }
        return redirect()->route('theend.step2', ['theend' => $theend->slug]);
    }

    public function createStep2(Theend $theend)
    {
        return Inertia::render('theend/step2', [
            'theend' => $theend
        ]);
    }

    public function storeStep2(Request $request, Theend $theend)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $theend->update($validated);

        return redirect()->route('theend.step3', ['theend' => $theend->slug]);
    }

    public function createStep3(Theend $theend)
    {
        return Inertia::render('theend/step3', [
            'theend' => $theend
        ]);
    }

    public function storeStep3(Request $request, Theend $theend)
    {
        $validated = $request->validate([
            'image_url' => 'nullable|string',
            'gif_url' => 'nullable|string',
            'sound_url' => 'nullable|string',
            'is_public' => 'boolean',
            'image' => 'nullable|image|max:5120', // Max 5MB
        ]);

        $data = [
            'gif_url' => $validated['gif_url'] ?? null,
            'sound_url' => $validated['sound_url'] ?? null,
            'is_public' => $validated['is_public'] ?? true,
            'is_draft' => false
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . Str::slug($theend->tone) . '.' . $file->getClientOriginalExtension();
            $path = 'uploads/theend/' . $theend->tone;

            // Ensure directory exists
            if (!file_exists(public_path($path))) {
                mkdir(public_path($path), 0755, true);
            }

            // Move the file to the public directory
            $file->move(public_path($path), $fileName);

            // Save the public URL to the image
            $data['image_url'] = '/' . $path . '/' . $fileName;
        } elseif (!empty($validated['image_url'])) {
            // Use pre-defined image
            $data['image_url'] = $validated['image_url'];
        }

        $theend->update($data);

        return redirect()->route('theend.show', ['theend' => $theend->slug]);
    }

    public function show(Theend $theend)
    {
        return Inertia::render('theend/show', [
            'theend' => $theend->load([
                'user',
                'type',
                'comments.user', // Load user info for each comment
                'reactions'
            ]),
        ]);
    }

    public function update(Request $request, Theend $theend)
    {
        $this->authorize('update', $theend);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_public' => 'boolean',
            'tone' => 'required|string',
            'type_id' => 'required|exists:types,id',
            'image_url' => 'nullable|string',
            'gif_url' => 'nullable|string',
            'sound_url' => 'nullable|string',
        ]);

        $theend->update($validated);

        return redirect()->route('theend.show', ['theend' => $theend->slug]);
    }

    public function destroy(Theend $theend)
    {
        $this->authorize('delete', $theend);
        $theend->delete();
        return redirect()->route('dashboard');
    }

    public function saveDraft(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'is_public' => 'boolean',
            'tone' => 'nullable|string',
            'type_id' => 'nullable|exists:types,id',
            'image_url' => 'nullable|string',
            'gif_url' => 'nullable|string',
            'sound_url' => 'nullable|string',
        ]);

        $theend = new Theend();
        $theend->user_id = auth()->id();
        $theend->fill($validated);
        $theend->is_draft = true;
        $theend->save();

        return response()->json(['id' => $theend->id]);
    }

    public function comment(Request $request, Theend $theend)
    {
        $validated = $request->validate([
            'content' => 'required|string'
        ]);

        $comment = $theend->comments()->create([
            'content' => $validated['content'],
            'user_id' => auth()->user()->id
        ]);

        // Charger l'utilisateur avec le commentaire
        $comment->load('user');

        return back()->with('comment', [
            'id' => $comment->id,
            'content' => $comment->content,
            'created_at' => $comment->created_at,
            'user' => [
                'id' => $comment->user->id,
                'name' => $comment->user->name,
                'avatar_url' => $comment->user->avatar_url
            ]
        ]);
    }
}