SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'user_id' cannot be null
signifie que, lorsque tu fais :

php
Copier
Modifier
$validated['user_id'] = Auth::id();
Annonce::create($validated);
Auth::id() retourne null, donc Laravel essaie d’insérer NULL dans la colonne user_id qui est NOT NULL dans ta base MySQL.

En clair : ton utilisateur n’est pas authentifié au moment où la méthode store() est appelée.

Pourquoi ça arrive
Aucun utilisateur connecté : tu n’es pas passé par un login avant d’accéder à la route annonces.store.

Middleware manquant : ta route d’insertion d’annonce n’est pas protégée par auth → Laravel ne sait pas qui est connecté.

Problème de guard : si tu utilises plusieurs systèmes d’authentification, Auth::id() peut renvoyer null parce que tu interroges le mauvais guard.

Session perdue : par exemple si tu postes depuis un autre domaine ou si la session n’est pas conservée.

Vérifications rapides
Ajoute un dd() pour voir

php
Copier
Modifier
dd(Auth::id(), Auth::user());
juste avant :

php
Copier
Modifier
$validated['user_id'] = Auth::id();
→ si tu obtiens null, c’est bien un souci d’authentification.

Vérifie tes routes
Dans routes/web.php :

php
Copier
Modifier
Route::middleware(['auth'])->group(function () {
    Route::resource('annonces', AnnonceController::class);
});
ou au moins :

php
Copier
Modifier
Route::post('/annonces', [AnnonceController::class, 'store'])->middleware('auth');
Vérifie que tu es connecté
Si tu utilises Laravel Breeze, Jetstream ou autre : assure-toi de bien être loggé via /login.

Correction
Solution rapide : protéger la route avec auth et t’assurer que tu es connecté avant d’insérer.

Solution de secours (à éviter en prod) : permettre user_id NULL en base et gérer autrement, mais ça brise la logique d’appartenance des annonces.

Vu que tu es en Laravel 12 et que ton erreur est sur store(), je te conseille d’abord de mettre :

php
Copier
Modifier
public function __construct()
{
    $this->middleware('auth');
}
dans ton AnnonceController.
Ça évitera que store() soit appelé sans utilisateur connecté.

Si tu veux, je peux te montrer comment corriger ta migration et ton modèle pour forcer le lien avec l’utilisateur connecté afin d’éviter ce genre d’erreur définitivement.
Veux-tu que je te prépare ça ?








