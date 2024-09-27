Best Burger - fiktives Burger Restaurant

Beim Best Burger-Projekt wurde eine One-Page-Website erstellt, die einer Burgerkette nachempfunden ist. Das Projekt konzentriert sich auf die Implementierung einer Reservierungsfunktion, die Umsetzung des Designs sowie die Integration interaktiver Features. Zusätzlich wurde ein Light Mode integriert, obwohl das Design ursprünglich dunkel gehalten ist. Ein besonderes Feature ist das "Heatmeter", das die Schärfe der Saucen von grün (nicht scharf) bis rot (sehr scharf) anzeigt. Beim Anklicken der Saucennamen wird die Schärfe auf der Skala farblich dargestellt.

Die Website ermöglicht es Nutzern, eine Tischreservierung vorzunehmen und über eine Fetch-Anfrage eine interaktive Karte zu verwenden, auf der freie und besetzte Tische angezeigt werden. Nach der Auswahl eines Tisches und der Eingabe der Kontaktdaten wird die Reservierung in einer MySQL-Datenbank gespeichert. Administratoren können durch die Tastenkombination Strg + Alt + A (in der realen Live-Version durch ein sicheres Login geschützt) oder über die Datei view_reservations.php auf die gespeicherten Daten zugreifen und diese in Tabellenform einsehen und bearbeiten. Erfolgs- und Fehlermeldungen werden dabei dynamisch über PHP ausgegeben. 

Installation

Über xampp oder einen anderen Webserver der PHP und SQL unterstützt hosten. Man muss die Datenbank db_reservations erstellen. Eine Möglichkeit dazu wäre unter Nutzung von xampp "https://localhost/phpmyadmin" öffnen und das SQL Statement welches in der Datei "best-burger/db_reservations/db_reservations.sql" steht ausführen.

Schritte, um das Projekt lokal zu installieren:

Repository klonen: git clone https://github.com/andreaslesovsky/best-burger.git

Autoren

Andreas Lesovsky

Lizenz

Dieses Projekt steht unter der MIT-Lizenz.
