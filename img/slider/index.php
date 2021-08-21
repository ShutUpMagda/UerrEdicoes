<?php

class ImagesData
{
    public $imgName;
    public $imgId;
    public $imgsData = [];
    public $sliderPath;
    public $imgBookUrl;
    public $imgSeriesUrl;
    public $imgObjUrl;

    function __construct()
    {
        $this->dir = getcwd();
        $this->imgBookUrl = $this->getUrlAndProtocol() . '/index.php/inicio/catalog/book/';        
        $this->imgSeriesUrl = $this->getUrlAndProtocol() . '/index.php/inicio/catalog/series/';
        $this->sliderPath = $this->getImgUrl(null);
    }

    function getUrlAndProtocol()
    {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = gethostname();
        return $protocol . $domainName;
    }

    /**
     * Recupera a lista de imagens do tipo '.png' em $this->dir;
     * As imagens do tipo '.svg' não aparecem na lista;
     * @return Array
     */
    function getImgsList()
    {
        $images = glob($this->dir . '/*.{png}', GLOB_BRACE);
        return $images;
    }

    function getImgName($imgPath)
    {
        return basename($imgPath);
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
        $obj = [];
        foreach ($this->getImgsList() as $imgPath) {
            $this->imgName = $this->getImgName($imgPath);
            $this->imgId = $this->getImgId($this->imgName);
            $this->imgsData[$i]['imgName'] = $this->imgName;
            $this->imgsData[$i]['imgId'] = $this->imgId;
            $this->imgsData[$i]['imgRgb'] = $this->getImgRgb($imgPath);
            $this->imgsData[$i]['imgRgbContrast'] = $this->getImgRgbContrast($this->getImgRgb($imgPath));
            $this->imgsData[$i]['imgUrl'] = $this->getImgUrl($imgPath);
            $this->imgsData[$i]['imgObjUrl'] = is_numeric($this->imgId) ? $this->imgBookUrl.$this->imgId : $this->imgSeriesUrl.$this->imgId;
            $i++;
        }
        $obj['sliderPath'] = $this->sliderPath;
        $obj['imgs'] = $this->imgsData;
        header('Content-Type: application/json');
        echo json_encode($obj);
    }
}
$ImagesData = new ImagesData;
$ImagesData->getImgsData();
