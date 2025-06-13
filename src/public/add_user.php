<?php
require_once '../app/db.php';
$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $dbh->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
    $stmt->execute([
        $_POST['username'],
        password_hash($_POST['password'], PASSWORD_BCRYPT),
        $_POST['email']
    ]);
    $msg = "Utilisateur ajouté !";
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Créer un utilisateur</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Créer un utilisateur</h1>
    <form method="post">
        <input type="text" name="username" placeholder="Nom d'utilisateur" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="password" name="password" placeholder="Mot de passe" required><br>
        <button type="submit">Créer</button>
    </form>
    <p><?= $msg ?></p>
    <a href="index.php">Retour accueil</a>
</body>

</html>