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
    <a href="http://localhost:8000/add_game.php">Ajouter un jeu</a> |
    <a href="http://localhost:8000/add_user.php">Créer un utilisateur</a> |
    <a href="http://localhost:8000/games.php">Catalogue</a> |
    <a href="http://localhost:8000/list.php">Liste</a> |
    <a href="http://localhost:8000/logout.php">Déconnexion</a>
</body>

</html>