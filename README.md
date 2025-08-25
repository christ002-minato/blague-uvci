Ah je comprends 👍 tu veux des **questions-réponses plus techniques**, centrées sur la **logique du code** (Axios, Pinia, Router, liens dynamiques, etc.), plutôt que théoriques.

Voici une fiche adaptée :

---

# 📋 Fiche Questions / Réponses – Logique du Code (Vue.js, Axios, Pinia)

---

### **Q1.** Comment fait-on un appel API avec Axios pour récupérer tous les utilisateurs depuis `/api/users` ?

**R :**

```js
const response = await axios.get("/api/users");
console.log(response.data);
```

---

### **Q2.** Comment envoie-t-on un nouvel utilisateur à l’API avec Axios (méthode POST) ?

**R :**

```js
await axios.post("/api/users", {
  name: "Louane",
  email: "louane@example.com"
});
```

---

### **Q3.** Quelle est la différence entre `axios.put()` et `axios.patch()` ?

**R :**

* `PUT` remplace complètement une ressource.
* `PATCH` ne met à jour que les champs envoyés.

---

### **Q4.** Comment supprimer un utilisateur avec Axios dont l’id est `5` ?

**R :**

```js
await axios.delete(`/api/users/5`);
```

---

### **Q5.** Comment gérer les erreurs lors d’un appel API avec Axios ?

**R :**

```js
try {
  const res = await axios.get("/api/users");
} catch (error) {
  console.error("Erreur API :", error);
}
```

---

### **Q6.** Comment créer un lien dynamique vers un profil utilisateur avec Vue Router ?

**R :**

```vue
<router-link :to="`/user/${user.id}`">
  Voir profil de {{ user.name }}
</router-link>
```

---

### **Q7.** Comment récupérer l’id dynamique d’une route dans un composant Vue ?

**R :**

```js
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route.params.id); // l’id passé dans l’URL
```

---

### **Q8.** Comment connecter un store Pinia pour gérer une liste d’articles et la remplir via Axios ?

**R :**

```js
import { defineStore } from "pinia";
import axios from "axios";

export const useArticleStore = defineStore("articles", {
  state: () => ({ articles: [] }),
  actions: {
    async fetchArticles() {
      const res = await axios.get("/api/articles");
      this.articles = res.data;
    }
  }
});
```

---

### **Q9.** Quelle est la logique pour afficher une liste récupérée via Axios dans un composant Vue ?

**R :**

1. Appeler la fonction du store ou du composant pour récupérer les données.
2. Stocker les résultats dans une variable réactive.
3. Utiliser une boucle `v-for` dans le template pour afficher la liste.

Exemple :

```vue
<ul>
  <li v-for="item in articles" :key="item.id">{{ item.name }}</li>
</ul>
```

---

### **Q10.** Quelle est la différence entre utiliser Fetch et Axios dans la logique de code Vue.js ?

**R :**

* Avec Fetch :

  ```js
  const res = await fetch("/api/users");
  const data = await res.json();
  ```
* Avec Axios :

  ```js
  const res = await axios.get("/api/users");
  const data = res.data;
  ```

👉 Axios réduit les lignes de code et gère mieux les erreurs et headers.

---

⚡ Cette fiche est bien **orientée pratique**, comme si tu testais la compréhension des étudiants sur la logique du code.

Veux-tu que je te prépare aussi une **mini-série d’exercices pratiques** (par ex. compléter du code Axios manquant, corriger un appel API, etc.) pour compléter cette fiche Q/R ?
