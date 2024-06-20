

<?php

function validateLink($link, $expirationSeconds = 10) {
    // Check if the timestamp is provided and is a valid integer
    $timestamp = isset($_GET['timestamp']) && is_numeric($_GET['timestamp']) ? (int)$_GET['timestamp'] : 0;

    // Validate the timestamp
    if ($timestamp > 0) {
        // Calculate the expiration time
        $expirationTime = $expirationSeconds;

        // Check if the link has expired
        if (time() - $timestamp <= $expirationTime) {
            // Link is still valid
            header('Location: ' . $link);
            exit();
        } else {
            // Link has expired
            echo "Link has expired!";
            // You might want to redirect or display an error message
        }
    } else {
        // Invalid timestamp
        echo "Invalid timestamp!";
        // Handle this case appropriately
    }
}

// Example usage:
$link = "https://chipper-chebakia-09ad07.netlify.app/?timestamp=" . time();
validateLink($link);

?>


