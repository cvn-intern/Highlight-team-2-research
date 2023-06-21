<?php session_start(); ?>
<nav class="navbar navbar-expand-lg navbar-light" style="background: #2ecc71;">
  <a class="navbar-brand" style="color: #fff;" href="index.php">Don't hack me!</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">

      <!-- Allow blogs access if logged in -->

      <?php
        if (isset($_SESSION['USERNAME'])) {
          echo '<li class="nav-item">
                  <a class="nav-link" style="color: #fff;" href="blog.php">Blog</a>
                </li>';
        }
      ?>

    </ul>

     <!-- Logged in or not -->

    <form class="form-inline my-2 my-lg-0 d-fe d-flex justify-content-center">
      <?php
        if (!isset($_SESSION['USERNAME'])) {
          echo "<a class='nav-link' style='color: #fff;' href='register.php'>Register</a>
                <a class='nav-link' style='color: #fff;' href='login.php'>Login</a>";
        }else{
         echo "<a class='nav-link' href='#' style='color: #fff;'>Welcome back, " . $_SESSION['USERNAME'] . "</a>";
         echo "<a class='nav-link' href='logout.php' style='color: #fff;'>Logout</a>";
        }
      ?>
    </form>
  </div>
</nav>