<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$budget = $_POST['budget'];
$desc = $_POST['desc'];
$formcontent=" From: $name \n Phone: $phone \n Budget: $budget \n Description: $desc";
$recipient = "brsteele2123@gmail.com brian@one-pl.us carey@one-pl.us";
$subject = "One Plus One Site Contact";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader);
echo "Thank You!" . " -" . "<a href='index.html' style='text-decoration:none;color:#ff0099;'> Return Home</a>";
?>
