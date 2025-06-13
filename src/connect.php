<?php
$dsn = 'pgsql:dbname=jeuxvideo;host=db;port=5432';
$user = 'admin';
$password = 'adminpass';

try {
    $dbh = new PDO($dsn, $user, $password);
    $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
    exit;
}