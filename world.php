<?php
$host = 'localhost';
$username = 'Brandini';
$password = 'Gameheadt109++';
$dbname = 'world';
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
$pdo = new PDO($dsn,$username,$password);
$countryName = $_GET['countryName'];
$stmt = $pdo->query("SELECT *  FROM countries WHERE name LIKE '%$countryName%'");
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
exit(json_encode($results));
?>