<?php
require_once 'src\app\db.php';
$stmt = $dbh->query('SELECT * FROM jeux ORDER BY date_sortie DESC');
$jeux = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>

<head>
    <title>Catalogue jeux</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Catalogue des jeux</h1>
    <div class="catalogue">
        <?php foreach ($jeux as $jeu): ?>
        <div class="jeu">
            <img src="<?= htmlspecialchars($jeu['thumb_path']) ?>" alt="Miniature" loading="lazy">
            <h3><?= htmlspecialchars($jeu['titre']) ?></h3>
            <p><?= htmlspecialchars($jeu['genre']) ?> | <?= htmlspecialchars($jeu['date_sortie']) ?></p>
            <p><?= htmlspecialchars($jeu['description']) ?></p>
        </div>
        <?php endforeach; ?>
    </div>
    <a href="index.php">Retour accueil</a>
</body>

</html>