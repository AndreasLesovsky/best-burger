<?php
require("includes/db.inc.php");
require("includes/config.inc.php");

$conn = dbConnect();

?>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes">
    <title>boss burger</title>
    <link rel="stylesheet" href="css/importer.css">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/config.css">
    <link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/media.css">
	<link rel="stylesheet" href="css/view_reservations.css">
    <link rel="icon" href="media/icon.svg">
	<script src="https://kit.fontawesome.com/7933e77e42.js" crossorigin="anonymous"></script>
	<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="script.js"></script>
</head>

<body>
    <header>
		<a href="#" class="logo">
			<h1>
				boss burger<br>
				<small>Premium Burger Restaurant</small>
			</h1>
		</a>
		
		<nav>
			<ul>
				<li><a href="index.php#ueber-uns">Über Uns</a></li>
				<li><a href="index.php#burgers">Burgers</a></li>
				<li><a href="index.php#wings">Wings</a></li>
				<li><a href="index.php#reserve">Reservieren</a></li>
			</ul>
		</nav>

		<ul class="social">
			<li><a href="#" class="hvr-grow-rotate"><i class="fa-brands fa-facebook-f"></i></a></li>
			<li><a href="#" class="hvr-grow-rotate"><i class="fa-brands fa-x-twitter"></i></a></li>
			<li><a href="#" class="hvr-grow-rotate"><i class="fa-brands fa-instagram"></i></a></li>
		</ul>

		<button id="menu-btn" aria-expanded="false">
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
		</button>
    </header>
	
	<main>
	<div class="wrapper-inner">
		<?php
			$sql = "SELECT
						*
					FROM tbl_reservations";
			$result = $conn->query($sql);

			if ($result->num_rows > 0) {
				echo "<table>";
				echo "<tr><th>ID</th><th>Name</th><th>E-Mail</th><th>Telefonnummer</th><th>Datum</th><th>Uhrzeit</th><th>Tischnummer</th></tr>";
				while ($row = $result->fetch_assoc()) {
					echo "<tr>";
					echo "<td>" . $row['id'] . "</td>";
					echo "<td>" . $row['name'] . "</td>";
					echo "<td>" . $row['email'] . "</td>";
					echo "<td>" . $row['phone'] . "</td>";
					echo "<td>" . $row['res_date'] . "</td>";
					echo "<td>" . $row['res_time'] . "</td>";
					echo "<td>" . $row['table_number'] . "</td>";
					echo "</tr>";
				}
				echo "</table>";
			}
			else {
				echo "<p class='error'>Keine Reservierungen gefunden.</p>";
			}
		?>
		</div>
	</main>
	
	<footer id="footer">
		<div class="wrapper-inner">
			<ul>
				<li><a href="#">Catering</a></li>
				<li><a href="#">Jobs</a></li>
			</ul>
			<address>
				©2024 AL
			</address>
		</div>
    </footer>
</body>

</html>