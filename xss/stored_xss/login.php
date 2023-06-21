<?php
	session_start();
	error_reporting(E_ERROR | E_PARSE);

	include 'connection.php';

	if ($_SERVER['REQUEST_METHOD'] == "POST"){
		$username = $_POST['username'];
		$password = $_POST['password'];

		$hashedPassword = md5($password);

		$stmt = $con->prepare('SELECT username, password FROM users WHERE username = ? AND Password = ? AND role = ?');
		$stmt->execute(array($username, $hashedPassword, 'admin'));
		$a_rows = $stmt->rowCount();

		$stmt->execute(array($username, $hashedPassword, 'user'));
		$u_rows = $stmt->rowCount();		

		if ( $a_rows > 0 ) {

			//admin logged
			$_SESSION['USERNAME'] = $username;
			$_SESSION['ROLE'] = 'Admin';

			header("location: welcome.php");

		}
		elseif ( $u_rows > 0 ) {
			//user logged
			$_SESSION['USERNAME'] = $username;
			$_SESSION['ROLE'] = 'Admin';

			header("location: welcome.php");

		}
		else{
			echo "Wrong username or password.";
		}
	}	

?>

<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/global.css">
</head>
<body style="text-align: center; background-color: #E5E5E5;">

	<?php include 'navbar.php'; ?> <br>

	<br><h1>Login</h1><br>
	<b><p>Please enter your credentials</p></b>

	<form class="forms" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
		<input class="form-control" type="text" name="username" placeholder="Username" autocomplete="off">
		<input class="form-control" type="password" name="password" placeholder="Password" autocomplete="new_password">

		<input class="btn btn-primary btn-block" type="submit" name="submit" value='Login'>
	</form>
</body>
</html>