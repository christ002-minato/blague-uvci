
SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'user_id' cannot be null (Connection: mysql, SQL: insert into `annonces` (`title`, `description`, `price`, `location`, `category`, `user_id`, `updated_at`, `created_at`) values (èèèè, yèyy, 11252, Paris, Stade de France, mouche, ?, 2025-08-12 11:31:36, 2025-08-12 11:31:36))
POST 127.0.0.1:8001
PHP 8.4.1 — Laravel 12.21.0
app/Http/Controllers/AnnonceController.php :59


<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AnnonceController extends Controller
{
    /**
     * Affiche toutes les annonces (publique)
     */
    public function index(): View
    {
        $annonces = Annonce::latest()->paginate(10);
        return view('annonces.index', compact('annonces'));
    }

    
    public function dashboard(): View
    {
        $annonces = Annonce::where('user_id', Auth::id())->latest()->paginate(10);
        return view('dashboard', compact('annonces'));
    }

    /**
     * 
     */
    public function create(): View
    {
        return view('annonces.create');
    }

    /**
     * 
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
            'location'    => 'nullable|string|max:255',
            'category'    => 'nullable|string|max:255',
            'photo'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // 
        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('annonces', 'public');
        }

        $validated['user_id'] = Auth::id();

        Annonce::create($validated);

        return redirect()->route('dashboard')->with('success', 'Annonce créée avec succès.');
    }

    /**
     * 
     */
    public function show(Annonce $annonce): View
    {
        return view('annonces.show', compact('annonce'));
    }

    public function edit($id)
    {
        $annonce = Annonce::findOrFail($id);
        return view('annonces.edit', compact('annonce'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
            'location'    => 'required|string|max:255',
            'category'    => 'required|string|max:255',
            'photo'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $annonce = Annonce::findOrFail($id);
        $annonce->fill($request->except('photo'));

        if ($request->hasFile('photo')) {
            $photoName = time() . '.' . $request->photo->extension();
            $request->photo->move(public_path('images'), $photoName);
            $annonce->photo = $photoName;
        }

        $annonce->save();

        return redirect()->route('annonces.index')->with('success', 'Annonce mise à jour avec succès.');
    }

    public function destroy($id)
    {
        $annonce = Annonce::findOrFail($id);
        $annonce->delete();

        return redirect()->route('annonces.index')->with('success', 'Annonce supprimée avec succès.');
    }
}
