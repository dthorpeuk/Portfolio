<!DOCTYPE html>
<html lang="en">

<head>
    <title >Daniel Thorpe's Homepage</title>
    <!-- <link rel="stylesheet" href="js/glitch/style.css"> -->
    <link rel="stylesheet" href="js/text-mask/style.css">
    <link rel="stylesheet" href="js/transmission/style.css">
    <link rel="stylesheet" href="css/styles.css">
    <meta name="viewport" content="width=device-width">
</head>

<body class="page-primary">


    <!-- <div class="topbar">
                <div class="topbar-left">
                    <div class="topbar-header">
                        <h1>DT</h1>
                    </div>
                    <div class="top-social">
                       <a href="https://github.com/dthorpeuk/" ><div class="social-item icon-git"></div></a>
                    </div>
                </div>
                <div class="topbar-right">
                    <div class="topbar-row1">
                        <a href="About-Me.html" class="top-link">About Me</a>
                        <a href="My-Portfolio.html" class="top-link">My Portfolio</a>
                        <a href="Coding-Examples.html" class="top-link">Coding Examples</a>
                    </div>
                    <div class="topbar-row2">
                        <a href="SCS-Scheme.html" class="top-link-sec side-contact">SCS Scheme</a>
                        <a href="#contact" class="top-link-sec side-contact">Contact Me</a>
                    </div>
                </div>
            </div> -->
    <!-- <div class="corner-plate">
        <a href = "index.php">
        <div class="initials-plate">
            <h1>DT</h1>
        </div>
        </a>
        <div class="social-bar">
            <a href="https://github.com/dthorpeuk/" class="social-link">
                <div class="social-item icon-git">
                </div>
            </a>
            <a href="#" class="social-link">
                <div class="social-item icon-linkedin">
                </div>
            </a>
        </div>
    </div> -->
    <?php
        include 'php/initials.php'
    ?>
    <div id="nav-component"></div>
    <!-- <div id="test-button">Test</div> -->
    <!-- <div class="sidebar">
            <div class="sidebar-content">
            <div class="side-header">
            <a href="index.html"><h1>DT</h1></a>
            </div>
            <div class="side-main">
                <a href="About-Me.html" class="side-link">About Me</a>
                <a href="My-Portfolio.html" class="side-link">My Portfolio</a>
                <a href="Coding-Examples.html" class="side-link">Coding Examples</a>
                <a href="SCS-Scheme.html" class="side-link">SCS Scheme</a>
                <a href="#contact" class="side-link side-contact">Contact Me</a>
            </div>
            <div class="social">
                <a href="https://github.com/dthorpeuk/" ><div class="social-item icon-git"></div></a>
            </div>
                    </div>
                </div> -->
    <!-- </aside> -->

    <div class="main">
        <header>
        <video autoplay muted loop class = "vid-background">
                    <source src="videos/codebackground.mp4" type="video/mp4">
                    </video>
            <div id="header-section" class="header-section">

                <div class="container title-container container-for-back-img test">
                    <!-- <div class="title-container container-for-back-img"> -->
                    <h1 class="title noselect">My Name Is Daniel Thorpe</h1>
                    <!-- </div> -->
                    <!-- <div class="glitch-window">
                    <h1 class="h1.glitched">My Name Is Daniel Thorpe</h1>
                </div> -->

                    <h2 class="mast__text  js-spanize noselect">I'm a Software Engineer</h2>
                </div>
                <a href="#project-grid" class="scroll scroll-down">Scroll Down<br><span class="chevron-down"></span></a>
        
            </div>
        </header>

        <?php
        include 'php/projects.php';
       ?>
        <!-- <div class="container project-section">
            <div id="project-grid" class="project-grid ">
                <a href="netmatters-php/index.php" class="project-card proj1">
                    <div class="project-img"><img src="Images/CAD.jpg" alt="Project 1"></div>
                    <div class="card-link-container">
                        <h3 class="link-title">Netmatters Replica</h3>
                        <span class="link-text">View Project<span class="icon-arrow-right"></span></span>
                    </div>
                </a>


                <a href="#" class="project-card proj2">
                    <div class="project-img"><img src="Images/CAD.jpg" alt="Project 2"></div>
                    <div class="card-link-container">
                        <h3 class="link-title">Project 2</h3>
                        <span class="link-text">View Project<span class="icon-arrow-right"></span></span>
                    </div>
                </a>
                <a href="#" class="project-card proj3">
                    <div class="project-img"><img src="Images/CAD.jpg" alt="Project 3"></div>
                    <div class="card-link-container">
                        <h3 class="link-title">Project 3</h3>
                        <span class="link-text">View Project<span class="icon-arrow-right"></span></span>
                    </div>
                </a>
                <a href="#" class="project-card proj4">
                    <div class="project-img"><img src="Images/CAD.jpg" alt="Project 4"></div>
                    <div class="card-link-container">
                        <h3 class="link-title">Project 4</h3>
                        <span class="link-text">View Project<span class="icon-arrow-right"></span></span>
                    </div>
                </a>
                <a href="#" class="project-card proj5">
                    <div class="project-img"><img src="Images/CAD.jpg" alt="Project 5"></div>
                    <div class="card-link-container">
                        <h3 class="link-title">Project 5</h3>
                        <span class="link-text">View Project<span class="icon-arrow-right"></span></span>
                    </div>
                </a>
                <a href="#" class="project-card proj6">
                    <div class="project-img"><img src="Images/CAD.jpg" alt="Project 6"></div>
                    <div class="card-link-container">
                        <h3 class="link-title">Project 6</h3>
                        <span class="link-text">View Project<span class="icon-arrow-right"></span></span>
                    </div>
                </a>

            </div>
        </div> -->
        <?php 
        //include 'php/mailerGmail.php';
           include 'php/contact-form.php';
        ?>
        <!--  -->
        <!-- <div class="container">
            <div id="contact" class="contact">
                <div class="contact-info">
                    <h2>Get In Touch</h2>
                    <p>Words Words Words Words Words Words Words Words</p>
                    <h2>00000 0000000</h2>
                    <h3>email@email.com</h3>
                    <p>Words Words Words Words Words Words Words Words</p>
                </div>

                <form class="contact-form" method="post" action="php/formValidation.php">
                    <div class="message-area"></div>
                    <div class="names">
                        <input type="text" name="fname" class="fname text-input" placeholder="First Name" required>
                        <input type="text" name="lname" class="lname text-input" placeholder="Last Name" required>
                    </div>
                    <input type="text" name="email" class="email text-input" placeholder="Email" required>
                    <input type="text" name="subject" class="subject text-input" placeholder="Subject">
          
                    <textarea name="message" class="message text-input" placeholder="Message"></textarea>
                    <div>
                        <button name="submit" class="submit-btn">Submit</button>
                       
                    </div>
                </form>
            </div>
        </div> -->



        <!--  -->
        <div class="scroll-container">
            <a href="#header-section" class="scroll scroll-up"><span class="chevron-up"></span><br>Back To Top</a>
        </div>
    </div>
   
    <!-- <div class="filler-bottom"></div> -->
    <script src="js/jQuery_v3.7.1/jQuery_v3.7.1.js"></script>
    <!-- <script src="js/glitch/script.js"></script> -->
    <script src="js/transmission/script.js"></script>
    <script src="js/text-mask/script.js"></script>
    <script src="js/nav-component/nav-component.js"></script>
    <script src="js/submitForm.js"></script>
    <!-- <script src="js/main.js"></script> -->

</body>

</html>