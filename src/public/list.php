<?php
require_once 'app/db.php';
$stmt = $dbh->query('SELECT * FROM jeux');
$jeux = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>

<head>
    <title>Liste des jeux</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Liste brute des jeux</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Genre</th>
            <th>Date</th>
            <th>Miniature</th>
        </tr>
        <?php foreach ($jeux as $jeu): ?>
        <tr>
            <td><?= $jeu['id'] ?></td>
            <td><?= htmlspecialchars($jeu['titre']) ?></td>
            <td><?= htmlspecialchars($jeu['genre']) ?></td>
            <td><?= htmlspecialchars($jeu['date_sortie']) ?></td>
            <td><img src="<?= htmlspecialchars($jeu['thumb_path']) ?>" width="60"></td>
        </tr>
        <?php endforeach; ?>
    </table>
    <a href="index.php">Retour accueil</a>
</body>

</html>