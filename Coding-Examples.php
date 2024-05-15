<html class="page-secondary">
    <head>
        <link rel="stylesheet" href="css/styles.css">
        <meta name="viewport" content="width=device-width">
    </head>
    <body class="page-coding-examples page-secondary">
        <!-- <div class="topbar">
            <div class="topbar-left">
                <div class="topbar-header">
                    <a href="index.html"><h1>DT</h1></a>
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
<?php
    include 'php/initials.php';
?>
        <div id="nav-component"></div>
        <video autoplay muted loop class = "vid-background">
                    <source src="videos/codebackground.mp4" type="video/mp4">
                    </video>
        <div class="container-for-code reduced-container">

            <h1>Coding Examples</h1>
            <h2>Nav component</h2>
            <p>
                The Nav Component is a versatile alternative to a navigation bar. The component uses nodes to represent pages or groups of pages,
                and respond differently depending on the context of on-click events. There are two types of node: Branch nodes and Terminal nodes. 
                Branch nodes generate additional nodes based on the amount of sub-nodes when clicked, these move outward from the branch node, and position themselves
                in a pattern, based on the number of sub-nodes, around an invisible centre point. Terminal nodes are nodes that have no sub-nodes, and instead of
                opening additional nodes, they open a link to a page, or a position on a page. 
            </p>
            <div class="code-back">
            <pre><code class="code-segment code-segment-1">
                for(let i = 0;i < subNodesList.length;i++){

                    let subObj = getObjectFromName(subNodesList[i]);
                      createNavNode(subNodesList[i],subObj.link,orX,orY);
                     
                      if(getObjectFromName(subNodesList[i]).subNodes.length == 0){
                       let el = document.querySelector("." + getCircleTag(subNodesList[i])); 
                        el.classList.add("terminal-node");
                      }
                      let modifiedNodeNumber = subNodesList.length + 1;//Size of subnode list plus remain node turned into backnode
              
                      let rot = applyRotationLocal(offOriginX,offOriginY,localDiffX,localDiffY,(6.28318/modifiedNodeNumber)*(i+1));
                      rotArray.push(rot);
                }
 
</code></pre>    
</div>
<p>
The above section shows the loop for which new nodes are created in html and have their rotational positions calculated.
You can see a section here which assigns a node a 'terminal-node' class; this causes the node to provide a link when it is clicked
instead of opening subnodes.
</p>
<h2>Nav Node creation</h2>

<div class="code-back">
<pre><code class="code-segment code-segment-2">
    function createNavNode(navName,theLink, posX=0,posY=0){
        
        let elementTag =getNavTag(navName);
        let textTag = getTextTag(navName);
        let iconTag = getIconTag(navName);
        let circleTag = getCircleTag(navName);
        nav.innerHTML += <xmp>'<div class="nav-node  '+elementTag+' "
             href="'+theLink +'"><div class="nav-circle '+ circleTag +'"  >
            <div class = "nav-icon ' + iconTag + '"></div></div>
            <div class="nav-text '+ textTag +' ">'+ navName +'</div></div>';</xmp>
        let element = document.querySelector("."+elementTag);
      
        element.style.top = posY ;
        element.style.left = posX ;
      }

</code></pre>  

</div>
<p>
    The section above shows the process for actually creating the individual nave nodes in html.
    The element has all its components names and classes infered from its name, (e.g. "code" will become nav-node-code) and then added to the innerHTML.
    </p>  
<h2>Apply Rotation</h2>

<div class="code-back">
<pre><code class="code-segment code-segment-2">
    function applyRotationLocal(originX,originY,orDiffX,orDiffY, angle){
        let orX = originX; 
        let orY = originY; 
        let tarY = orY + orDiffY;
        let tarX = orX + orDiffX;
        //Place coords in terms of origin
        let translateX = tarX - orX;
        let translateY = tarY - orY;
      
        let cosTheta = Math.cos(angle);
        let sinTheta = Math.sin(angle);
        let rotatedX = translateX * cosTheta - translateY * sinTheta;
        let rotatedY = translateX * sinTheta + translateY * cosTheta;
      
        return{
          x:rotatedX,
          y:rotatedY
        }
      }

</code></pre>  

</div>
<p>
    The above segment shows the code that places the navs in an orbit of an invisible point using basic triggernometry.

</p>
<p>
    The code used is JavaScript.
    The nav component was created to act as an alternative to this sites previous iterations sidebar and topbar.
</p>
        </div>
    <!-- </div> -->
    <script src="js/jQuery_v3.7.1/jQuery_v3.7.1.js"></script>
    <script src="js/nav-component/nav-component.js"></script>
            <script src="js/main.js"></script>
    </body>
</html>