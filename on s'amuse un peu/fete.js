    // Compter tous les utilisateurs
    public function countAllUsers() {
        $sql = "SELECT COUNT(*) FROM users";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return (int)$stmt->fetchColumn();
    }

    // Pagination utilisateurs
    public function getUsersPaginated($limit, $offset) {
        $sql = "SELECT * FROM users LIMIT :limit OFFSET :offset";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Modifier uniquement l'email d'un utilisateur
    public function updateUserEmail($id, $email) {
        $sql = "UPDATE users SET email = :email WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([':id' => $id, ':email' => $email]);
    }
<?php
require_once "db_connect.php";

class User {
    private $conn;

    public function __construct() {
        $db = new Database();
        $this->conn = $db->db_connect();
    }

    // Get all users
    public function getAllUsers() {
        $sql = "SELECT * FROM users";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get user by ID
    public function getUserById($id) {
        $sql = "SELECT * FROM users WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // modif user
    public function updateUser($id, $username, $email, $isAdmin) {
        $sql = "UPDATE users SET username = :username, email = :email, admin = :admin WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        
        return $stmt->execute([
            ':id' => $id,
            ':username' => $username,
            ':email' => $email,
            ':admin' => $isAdmin
        ]);
    }

    // delete user
    public function deleteUser($id) {
        $sql = "DELETE FROM users WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute([':id' => $id]);
    }

    // verifie if email exists
    public function emailExists($email) {
        $sql = "SELECT COUNT(*) FROM users WHERE email = :email";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':email' => $email]);
        return $stmt->fetchColumn() > 0;
    }

    // Verify user credentials
    public function verifyUser($email, $password) {
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }
        return false;
    }
}
?>
