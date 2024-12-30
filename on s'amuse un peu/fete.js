/**const blagues = [
    "Pourquoi les canards sont-ils toujours à l'heure ? Parce qu'ils sont dans l'étang !",
    "Que dit une imprimante dans une dispute ? Tu vas en baver !",
    "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tombent dans le bateau !"
];

function genererBlague() {
    const randomIndex = Math.floor(Math.random() * blagues.length);
    document.getElementById('blague').textContent = blagues[randomIndex];
}**/
const images = [
    "image/guy-1.jpg", // Remplacez par vos noms de fichiers locaux
    "guy-1.png",
    "image3.jpg",
    "https://via.placeholder.com/600", // Exemple d'image externe
    "https://picsum.photos/600" // Exemple d'image générée aléatoirement
];

function genererImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageElement = document.getElementById('image');
    imageElement.src = images[randomIndex];
}