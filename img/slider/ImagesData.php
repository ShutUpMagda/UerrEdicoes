<?php

class ImagesData
{
    public $imgName;
    public $imgId;
    public $imgsData = [];
    public $imgDefaultUrl;
    public $imgBookUrl;
    private $imgPath;

    function __construct()
    {
        $this->dir = getcwd();
        $this->imgBookUrl = $this->getUrlAndProtocol() . '/index.php/inicio/catalog/book/';
        $this->imgDefaultUrl = $this->getImgUrl(null);
    }

    function getUrlAndProtocol()
    {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = gethostname();
        return $protocol . $domainName;
    }

    function getImgsList()
    {
        $images = glob($this->dir . '/*.{png}', GLOB_BRACE);
        return $images;
    }

    function getImgName($imgPath)
    {
        $arr = explode("/", $imgPath);
        $imgName = $arr[10];
        return $imgName;
    }
    
    function getImgId($imgName){
        $id = str_replace(".png", "", $imgName);
        return $id;
    }

    function getImgRgb($imgPath)
    {
        $im = imagecreatefrompng($imgPath);
        $rgb = imagecolorat($im, 10, 15);
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;
        $imgRgb = $r . ',' . $g . ',' . $b;
        return $imgRgb;
    }

    function getImgRgbContrast($rgb)
    {
        $pieces = explode(',', $rgb);
        $r = ($pieces[0] < 128) ? 255 : 0;
        $g = ($pieces[1] < 128) ? 255 : 0;
        $b = ($pieces[2] < 128) ? 255 : 0;
        $imgRgb = $r . ',' . $g . ',' . $b;
        return $imgRgb;
    }

    function getImgUrl($imgPath)
    {
        $imgName = $this->getImgName($imgPath) ?: (isset($imgName) ? $imgName : '');
        $basename = basename(__FILE__);
        $url = $this->getUrlAndProtocol() . $_SERVER['REQUEST_URI'];
        $link = str_replace($basename, "", $url);
        return $link . $imgName;
    }

    function getImgsData()
    {
        $i = 0;
        foreach ($this->getImgsList() as $path) {
            $this->imgPath = $path;
            $this->imgName = $this->getImgName($this->imgPath);
            $this->imgsData[$i]['imgName'] = $this->imgName;
            $this->imgsData[$i]['imgId'] = $this->getImgId($this->imgName);
            $this->imgsData[$i]['imgRgb'] = $this->getImgRgb($this->imgPath);
            $this->imgsData[$i]['imgRgbContrast'] = $this->getImgRgbContrast($this->getImgRgb($this->imgPath));
            $this->imgsData[$i]['imgUrl'] = $this->getImgUrl($this->imgPath);
            $this->imgsData[$i]['imgDefaultUrl'] = $this->imgDefaultUrl;
            $this->imgsData[$i]['imgBookUrl'] = $this->imgBookUrl.$this->imgsData[$i]['imgId'];
            $i++;
        }
        header('Content-Type: application/json');
        echo json_encode($this->imgsData);
    }
}
$ImagesData = new ImagesData;
$ImagesData->getImgsData();
