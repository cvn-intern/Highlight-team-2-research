<?php
	session_start();
?>

<!DOCTYPE html>
<html>
<head>
	<title>Welcome</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/global.css">
</head>
<body style="text-align: center; background-color: #E5E5E5;">

	<?php
		// Create a cookie
		$cookie_name = "very_secret_cookie_that_should_not_be_shown";
		$cookie_value = "secret";
		setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
		//
		if (isset($_SESSION['USERNAME'])) {
			echo '<div class="container">
  				<p>Welcome '. $_SESSION['USERNAME'] . '<br> you can go to blog and start sharing your ideas from <a href="blog.php">here</a>.</p>
				</div>';
		}
	?>
</body>
</html>