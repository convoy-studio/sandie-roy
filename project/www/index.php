<!DOCTYPE html>
<html class="no-js">
   <head>
         <meta charset="utf-8">
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <title>Sandie Roy</title>
         <meta name="description" content="">
         <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">

         <meta property="og:title" content="">
         <meta property="og:site_name" content="">
         <meta property="og:description" content="">
         <meta property="og:image" content="">
         <meta property="og:type" content="website">
         <meta property="og:url" content="">

         <meta name="fragment" content="!">

         <!-- <link href="favicon.ico" rel="icon" type="image/x-icon" /> -->
         <script data-main="js/main" src="js/require.js"></script>
         <link rel="stylesheet" href="css/app.css">

   </head>

<body>
    
    <?php 
        if($_GET["lang"] === "en") {
            echo "<script type=\"text/javascript\">var JS_Lang = 'en';</script>";
        }else{
            echo "<script type=\"text/javascript\">var JS_Lang = 'fr';</script>";
        }
    ?>

   <div id="font-charger">
        <div id="bold">test</div>
        <div id="boldItalic">test</div>
        <div id="medium">test</div>
        <div id="mediumItalic">test</div>
    </div>  

   <div id="app-container"></div>

</body>
</html>