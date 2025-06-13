<?php
$dsn = 'pgsql:host=db;dbname=jeuxvideo';
$user = 'admin';
$password = 'adminpass';
try {
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Erreur connexion : ' . $e->getMessage());
}