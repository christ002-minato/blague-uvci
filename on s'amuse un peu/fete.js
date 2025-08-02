<?php
require_once "db_connect.php";
require_once "Users.php";
require_once "Products.php";


$userManager = new User();
$productManager = new Product();

//  pour les utilisateurs
if (isset($_POST['submit-user'])) {
    $username = $_POST['user-name'];
    $email = $_POST['user-email'];
    if (isset($_POST['user-admin'])) {
        $isAdmin = 1;
    } else {
        $isAdmin = 0;
    }
    if ($userManager->emailExists($email)) {
        $userError = "Cet email est déjà utilisé.";
    } else {
        if (isset($_POST['user-id']) && !empty($_POST['user-id'])) {
            $userManager->updateUser($_POST['user-id'], $username, $email, $isAdmin);
        } else {
            if (method_exists($userManager, 'createUser')) {
                $userManager->createUser($username, $email, 'defaultPassword', $isAdmin);
            }
        }
    }
}

if (isset($_GET['delete-user'])) {
    $userId = $_GET['delete-user'];
    if (!empty($userId)) {
        $userManager->deleteUser($userId);
    }
}

//  pour les produits
if (isset($_POST['bt_add'])) {
    $name = $_POST['product_name'];
    $category = $_POST['product_categorie'];
    $description = $_POST['product_desc'];
    $price = $_POST['product_price'];
    $image = '';
    if (isset($_FILES['product_image']) && !empty($_FILES['product_image']['name'])) {
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        $targetFile = $targetDir . basename($_FILES['product_image']['name']);
        if (move_uploaded_file($_FILES['product_image']['tmp_name'], $targetFile)) {
            $image = $targetFile;
        }
    }
    if (isset($_POST['product-id']) && !empty($_POST['product-id'])) {
        $productManager->updateProduct($_POST['product-id'], $name, $price, $category, $description, $image);
    } else {
        $productManager->createProduct($name, $price, $category, $description, $image);
    }
}

if (isset($_GET['delete-product'])) {
    $productId = $_GET['delete-product'];
    if (!empty($productId)) {
        $productManager->deleteProduct($productId);
    }
}


$usersPerPage = 5;
$userPage = isset($_POST['user_page']) ? max(1, intval($_POST['user_page'])) : 1;
$userOffset = ($userPage - 1) * $usersPerPage;

if (method_exists($userManager, 'countAllUsers')) {
    $totalUsers = $userManager->countAllUsers();
} else {
    $allUsers = $userManager->getAllUsers();
    if (is_array($allUsers)) {
        $totalUsers = count($allUsers);
    } else {
        $totalUsers = 0;
    }
}
$totalUserPages = max(1, ceil($totalUsers / $usersPerPage));
if (method_exists($userManager, 'getUsersPaginated')) {
    $users = $userManager->getUsersPaginated($usersPerPage, $userOffset);
} else {
    $allUsers = $userManager->getAllUsers();
    if (is_array($allUsers)) {
        $users = array_slice($allUsers, $userOffset, $usersPerPage);
    } else {
        $users = [];
    }
}


$productsPerPage = 5;
$productPage = isset($_POST['product_page']) ? max(1, intval($_POST['product_page'])) : 1;
$productOffset = ($productPage - 1) * $productsPerPage;

if (method_exists($productManager, 'countAllProducts')) {
    $totalProducts = $productManager->countAllProducts();
} else {
    $allProducts = $productManager->getAllProducts();
    if (is_array($allProducts)) {
        $totalProducts = count($allProducts);
    } else {
        $totalProducts = 0;
    }
}
$totalProductPages = max(1, ceil($totalProducts / $productsPerPage));
if (method_exists($productManager, 'getProductsPaginated')) {
    $products = $productManager->getProductsPaginated($productsPerPage, $productOffset);
} else {
    $allProducts = $productManager->getAllProducts();
    if (is_array($allProducts)) {
        $products = array_slice($allProducts, $productOffset, $productsPerPage);
    } else {
        $products = [];
    }
}
?>

