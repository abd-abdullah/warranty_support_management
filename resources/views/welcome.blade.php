
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="apple-touch-icon" sizes="76x76" href="{{asset('img/logo.jpg')}}">
  <link rel="icon" type="image/png" href="{{asset('img/logo.jpg')}}">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>{{env('APP_NAME')}}</title>
  <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link href="{{asset('css/app.css?v='.env('PJVER',1))}}" rel="stylesheet" />
</head>

<body>
  <div id="app">
  </div>
  <script>
        window.jsUtlt = [];
        jsUtlt['siteUrl']  = function(addr){
            addr = typeof addr != "undefined" ? addr : "";
            return "<?php echo url('');?>/"+addr;
        };
  </script>
  <script src="{{asset('js/manifest.js?v='.env('PJVER',1))}}"></script>
  <script src="{{asset('js/vendor.js?v='.env('PJVER',1))}}"></script>
  <script src="{{asset('js/app.js?v='.env('PJVER',1))}}"></script>
</body>

</html>