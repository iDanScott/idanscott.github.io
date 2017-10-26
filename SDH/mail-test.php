<?php
// the message
$msg = "Email test\n\r";

// use wordwrap() if lines are longer than 70 characters
$message = wordwrap($msg,70);

// send email
$to = "daniel@sdhardware.co.uk";

$subject = "Dans mail test";

$headers = "From: dan@idanscott.co.uk\r\n";
$headers .= "Reply-To: dan@idanscott.co.uk\r\n";
$headers .= "Return-Path: dan@idanscott.co.uk\r\n";
$headers .= "CC: daniel@sdhardware.co.uk\r\n";

if ( mail($to,$subject,$message,$headers) ) {
   echo "The email has been sent!";
   } else {
   echo "The email has failed!";
   }
?>