<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <link rel='stylesheet' href='test.css'>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Admin Panel</title>
</head>
<body>
                <nav class='sidebar'>
                    <header>
                    <div class='image-text'>
                        <div class='image'>
                            <img src='lea-journiac-h-9c5wqaLSM-unsplash.jpg' alt='LOGO'>
                        </div>
                    
                    <div class='text header-text'>
                        <span class='name'>Codinglab</span>
                        <span class='proffesion'>Webe develloper</span>
                        </div>
                    </div>

                    <i class='bxr  bx-dock-right-arrow'  ></i> 
                </header>
                    <div class='menu-bar'>
                        <div class='menu'>
                            <li class='search-box'>
                                        <i class='bx  bx-search icons'  ></i> 
                                        <input type='sarch' placeholder='Search...'>
                                </li>
                            <ul class='menu-links'>
                                
                                <li class='nav-link'>
                                    <a href='#users'>
                                        <i class='bx bx-user iconsmethod='post''></i>
                                        <span class='text nav-text'>Tous les utilisateurs</span>
                                    </a>
                                </li>
                                <li class='nav-link'>
                                    <a href='#edit-user'>
                                        <i class='bx bx-edit icons'></i>
                                        <span class='text nav-text'>Modifier un utilisateur</span>
                                    </a>
                                </li>
                                <li class='nav-link'>
                                    <a href='#delete-user'>
                                        <i class='bx bx-user-x icons'></i>
                                        <span class='text nav-text'>Supprimer un utilisateur</span>
                                    </a>
                                </li>
                                <li class='nav-link'>
                                    <a href='#add-product'>
                                        <i class='bx bx-plus-circle icons'></i>
                                        <span class='text nav-text'>Ajouter un produit</span>
                                    </a>
                                </li>
                                <li class='nav-link'>
                                    <a href='#products'>
                                        <i class='bx bx-list-ul icons'></i>
                                        <span class='text nav-text'>Tous les produits</span>
                                    </a>
                                </li>
                                <li class='nav-link'>
                                    <a href='#edit-product'>
                                        <i class='bx bx-edit-alt icons'></i>
                                        <span class='text nav-text'>Modifier un produit</span>
                                    </a>
                                </li>
                                <li class='nav-link'>
                                    <a href='#delete-product'>
                                        <i class='bx bx-trash icons'></i>
                                        <span class='text nav-text'>Supprimer un produit</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <li class='nav-link'>
                            <a href='#'>
                                <i class='bxr  bx-wallet icons'></i> 
                                <span class='text nav-text'>Wallets</span>
                            </a>
                        </li>
                        <li class='nav-link' style='margin-top:2rem;'>
                            <form method='post' action='../backend/logout.php' style='display:inline;'>
                                <button type='submit' style='background:none;border:none;color:#f3f3f3;cursor:pointer;font-size:1rem;display:flex;align-items:center;'>
                                    <i class='bx bx-log-out icons' style='margin-right:0.5rem;'></i> Déconnexion
                                </button>
                            </form>
                        </li>
                    </div>
                </nav> 
    
    <main>
        
        <section id='users'>
            <h2>All users</h2>
            <?php if (!empty($userError)): ?>
                <div class='error-message'><?= $userError ?></div>
            <?php endif; ?>
            
            <table width='100%'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($users)): ?>
                        <tr>
                            <td colspan='5'>No users found</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($users as $user): ?>
                            <tr>
                                <td><?= htmlspecialchars($user['id']) ?></td>
                                <td><?= htmlspecialchars($user['username']) ?></td>
                                <td><?= htmlspecialchars($user['email']) ?></td>
                                <td><?= $user['admin'] ? 'Yes' : 'No' ?></td>
                                <td>
                                    <a href='?edit-user=<?= $user['email'] ?>'>Edit</a> | 
                                    <a href='?delete-user=<?= $user['email'] ?>' onclick='return confirm("Are you sure?")'>Delete</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>

            
            <div class='pagination-container'>
                <?php if ($userPage > 1): ?>
                    <a href='?user_page=<?= $userPage-1 ?>&product_page=<?= $productPage ?>#users' class='pagination-link'>Précédent</a>
                <?php endif; ?>
                <span class='pagination-current'>Page <?= $userPage ?> / <?= $totalUserPages ?></span>
                <?php if ($userPage < $totalUserPages): ?>
                    <a href='?user_page=<?= $userPage+1 ?>&product_page=<?= $productPage ?>#users' class='pagination-link'>Suivant</a>
                <?php endif; ?>
            </div>
        </section>

        
        <section id='edit-user'>
            <h2><?= isset($_POST['edit-user']) ? 'Edit' : 'Add' ?> User</h2>
            <form method='post'>
                <?php
                $editingUser = null;
                if (isset($_POST['edit-user'])) {
                    $editingUser = $userManager->getUserById($_POST['edit-user']);
                }
                ?>
                <label>Name: <input type='text' name='user-name' value="<?= $editingUser ? htmlspecialchars($editingUser['username']) : '' ?>"></label><br>
                <label>Email: <input type='email' name='user-email' value="<?= $editingUser ? htmlspecialchars($editingUser['email']) : '' ?>"></label><br>
                <label>Admin: <input type='checkbox' name='user-admin' <?= $editingUser && $editingUser['admin'] ? 'checked' : '' ?>></label><br>
                <button type='submit' name='submit-user'><?= $editingUser ? 'Update' : 'Add' ?> User</button>
            </form>

            
            <div class='pagination-container'>
                <?php if ($productPage > 1): ?>
                    <a href='?user_page=<?= $userPage ?>&product_page=<?= $productPage-1 ?>#products' class='pagination-link'>Précédent</a>
                <?php endif; ?>
                <span class='pagination-current'>Page <?= $productPage ?> / <?= $totalProductPages ?></span>
                <?php if ($productPage < $totalProductPages): ?>
                    <a href='?user_page=<?= $userPage ?>&product_page=<?= $productPage+1 ?>#products' class='pagination-link'>Suivant</a>
                <?php endif; ?>
            </div>
        </section>

        
        <section id='products'>
            <h2>All Products</h2>
            <table width='100%'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($products)): ?>
                        <tr>
                            <td colspan='6'>No products found</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($products as $product): ?>
                            <tr>
                                <td><?= htmlspecialchars($product['id']) ?></td>
                                <td><?= htmlspecialchars($product['name']) ?></td>
                                <td><?= htmlspecialchars($product['category_name'] ?? 'N/A') ?></td>
                                <td><?= htmlspecialchars($product['price']) ?></td>
                                <td>
                                    <?php if (!empty($product['image'])): ?>
                                        <img src='<?= htmlspecialchars($product['image']) ?>' width='50'>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <a href='?edit-product=<?= $product['id'] ?>'>Edit</a> | 
                                    <a href='?delete-product=<?= $product['id'] ?>' onclick='return confirm("Are you sure?")'>Delete</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </section>

        
        <section id='add-product'>
            <h2><?= isset($_POST['edit-product']) ? 'Edit' : 'Add' ?> Product</h2>
            <form method='post' enctype='multipart/form-data'>
                <?php
                $editingProduct = null;
                if (isset($_POST['edit-product'])) {
                    $editingProduct = $productManager->createProduct($name, $price, $category_id, $description = '', $image = '');
                }
                ?>
                <input type='hidden' name='product-id' value="<?= $editingProduct ? $editingProduct['id'] : '' ?>">
                <label>Name: <input type='text' name='product_name' value="<?= $editingProduct ? htmlspecialchars($editingProduct['name']) : '' ?>" required></label><br>
                <label>Category: 
                    <select name='product_categorie' required>
                        
                        <option value='1' <?= $editingProduct && $editingProduct['category_id'] == 1 ? 'selected' : '' ?>>Category 1</option>
                        <option value='2' <?= $editingProduct && $editingProduct['category_id'] == 2 ? 'selected' : '' ?>>Category 2</option>
                    </select>
                </label><br>
                <label>Description: <textarea name='product_desc' required><?= $editingProduct ? htmlspecialchars($editingProduct['description']) : '' ?></textarea></label><br>
                <label>Price: <input type='number' name='product_price' step='0.01' value="<?= $editingProduct ? htmlspecialchars($editingProduct['price']) : '' ?>" required></label><br>
                <label>Image: <input type='file' name='product_image'></label><br>
                <?php if ($editingProduct && !empty($editingProduct['image'])): ?>
                    <p>Current image: <img src='<?= htmlspecialchars($editingProduct['image']) ?>' width='50'></p>
                <?php endif; ?>
                <button type='submit' name='bt_add'><?= $editingProduct ? 'Update' : 'Add' ?> Product</button>
            </form>
        </section>
    </main>
</body>
</html>


