<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdController;
use App\Http\Controllers\AuthController;

// Page d’accueil
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Authentification (étape 2 - simplifiée)
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Annonces
Route::get('/ads', [AdController::class, 'index'])->name('ads.index');

// Routes protégées par authentification
Route::middleware('auth')->group(function () {
    Route::get('/ads/create', [AdController::class, 'create'])->name('ads.create');
    Route::post('/ads', [AdController::class, 'store'])->name('ads.store');
});

// Affichage d’une annonce spécifique (hors middleware pour être public)
Route::get('/ads/{id}', [AdController::class, 'show'])->name('ads.show');
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post; // Modèle Eloquent pour les annonces
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Affiche la liste des annonces.
     */
    public function index()
    {
        $posts = Post::latest()->paginate(10);
        return view('posts.index', compact('posts'));
    }

    /**
     * Affiche le formulaire de création d’annonce.
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * Enregistre une nouvelle annonce.
     */
    public function store(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
        ]);

        // Création de l’annonce
        $post = new Post();
        $post->title       = $validated['title'];
        $post->description = $validated['description'];
        $post->price       = $validated['price'];
        $post->user_id     = Auth::id();
        $post->save();

        return redirect()->route('ads.index')->with('success', 'Annonce créée avec succès.');
    }

    /**
     * Affiche une annonce spécifique.
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return view('posts.show', compact('post'));
    }
}
