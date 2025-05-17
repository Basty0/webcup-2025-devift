<?php

namespace App\Http\Controllers;

use App\Models\Theend;
use App\Models\Type;
use Illuminate\Http\Request;
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
        $theend->is_draft = 1;
        $theend->save();

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
        ]);

        $theend->update([
            ...$validated,
            'is_draft' => false
        ]);

        return redirect()->route('theend.show', ['theend' => $theend->slug]);
    }

    public function show(Theend $theend)
    {
        return Inertia::render('theend/show', [
            'theend' => $theend->load(['user', 'type', 'comments', 'reactions']),
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
}
