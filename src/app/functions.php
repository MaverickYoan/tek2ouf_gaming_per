<?php
function createThumbnail($srcPath, $destPath, $thumbWidth = 200)
{
    $info = getimagesize($srcPath);
    if ($info === false) return false;
    $mime = $info['mime'];
    switch ($mime) {
        case 'image/jpeg':
            $srcImg = imagecreatefromjpeg($srcPath);
            break;
        case 'image/png':
            $srcImg = imagecreatefrompng($srcPath);
            break;
        default:
            return false;
    }
    $width = imagesx($srcImg);
    $height = imagesy($srcImg);
    $thumbHeight = intval($height * $thumbWidth / $width);
    $thumbImg = imagecreatetruecolor($thumbWidth, $thumbHeight);
    if ($mime === 'image/png') {
        imagealphablending($thumbImg, false);
        imagesavealpha($thumbImg, true);
    }
    imagecopyresampled($thumbImg, $srcImg, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $width, $height);
    if ($mime === 'image/jpeg') imagejpeg($thumbImg, $destPath, 85);
    else imagepng($thumbImg, $destPath, 8);
    imagedestroy($srcImg);
    imagedestroy($thumbImg);
    return $destPath;
}