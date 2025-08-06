Schema::create('ads', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('category');
    $table->text('description');
    $table->string('photo');
    $table->decimal('price', 8, 2);
    $table->string('location');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});


public function user()
{
    return $this->belongsTo(User::class);
}


public function ads()
{
    return $this->hasMany(Ad::class);
}


protected $fillable = [
    'title', 'category', 'description', 'photo',
    'price', 'location', 'user_id'
];


use App\Http\Controllers\AdController;

// Route accessible à tout le monde : afficher toutes les annonces
Route::get('/ads', [AdController::class, 'index'])->name('ads.index');

// Route pour voir une seule annonce
Route::get('/ads/{ad}', [AdController::class, 'show'])->name('ads.show');


public function index()
{
    $ads = \App\Models\Ad::latest()->paginate(10);
    return view('ads.index', compact('ads'));
}


@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Toutes les annonces</h2>

    @if(session('success'))
        <p style="color: green">{{ session('success') }}</p>
    @endif

    <div class="grid grid-cols-3 gap-4">
        @foreach ($ads as $ad)
            <div class="card" style="border:1px solid #ccc; padding:10px; margin:10px;">
                <img src="{{ asset('storage/' . $ad->photo) }}" width="100%">
                <h3>{{ $ad->title }}</h3>
                <p>{{ $ad->price }} €</p>
                <p>{{ $ad->location }}</p>
                <a href="{{ route('ads.show', $ad) }}">Voir l’annonce</a>
            </div>
        @endforeach
    </div>

    <div class="pagination">
        {{ $ads->links() }}
    </div>
</div>
@endsection


    Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/ads/create', [AdController::class, 'create'])->name('ads.create');
    Route::post('/ads', [AdController::class, 'store'])->name('ads.store');
});


public function create()
{
    return view('ads.create');
}


@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Créer une nouvelle annonce</h2>

    @if ($errors->any())
        <div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li style="color:red">{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('ads.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <label for="title">Titre :</label>
        <input type="text" name="title" required><br>

        <label for="category">Catégorie :</label>
        <input type="text" name="category" required><br>

        <label for="description">Description :</label>
        <textarea name="description" required></textarea><br>

        <label for="photo">Photo :</label>
        <input type="file" name="photo" accept="image/*" required><br>

        <label for="price">Prix :</label>
        <input type="number" name="price" step="0.01" required><br>

        <label for="location">Localisation :</label>
        <input type="text" name="location" required><br>

        <button type="submit">Publier l’annonce</button>
    </form>
</div>
@endsection


    use Illuminate\Support\Facades\Storage;

public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string',
        'category' => 'required|string',
        'description' => 'required',
        'photo' => 'required|image',
        'price' => 'required|numeric',
        'location' => 'required|string',
    ]);

    $photoPath = $request->file('photo')->store('ads', 'public');

    Ad::create([
        'title' => $request->title,
        'category' => $request->category,
        'description' => $request->description,
        'photo' => $photoPath,
        'price' => $request->price,
        'location' => $request->location,
        'user_id' => auth()->id(),
    ]);

    return redirect()->route('ads.index')->with('success', 'Annonce publiée avec succès.');
}


'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'),
    'url' => env('APP_URL').'/storage',
    'visibility' => 'public',
],

    php artisan storage:link
