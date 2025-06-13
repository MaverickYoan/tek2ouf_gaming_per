<?php
require_once 'app/db.php';
session_start();
$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $dbh->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$_POST['username']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($_POST['password'], $user['password'])) {
        $_SESSION['user'] = $user['username'];
        header('Location: admin.php');
        exit;
    } else {
        $msg = "Identifiants incorrects.";
    }
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Connexion</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Connexion</h1>
    <form method="post">
        <input type="text" name="username" placeholder="Nom d'utilisateur" required><br>
        <input type="password" name="password" placeholder="Mot de passe" required><br>
        <button type="submit">Se connecter</button>
    </form>
    <p><?= $msg ?></p>
    <a href="index.php">Retour accueil</a>
</body>

</html>