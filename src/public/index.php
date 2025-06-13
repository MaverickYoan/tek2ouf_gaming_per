<?php
require_once 'app/db.php';

if (!isset($db) || !$db) {
    die("Erreur de connexion à la base de données.");
}

// * sql SELECT
$sql = "SELECT * FROM jeux";

// * préparation de la requête sql
$query = $db->prepare($sql);

// * exécution de la requête sql
$query->execute();

// * récupération des données de la requête sql
$jeux = $query->fetchAll(PDO::FETCH_ASSOC);

// * afficher la table jeux
// print_r($jeux);

require_once "logout.php";
?>

<!DOCTYPE html>
<html>

<head>
    <title>Accueil - TeK2OuF</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Bienvenue sur TeK2OuF</h1>
    <nav>
        <a href="http://localhost:8000/add_game.php">Ajouter un jeu</a> |
        <a href="http://localhost:8000/add_user.php">Créer un utilisateur</a> |
        <a href="http://localhost:8000/games.php">Catalogue</a> |
        <a href="http://localhost:8000/list.php">Liste</a> |
        <a href="http://localhost:8000/login.php">Connexion</a> |
        <a href="http://localhost:8000/admin.php">Administration</a> |
        <a href="http://localhost:8000/contact.php">Contact</a>
    </nav>
    <p>Le site du catalogue jeux vidéo, esprit Matrix/TeK2OuF !</p>
    <h1 style="border:1px solid black; background-color: black; color: white; width:fit-content">INDEX</h1>
    <p>créer table sql jeux</p>

    <h1 style="color:green; font-size:14px;">TABLE SQL jeux</h1>

    <!-- // * Table jeux -->
    <table style="border:1px solid black;">
        <!-- <pre> -->
        <?php
        // print_r($jeux)
        ?>
        <!-- </pre> -->
        <thead style="border:1px solid black;">
            <th style="border:1px solid black;">id</th>
            <th style="border:1px solid black;">Jeu</th>
            <th style="border:1px solid black;">Genre</th>
            <th style="border:1px solid black;">Actions</th>
        </thead>
        <tbody style="border:1px solid black;">
            <tr>
                <td style="border:1px solid black;">123</td>
                <td style="border:1px solid black;">grid</td>
                <td style="border:1px solid black;">course</td>
                <td style="border:1px solid black;">no action</td>
            </tr>

            <?php
            foreach ($jeux as $jeu): ?>

                <tr>
                    <td style="border:1px solid black;"><?= $jeu['id'] ?> </td>
                    <td style="border:1px solid black;"><?= $jeu['jeu'] ?> </td>
                    <td style="border:1px solid black;"><?= $jeu['genre'] ?> </td>
                    <td style="border:1px solid black;">
                        <a style="border:1px solid black;" href="jeu.php?id=<?= $jeu['id'] ?>">Voir</a>
                        <a style="border:1px solid black;" href="modifier.php?id=<?= $jeu['id'] ?>">Modifier</a>
                        <a style="border:1px solid black;" href="supprimer.php?id=<?= $jeu['id'] ?>">Supprimer</a>
                    </td>
                </tr>
            <?php endforeach ?>

        </tbody>
    </table>

    <br>
    <img width="10%" src="img/11919432.gif" alt="gif d'ajout d'un jeu vidéo">
    <br>
    <a href="./add_jeux.php"><button>Ajouter un jeu</button></a>

    <br><br>

    <hr />

    <div style="display: flex; justify-content:center;">
        <?php echo "helluuuuu"; ?>
    </div>

    <hr>


    <hr />

    <?php

    // Affiche toutes les infos, comme le ferait INFO_ALL
    // phpinfo();

    // Affiche uniquement le module d'infos.
    // phpinfo(8) fournirait les mêmes infos.
    // phpinfo(INFO_MODULES);

    ?>

    <a href="./contact.php"><button>Contactez-nous</button></a>

    <p>Sites perso</p>
    <a href="https://fabulous-platypus-fdb4a3.netlify.app" target="_blank">Wink Netlify WebbApp</a>
    <a href="https://amazing-puppy-e2c060.netlify.app/" target="_blank">TeK2ouF - Gaming Underground Netlify WebbApp</a>

    <!-- Footer Section : Index du site -->
    <footer class=footer>
        <div class=logo>
            <a>
                <img src=logo_jadoo_2bis.svg alt="titre jadoo" class=logo2bis href=https://jadoo.store/#>
            </a>
            <img src=logo_jadoo_1bis.svg alt="icone sushi jadoo" class=logo1bis>
            <br>
        </div>
        </div>


        <!-- Tableau de liens utiles -->
        <div class=table>
            <table>
                <tr>
                    <th>
                        <b class=Restaurant>Site</b>
                    <th>
                        <b class=Restaurant>Ajouter</b>

                <tr>
                    <td class=ligne>

                <tr>
                    <td class=ligne>


                    <td class=ligne>
                        <a class="links" href="http://localhost:8000/add.php">Ajout User</a> <br>

                        <a class="links" href="http://localhost:8000/add_jeux.php">Ajout Jeux</a> <br>

                        <a class="links" href="http://localhost:8000/modifier.php">Modifier Jeux</a> <br>

                        <a class="links" href="http://localhost:8000/supprimer.php">Supprimer Jeux</a> <br>

                        <a class="links" href="http://localhost:8000/jeu.php">jeu</a> <br>


                <tr>
                    <td class=ligne>
                        <a class="links" href="http://localhost:8000/home.php"
                            style=text-decoration:none;color:var(--txtcolor)>home</a> <br>

                        <a class="links" href="http://localhost:8000/index.php"
                            style=text-decoration:none;color:var(--txtcolor)>Index</a> <br>

                        <a class="links" href="http://localhost:8000/liste.php"
                            style=text-decoration:none;color:var(--txtcolor)>Liste</a> <br>

                        <a class="links" href="http://localhost:8000/contact.php"
                            style=text-decoration:none;color:var(--txtcolor)>Contact</a> <br>

            </table>
            <br>

        </div>
    </footer> <br>

    <a href="/">Back to home</a>

    <!-- Droits Section : Informations sur les droits réservés et le créateur -->

    <div class="droits">
        <h6 style="display: flex; justify-content:center;">&copy; 2025 Projet_jeux_Vidéos | <a
                href=https://www.onlineformapro.com/ target=_blank> @onlineformapro</a></h6>
    </div>

</body>

</html>