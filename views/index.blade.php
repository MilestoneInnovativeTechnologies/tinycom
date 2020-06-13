<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('tinycom.name') }} - {{ config('tinycom.caption') }}</title>
    <base href="https://templatemo.com/templates/templatemo_491_flat/" />
    <!--
    Flat Template
    http://www.templatemo.com/tm-491-flat
    -->
    <!-- load stylesheets -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400">    <!-- Google web font "Open Sans" -->
    <script src="https://kit.fontawesome.com/603b1ceeb5.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css">                                  <!-- Bootstrap style -->
    <link rel="stylesheet" href="css/hero-slider-style.css">                              <!-- Hero slider style (https://codyhouse.co/gem/hero-slider/) -->
    <link rel="stylesheet" href="css/magnific-popup.css">                                 <!-- Magnific popup style (http://dimsemenov.com/plugins/magnific-popup/) -->

    <link rel="stylesheet" href="css/templatemo-style.css">                               <!-- Templatemo style -->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <style>

        .cd-hero-slider li:first-of-type {
            background-image: url("https://image.freepik.com/free-photo/blurred-background-store-shopping-mall-blur-background-with-bokeh-vintage-filtered-image_1253-1414.jpg") !important;
        }
        .cd-hero-slider li:nth-of-type(2) {
            background-image: url("https://image.freepik.com/free-photo/abstract-blur-shopping-mall-department-store-interior-background_1417-5929.jpg") !important;
        }
        .cd-hero-slider li:nth-of-type(3) {
            background-image: url("https://image.freepik.com/free-photo/blurred-indoor-shopping-center-from_23-2148225021.jpg") !important;
        }
        .cd-hero-slider li:nth-of-type(4) {
            background-image: url("https://st3.depositphotos.com/1875497/17907/i/1600/depositphotos_179076906-stock-photo-abstract-blur-supermarket-shopping-mall.jpg") !important;
        }

    </style>
</head>

<body>

<!-- Content -->
<div class="cd-hero">

    <!-- Navigation -->
    <div class="cd-slider-nav">
        <nav class="navbar">

            <button class="navbar-toggler hidden-md-up" type="button" data-toggle="collapse" data-target="#tmNavbar">
                &#9776;
            </button>
            <div class="collapse navbar-toggleable-sm text-xs-center text-uppercase tm-navbar" id="tmNavbar">
                <ul class="nav navbar-nav">
                    <li class="nav-item active selected"><a class="nav-link" href="http://milestoneit.net" data-no="1">{{ config('tinycom.name') }}<span class="sr-only">(current)</span></a></li>
                    <li class="nav-item"><a class="nav-link" href="http://milestoneit.net" data-no="2">Details</a></li>
                    <li class="nav-item"><a class="nav-link" href="http://milestoneit.net" data-no="3">Clients</a></li>
                    <li class="nav-item"><a class="nav-link" href="http://milestoneit.net" data-no="4">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="http://milestoneit.net" data-no="5">Register</a></li>
{{--                    <li class="nav-item"><a class="nav-link" href="#0" data-no="5">Contact</a></li>--}}
                </ul>
            </div>
        </nav>
    </div>

    <ul class="cd-hero-slider">  <!-- autoplay -->
        <li class="selected">
            <div class="cd-full-width">
                <div class="container-fluid js-tm-page-content tm-page-1" data-page-no="1">

                    <div class="row">

                        <div class="col-xs-12">
                            <i class="fa fa-4x fa-award tm-icon"></i>
                            <h2 class="tm-site-name">{{ config('tinycom.name') }}</h2>
                            <div class="tm-bg-white-translucent text-xs-left tm-textbox tm-textbox-1-col">
                                <p class="tm-text">{{ config('tinycom.name') }} enables your business to be extended among your clients by means of a tiny e-commerce website. You are entitled to add products categories set their price, selling price, analyse the sales happened in last hours, keep track of orders un till they get delivered.</p>
                                <p class="tm-text"><a href="javascript:return ;">For more details navigate to details page</a></p>
                            </div>
                        </div>

                    </div>

                </div>
            </div> <!-- .cd-full-width -->
        </li>

        <li>
            <div class="cd-full-width" style="margin: 80px auto;">

                <div class="container-fluid js-tm-page-content" data-page-no="2">

                    <div class="row">
                        <div class="col-xs-12">
                            <div class="tm-2-col-container">

                                <div class="tm-bg-white-translucent text-xs-left tm-textbox tm-2-col-textbox">

                                    <h2 class="tm-text-title">Customer Interface</h2>
                                    <p class="tm-text">Customers are able to place orders from the ease of their mobile, no more complication, only need mobile number, which should be entered just before the order conformation.</p>
                                    <p class="tm-text">Admin verifies the order by calling customer, confirms and generate a bill, which will be shared with customer via whatsapp, sms or by any other means, just for reference.</p>
                                    <p class="tm-text">Within no time, delivery man reaches the customer, handover the items, collect cash, return!!</p>

                                </div>

                                <div class="tm-bg-white-translucent text-xs-left tm-textbox tm-2-col-textbox">

                                    <h2 class="tm-text-title">Admin Interface</h2>
                                    <p class="tm-text">Admin panel is equipped with many options includes order confirmation, edit customer details, create new offers for single of multiple customers, fixed price offer for items, category wise discount.</p>
                                    <p class="tm-text">Live tracking of visitors and their cart, items, amount makes the admin more comfortable, all from their mobile using inbuilt web browser. No separate application required.</p>
                                    <p class="tm-text">See the pending orders, call and confirm the customer, edit details of customer if required, confirm order, send bill details. Analyse the sales done in last 7 days.</p>
                                    <p class="tm-text">Admin can create new offers for a specified customer, or customers, for a category or for a few items. Admin will be provided with a link, which should be shared with customers. Customers visiting through such links will see the offers set in that link.</p>
                                    <p class="tm-text">&nbsp;</p>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div> <!-- .cd-full-width -->

        </li>

        <li>

            <div class="cd-full-width">

                <div class="container-fluid js-tm-page-content" data-page-no="3">

                    <div class="row tm-img-gallery">
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
{{--                            <a href="img/tm-img-01.jpg">--}}
{{--                                <img src="img/tm-img-01-tn.jpg" alt="Image" class="img-fluid tm-img">--}}
{{--                            </a>--}}
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
{{--                            <a href="img/tm-img-02.jpg">--}}
{{--                                <img src="img/tm-img-02-tn.jpg" alt="Image" class="img-fluid tm-img">--}}
{{--                            </a>--}}
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
{{--                            <a href="img/tm-img-03.jpg">--}}
{{--                                <img src="img/tm-img-03-tn.jpg" alt="Image" class="img-fluid tm-img">--}}
{{--                            </a>--}}
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
{{--                            <a href="img/tm-img-04.jpg">--}}
{{--                                <img src="img/tm-img-04-tn.jpg" alt="Image" class="img-fluid tm-img">--}}
{{--                            </a>--}}
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
{{--                            <a href="img/tm-img-05.jpg">--}}
{{--                                <img src="img/tm-img-05-tn.jpg" alt="Image" class="img-fluid tm-img">--}}
{{--                            </a>--}}
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
{{--                            <a href="img/tm-img-06.jpg">--}}
{{--                                <img src="img/tm-img-06-tn.jpg" alt="Image" class="img-fluid tm-img">--}}
{{--                            </a>--}}
                        </div>
                    </div>

                </div>

            </div>

        </li>

        <li>
            <div class="cd-full-width">

                <div class="container-fluid js-tm-page-content" data-page-no="4">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="tm-2-col-container">

                                <div class="tm-bg-white-translucent text-xs-left tm-textbox tm-2-col-textbox contacts">
                                    <h2 class="tm-text-title">Milestone Innovative Technologies</h2>
                                    <p class="tm-text">Wisma Pam, Ovungal Bazar<br />Chavakkad, Thrissur<br />Kerala, India - 680506</p>
                                    <h3 class="tm-text-title">Contacts</h3>
                                    <p class="tm-text">
                                        Email: info@milestoneit.net<br />
                                        Phone: +91 790 22 555 00<br />
                                        Phone: +91 790 24 555 00<br />
                                        www.milestoneit.net<br />
                                    </p>
                                </div>

                                <div class="tm-bg-white-translucent text-xs-left tm-textbox tm-2-col-textbox">
                                    <h2 class="tm-text-title">Location</h2>
                                    <p class="tm-text">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.875331713861!2d76.02293841432848!3d10.588919092448931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7946fa99fad03%3A0x5bb2c044f3cb6a65!2sMilestone%20Innovative%20Technologies!5e0!3m2!1sen!2sin!4v1590211091088!5m2!1sen!2sin" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div> <!-- .cd-full-width -->

        </li>

        <li>
            <div class="cd-full-width">

                <div class="container-fluid js-tm-page-content" data-page-no="5">

                    <div class="tm-contact-page">

                        <div class="row">

                            <div class="col-xs-12">

                                <h2 class="tm-section-title">Register</h2>
                                <p class="tm-text tm-font-w-400 m-b-3">
                                    Register and avail a free 14 days trail.<br />
                                    Already registered? Move to <a href="{!! route(!empty(config('tinycom.login_route')) ? config('tinycom.login_route') : 'login') !!}">login page</a>
                                </p>

                            </div>

                        </div>

                        <!-- contact form -->
                        <div class="row">
                            <form action="{{ route('register') }}" method="post" class="tm-contact-form">@csrf

                                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div class="form-group"><input type="text" name="company" class="form-control" placeholder="Company Name"  required/></div>
                                    <div class="form-group row">
                                        <div class="col-xs-6"><input type="text" id="domain" name="sub" class="form-control" placeholder="Domain"  required/></div>
                                        <div class="col-xs-6"><select name="domain" class="form-control">@forelse(config('tinycom.domains') as $domain) <option value="{{ $domain }}">.{{ $domain }}</option> @endforeach</select></div>
                                        <span class="col-xs-12">This is where your customers can access your products and purchase them.</span>
                                    </div>
                                </div>

                                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div class="form-group"><input type="text" name="name" class="form-control" placeholder="Your Name"  required/></div>
                                    <div class="form-group"><input type="email" name="email" class="form-control" placeholder="Email"  required/></div>
                                    <div class="form-group">
                                        <input type="password" name="password" class="form-control" placeholder="Password"  required/>
                                        <span>This is same password used to access admin panel of your {{ config('tinycom.name') }} portal</span>
                                    </div>
                                </div>

                                <div class="col-xs-12">
                                    <button type="submit" class="pull-xs-right tm-submit-btn">Register</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </div> <!-- .cd-full-width -->
        </li>
    </ul> <!-- .cd-hero-slider -->

    <footer class="tm-footer">

        <div class="tm-social-icons-container">
            <a href="https://www.facebook.com/MilestoneInnovativeTechnologies" class="tm-social-link"><i class="fa fa-facebook"></i></a>
{{--            <a href="#" class="tm-social-link"><i class="fa fa-google-plus"></i></a>--}}
{{--            <a href="#" class="tm-social-link"><i class="fa fa-twitter"></i></a>--}}
{{--            <a href="#" class="tm-social-link"><i class="fa fa-behance"></i></a>--}}
{{--            <a href="#" class="tm-social-link"><i class="fa fa-linkedin"></i></a>--}}
        </div>

        <p class="tm-copyright-text">Copyright &copy; {{ date('Y') }} <a href="http://milestoneit.net" target="_blank">Milestone Innovative Technologies</a></p>

    </footer>

</div> <!-- .cd-hero -->


<!-- Preloader, https://ihatetomatoes.net/create-custom-preloading-screen/ -->
<div id="loader-wrapper">

    <div id="loader"></div>
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>

</div>

<!-- load JS files -->
<script src="js/jquery-1.11.3.min.js"></script>         <!-- jQuery (https://jquery.com/download/) -->
<script src="https://www.atlasestateagents.co.uk/javascript/tether.min.js"></script> <!-- Tether for Bootstrap (http://stackoverflow.com/questions/34567939/how-to-fix-the-error-error-bootstrap-tooltips-require-tether-http-github-h) -->
<script src="js/bootstrap.min.js"></script>             <!-- Bootstrap js (v4-alpha.getbootstrap.com/) -->
<script src="js/hero-slider-main.js"></script>          <!-- Hero slider (https://codyhouse.co/gem/hero-slider/) -->
<script src="js/jquery.magnific-popup.min.js"></script> <!-- Magnific popup (http://dimsemenov.com/plugins/magnific-popup/) -->

<script>

    function adjustHeightOfPage(pageNo) {

        // Get the page height
        var totalPageHeight = 15 + $('.cd-slider-nav').height()
            + $(".cd-hero-slider li:nth-of-type(" + pageNo + ") .js-tm-page-content").height() + 160
            + $('.tm-footer').height() - 175;

        // Adjust layout based on page height and window height
        if(totalPageHeight > $(window).height())
        {
            $('.cd-hero-slider').addClass('small-screen');
            $('.cd-hero-slider li:nth-of-type(' + pageNo + ')').css("min-height", totalPageHeight + "px");
        }
        else
        {
            $('.cd-hero-slider').removeClass('small-screen');
            $('.cd-hero-slider li:nth-of-type(' + pageNo + ')').css("min-height", "100%");
        }

        $('iframe').height($('.tm-2-col-textbox.contacts').height()-64)

    }

    /*
        Everything is loaded including images.
    */
    $(window).load(function(){

        adjustHeightOfPage(1); // Adjust page height

        /* Gallery pop up
        -----------------------------------------*/
        $('.tm-img-gallery').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery:{enabled:true}
        });

        /* Collapse menu after click
        -----------------------------------------*/
        $('#tmNavbar a').click(function(){
            $('#tmNavbar').collapse('hide');

            adjustHeightOfPage($(this).data("no")); // Adjust page height
        });

        /* Browser resized
        -----------------------------------------*/
        $( window ).resize(function() {
            var currentPageNo = $(".cd-hero-slider li.selected .js-tm-page-content").data("page-no");
            adjustHeightOfPage( currentPageNo );
        });

        // Remove preloader
        // https://ihatetomatoes.net/create-custom-preloading-screen/
        $('body').addClass('loaded');

    });

</script>

</body>
</html>