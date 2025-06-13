<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Administration</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Administration</h1>
    <p>Bienvenue, <?= htmlspecialchars($_SESSION['user']) ?> !</p>
    <a href="add_game.php">Ajouter un jeu</a> |
    <a href="add_user.php">Créer un utilisateur</a> |
    <a href="games.php">Catalogue</a> |
    <a href="list.php">Liste</a> |
    <a href="logout.php">Déconnexion</a>
</body>

</html>