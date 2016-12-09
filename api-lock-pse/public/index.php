<?php 
	header("Access-Control-Allow-Origin: *");
	require __DIR__ . '/../bootstrap/app.php';
	$app->run();