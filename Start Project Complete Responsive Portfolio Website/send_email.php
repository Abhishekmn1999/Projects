<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "abhishekmn603@gmail.com";
    $subject = $_POST["email_subject"];
    $message = "Name: " . $_POST["full_name"] . "\n"
             . "Email: " . $_POST["email"] . "\n"
             . "Mobile Number: " . $_POST["mobile_number"] . "\n"
             . "Message: " . $_POST["message"];
    
    $headers = "From: " . $_POST["email"] . "\r\n" .
               "Reply-To: " . $_POST["email"] . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "Failed to send the message. Please try again later.";
    }
} else {
    echo "Invalid request!";
}
?>
