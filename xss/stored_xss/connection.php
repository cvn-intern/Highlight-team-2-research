<?php
	$dns = 'mysql:host=localhost;dbname=xss';
	$user = 'root';
	$pass = '';

	try{
		$con = new PDO($dns, $user, $pass);
	}catch(PDOException $e){
		echo 'Failed to connect : ' . $e;
	}
