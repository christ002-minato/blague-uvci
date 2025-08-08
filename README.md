le probleme SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'user_id' cannot be null (Connection: mysql, SQL: insert into `annonces` (`title`, `description`, `location`, `category`, `photo`, `price`, `user_id`, `updated_at`, `created_at`) values (tgrsdfg, etsrserf, Paris, Stade de France, mouche, annonces/tEehkm9aHxl0dr0NFKB9gzRml8uD4efozATZllIw.jpg, 125, ?, 2025-08-08 15:39:41, 2025-08-08 15:39:41))

<?php


namespace App\Http\Controllers;

use App\Models\Annonce;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Illuminate\View\View;
use App\Http\Requests\AnnonceStoreRequest;
use App\Http\Requests\AnnonceUpdateRequest;
use Illuminate\Http\save;

class AnnonceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $annonces = Annonce::latest()->paginate(5);

        return view('annonces.index', compact('annonces'))
                    ->with('i', (request()->input('page', 1) - 1) * 5);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('annonces.create');
    }

    public function store(Request $request)
    {
      $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|integer',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $photoPath = '';
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('annonces', 'public' );
        }

            $user = new Annonce();
            $user->title = $request->title;
            $user->description  = $request->description ;
            $user->location= $request->location ;
            $user->category= $request->category;
            $user->photo = $photoPath;
            $user->price = $request->price;
            $user->user_id = Auth::id();
            $user->save();
        

        return redirect()->route('annonces.index')->with('success', 'Annonce créée avec succès.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Annonce $annonce): View
    {
        return view('annonces.show',compact('annonce'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Annonce $annonce): View
    {
        return view('annonces.edit',compact('annonce'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AnnonceUpdateRequest $request, Annonce $annonce): RedirectResponse
    {
        $data= $request->validated();
        dd ($data);
        $annonce->update($request->validated());

        return redirect()->route('annonces.index')
                        ->with('success','annonce updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Annonce $annonce): RedirectResponse
    {
        $annonce->delete();

        return redirect()->route('annonces.index')
                        ->with('success','annonce deleted successfully');
    }
}
<div class="card mt-5">
  <h2 class="card-header">Add New annonce</h2>
  <div class="card-body">

    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <a class="btn btn-primary btn-sm" href="{{ route('annonces.index') }}"><i class="fa fa-arrow-left"></i> Back</a>
    </div>

    <form action="{{ route('annonces.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="mb-3">
            <label for="inputTitle" class="form-label"><strong>Titre :</strong></label>
            <input
                type="text"
                name="title"
                class="form-control @error('title') is-invalid @enderror"
                id="inputTitle"
                placeholder="Titre de l'annonce">
            @error('title')
                <div class="form-text text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="inputDescription" class="form-label"><strong>Description :</strong></label>
            <textarea
                class="form-control @error('description') is-invalid @enderror"
                style="height:150px"
                name="description"
                id="inputDescription"
                placeholder="Description détaillée"></textarea>
            @error('description')
                <div class="form-text text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="inputPrice" class="form-label"><strong>Prix (€) :</strong></label>
            <input type="number" name="price" class="form-control @error('price') is-invalid @enderror" id="inputPrice" placeholder="Prix">
            @error('price')
                <div class="form-text text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="inputLocation" class="form-label"><strong>Lieu :</strong></label>
            <input type="text" name="location" class="form-control @error('location') is-invalid @enderror" id="inputLocation" placeholder="Ville ou région">
            @error('location')
                <div class="form-text text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="inputCategory" class="form-label"><strong>Catégorie :</strong></label>
            <input type="text" name="category" class="form-control @error('category') is-invalid @enderror" id="inputCategory" placeholder="Catégorie">
            @error('category')
                <div class="form-text text-danger">{{ $message }}</div>
            @enderror
        </div>

        <div class="mb-3">
            <label for="inputphoto" class="form-label"><strong>photo :</strong></label>
            <input type="file" name="photo" class="form-control @error('photo') is-invalid @enderror" id="photo" name="photo">
            @error('photo')
                <div class="form-text text-danger">{{ $message }}</div>
            @enderror
        </div>
        <button type="submit" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Submit</button>
        <button type="submit" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i> Publier</button>

  </div>

@extends('annonces.layout')

@section('content')

<div class="card mt-5">
  <h2 class="card-header">produit du site :)</h2>
  <div class="card-body">

        {{-- @session('success')
            <div class="alert alert-success" role="alert"> {{ $value }} </div>
        @endsession --}}

        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <a class="btn btn-success btn-sm" href="{{ route('annonces.create') }}"> <i class="fa fa-plus"></i> Create New annonce</a>
        </div>

        <table class="table table-bordered table-striped mt-4">
            <thead>
                <tr>
                    <th width="80px">No</th>
                    <th>Titre</th>
                    <th>Description</th>
                    <th width="250px">Action</th>
                </tr>
            </thead>

            <tbody>
            @forelse ($annonces as $annonce)
                <tr>
                    <td>{{ ++$i }}</td>
                    <td>{{ $annonce->title }}</td>
                    <td>{{ $annonce->description }}</td>
                    <td>
                        <form action="{{ route('annonces.destroy',$annonce->id) }}" method="POST">

                            <a class="btn btn-info btn-sm" href="{{ route('annonces.show',$annonce->id) }}"><i class="fa-solid fa-list"></i> Show</a>

                            <a class="btn btn-primary btn-sm" href="{{ route('annonces.edit',$annonce->id) }}"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
                            {{-- Si $annonce->photo = "photos/abc123.jpg" --}}
                                <img src="{{ asset('storage/' . $user->photo) }}" width="100%">
                            @csrf
                            @method('DELETE')

                            <button type="submit" class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i> Delete</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="4">There are no data.</td>
                </tr>
            @endforelse
            </tbody>


            🔧 Option 3 : Rendre user_id nullable (pas recommandé en production)
Si tu veux vraiment désactiver la contrainte pour tes tests (⚠️ à éviter en production), modifie ta migration annonces pour que user_id soit nullable :

php
Copier
Modifier
$table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
Puis refais une migration :

bash
Copier
Modifier
php artisan migrate:fresh --seed
⚠️ Cela efface toutes les données de la base !

✅ Et après les tests ?
Quand tu passeras à une vraie utilisation, tu remettras :

php
Copier
Modifier
$user->user_id = Auth::id();
et tu mettras en place le système d'authentification (login/register) avec un middleware auth.

        </table>

       {{-- {!! $annonces->links() !!} --}}

  </div>
</div>
@endsection
