<?php
	session_start();
	error_reporting(E_ERROR | E_PARSE);

	include 'connection.php';

	function showComments(){
		$secret_data = "secret";
		GLOBAL $con;

		$statement = $con->prepare('SELECT user, comment FROM comments');
				$statement->execute();
				$count = $statement->rowCount();

				if ($count > 0) {
					while ( $database_comment = $statement->fetch(PDO::FETCH_ASSOC) ) {
						echo $database_comment['user'] . ' says : ' .

						$database_comment['comment'] . '<br><br>';
					}
				} else{ 
					echo 'No Comments Yet.';
				}
	}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Blog</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/global.css">
</head>
<body style="text-align: center; background-color: #E5E5E5;">
	<?php include 'navbar.php' ?> <br>
	<div class="container">

		<br>
		<h1>Blogging page</h1>

		<p style="margin-left: 15px;"><img src="https://icdn.dantri.com.vn/thumb_w/680/2023/06/20/vu-tan-cong-tai-dak-lak-tam-giu-74-doi-tuong-thu-hon-1-edited-1687234199395.jpeg" class="to-right">
			<h3 style="text-align: left; margin-left: 15px;">Vụ tấn công trụ sở 2 xã ở Đắk Lắk: Tạm giữ 74 đối tượng, thu 1.200 viên đạn</h3>
			(Dân trí) - Liên quan đến vụ tấn công trụ sở 2 xã tại địa bàn huyện Cư Kuin (Đắk Lắk), Công an tỉnh Đắk Lắk đã mời làm việc trên 100 đối tượng, tạm giữ hình sự 74 đối tượng để điều tra, làm rõ vụ án.
Sáng 20/6, tại buổi gặp mặt các cơ quan thông tấn báo chí nhân dịp Kỷ niệm 98 năm ngày Báo chí cách mạng Việt Nam (21/6/1925-21/6/2023), Thiếu tướng Lê Vinh Quy - Giám đốc Công an tỉnh Đắk Lắk - thông tin về tình hình an ninh trật tự trên địa bàn tỉnh 6 tháng đầu năm.
Nói về vụ tấn công trụ sở 2 xã Ea Tiêu và Ea Ktur (huyện Cư Kuin), Thiếu tướng Lê Vinh Quy cho biết, ngay sau khi xảy ra vụ việc, dưới sự chỉ đạo của Bộ Công an, Công an tỉnh Đắk Lắk khẩn trương, tập trung triển khai đồng bộ, quyết liệt các biện pháp đấu tranh để truy bắt bằng được các đối tượng gây ra vụ việc để xử lý nghiêm theo pháp luật.	
		</p>

		<br>

		<h3 style="float: left; margin-left: 20px;">Comments</h3>
		<br>
		<?php 
			if ($_SERVER['REQUEST_METHOD'] != 'POST') {
				showComments();
			}
			else{
				if (isset($_SESSION['USERNAME'])){
					$username = $_SESSION['USERNAME'];
					$comment = $_POST['thecomment'];
					$stmt = $con->prepare('INSERT INTO comments VALUES ( ?, ?)');
					// Sanitize
					// $comment = htmlspecialchars(strip_tags($comment));
					if ( $stmt->execute(array($_SESSION['USERNAME'], $comment)) ) {
						showComments();	
					}
				}
			}
		?>
		<form class="forms" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
			<textarea class="form-control" rows="4" name="thecomment" placeholder="Add Comment" autocomplete="off">
			</textarea>
			<input class="btn btn-primary btn-block" type="submit" value="comment">
		</form>
		<br>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
</body>
</html>
