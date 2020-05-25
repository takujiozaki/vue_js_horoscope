<?php

//GET CURRENT DATE
$year = date("Y");
$month = date("m");
$date = date("d");

$url = "http://api.jugemkey.jp/api/horoscope/free/".$year."/".$month."/".$date;

$json = file_get_contents($url);
//$json = mb_convert_encoding($json, 'UTF8', 'ASCII, JIS, UTF-8, EUC-JP, SJIS-WIN');
$json_arr = json_decode($json, true);

header("Content-Type: text/javascript; charset=utf-8");
echo json_encode($json_arr);
exit();
