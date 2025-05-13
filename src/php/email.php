<?php
session_start(); // Start session if not already started


// Database connection
// $servername = "localhost";
// $username = "webfaxrsrs_dataformrequest";
// $password = "JIQQomQW6C8Q";
// $dbname = "webfaxrsrs_archiveform";

// Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);

// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    // Honeypot field
    // if (!empty($_POST["honeypot"])) {
    //   BOT detected
    //     echo "Oops! Something went wrong."; 
    //     exit;
    // }

    // Check if all fields are filled
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        // If any field is empty, display message and do not proceed
        echo "Molimo popunite sva polja.";
        exit;
    }

    // Insert data into database
    // $sql = "INSERT INTO contact (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')";
    // if ($conn->query($sql) === TRUE) {
        // $_SESSION['feedback_message'] = "Hvala što ste nas kontaktirali. Uskoro ćemo vam odgovoriti.";

        // Send email notification
        $to = "filip.zivanovic1999@gmail.com";
        $subject = "Novi upit putem forme za individualne obuke";
        $message_body = "Stigao je novi upit putem individualne obuke:\n\n";
        $message_body .= "Ime i prezime: $name\n";
        $message_body .= "Email: $email\n";
        $message_body .= "Naslov: $subject\n";
        $message_body .= "Poruka: $message";
        $headers = "From: no-reply@webfax.rs\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

          // Send the email.
        if (mail($to, $subject, $message_body, $headers);) {
            // Set a 200 (okay) response code.
            http_response_code(200);
        echo "Hvala što ste nas kontaktirali. Uskoro ćemo vam odgovoriti.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
           echo "Došlo je do greške prilikom slanja vaše poruke. Molimo pokušajte kasnije.";

        }

} else {
    // If not a POST request, do nothing (or handle error)
    echo "Oops! Something went wrong.";
}

// $conn->close(); // Close database connection
?>