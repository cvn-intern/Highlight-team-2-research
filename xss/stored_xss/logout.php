<?php
	session_start();

	session_unset();

	session_destroy();
?>

<!DOCTYPE html>
<html>
<head>
	<title>Logut</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/global.css">
</head>
<body style="text-align: center; background-color: #E5E5E5;">

	<?php
		if (!isset($_SESSION['USERNAME'])) {
			echo '<div class="container">
  				<p>You logged out <br> you can go to the Home page from <a href="index.php">here</a>.</p>
				</div>';
		}
	?>

</body>
</html>