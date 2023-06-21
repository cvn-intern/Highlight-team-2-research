<?php include 'connection.php'; ?>
<html>
<head>
	<title>Register</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/global.css">
</head>
<body style="text-align: center; background-color: #E5E5E5;">
	<?php include 'navbar.php' ?> <br>

	<h1>Register</h1><br>
	<b><p>Welcome to the registeration page, please fill out the registeration form.</p></b>

	<form class="forms" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
		<input class="form-control" type="text" name="user" placeholder="Username" autocomplete="off">
		<input class="form-control" type="email" name="email" placeholder="Email" autocomplete="off">
		<input class="form-control" type="password" name="pass" placeholder="Password" autocomplete="new_password">

		<input class="btn btn-primary btn-block" type="submit" value="Register">
	</form>

    <?php
	if ($_SERVER['REQUEST_METHOD'] == "POST") {
		$username = $_POST['user'];
		$email = $_POST['email'];
		$password = $_POST['pass'];

		$hashedPassword = md5($password);
		$role = 'user';

		$stmt = $con->prepare('INSERT INTO users VALUES (?,?,?,?)');
		if ( $stmt->execute(array($username, $email, $hashedPassword, $role)) ){
			echo "<p>Welcome " . $username . " you registered successfully ! </p>";
		}else{
			echo "<p>an error has occured try again later.</p>";
		}
	  }
	?>

</body>
</html>