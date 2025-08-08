# blague-uvci
humour d'étudiant en informatique 


SQLSTATE[HY000]: General error: 1364 Field 'title' doesn't have a default value (Connection: mysql, SQL: insert into `annonces` (`updated_at`, `created_at`) values (2025-08-08 08:36:40, 2025-08-08 08:36:40))
app/Http/Controllers/AnnonceController.php :150
<img src="{{ asset('storage/photos/nom_fichier.jpg') }}">

$photoPath = $request->file('photo')->store('photos', 'public');

$annonce = new Annonce();
$annonce->title = $request->title;
$annonce->description = $request->description;
$annonce->price = $request->price;
$annonce->location = $request->location;
$annonce->category = $request->category;
$annonce->photo = $photoPath;
$annonce->save();

{{-- Si $annonce->photo = "photos/abc123.jpg" --}}
<img src="{{ asset('storage/' . $annonce->photo) }}" width="100%">

ls storage/app/public/photos
chmod -R 755 storage
chmod -R 755 public/storage

