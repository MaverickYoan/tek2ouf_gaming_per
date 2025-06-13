<?php
require_once 'src\app\db.php';
require_once '../app/functions.php';

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadDir = 'uploads/';
    $thumbDir = 'uploads/thumbs/';
    if (!is_dir($thumbDir)) mkdir($thumbDir, 0755, true);
    $fileName = uniqid() . '_' . basename($_FILES['image']['name']);
    $uploadFile = $uploadDir . $fileName;
    $thumbFile = $thumbDir . $fileName;

    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
        createThumbnail($uploadFile, $thumbFile, 200);
        $stmt = $dbh->prepare("INSERT INTO jeux (titre, description, image_path, thumb_path, date_sortie, genre) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $_POST['titre'],
            $_POST['description'],
            $uploadFile,
            $thumbFile,
            $_POST['date_sortie'],
            $_POST['genre']
        ]);
        $msg = "Jeu ajouté avec succès !";
    } else {
        $msg = "Erreur upload.";
    }
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Ajouter un jeu</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Ajouter un jeu</h1>
    <form method="post" enctype="multipart/form-data">
        <input type="text" name="titre" placeholder="Titre" required><br>
        <textarea name="description" placeholder="Description"></textarea><br>
        <input type="date" name="date_sortie"><br>
        <input type="text" name="genre" placeholder="Genre"><br>
        <input type="file" name="image" accept="image/*" required><br>
        <button type="submit">Ajouter</button>
    </form>
    <p><?= $msg ?></p>
    <a href="index.php">Retour accueil</a>
</body>

</html>