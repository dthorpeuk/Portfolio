
//Create the background and main nav element within the nav-component
initialise();
let nav = document.querySelector(".nav-inner");

// function openNavNode(e){

//     alert("pressed");
  
// }
const nodeDistFromCentre = 100;
const radians_in_circle = 6.28318;
const area_width = 1000;
const area_height = 1000;
const animation_speed = 1000;
const main_nav_position_offset = 50;//The position of the nav when accounting for the initial offset (typically half the offset)
//const root_start_position = {x:100,y:vhToPx(50)};
const root_start_margin = 100;
const root_start_margin_small = 10;
function vhToPx(n){
  const viewportHeight = window.innerHeight;
  const pixelValue = (n * viewportHeight) / 100;
  return pixelValue;
}
function vwToPx(n){
  const viewportWidth = window.innerWidth;
  const pixelValue = (n * viewportWidth) / 100;
  return pixelValue;
}
function initialise(){
  let comp = document.getElementById("nav-component");
  comp.innerHTML += "<div class ='nav-outer'><div class ='nav-inner'></div></div>";
}
function addClassToElement(element,className){
  element.classList.add(className);
}
function removeClassFromElement(element,className){
  element.classList.remove(className);
}
function getNavTag(navName){
  let objName = 'nav-node-'+navName;
 return objName; //'<div class="nav-circle '+objName+'"></div>';
}
function getTextTag(navName){
  let objName = 'nav-text-'+navName;
  return objName;
}
function getIconTag(navName){
  let objName = 'nav-icon-'+navName;
  return objName;
}
function getCircleTag(navName){
  let objName = 'nav-circle-'+navName;
  return objName;
}
function getObjectFromNavElement(targetObject){
 let classes = targetObject.classList;
  for(let i=0;i<classes.length;i++)
  {
    if(classes[i].startsWith("nav-node-"))
    {
      let startIndex = classes[i].lastIndexOf("-");
      let objName = classes[i].substring(startIndex+1);
      return getNavFromName(objName);
    }
  }
  return null;
}
function getObjectFromName(navName){
  for(let i =0;i<navNodes.length;i++){
    if(navName == navNodes[i].name){
      return navNodes[i];
    }
  }
  return null;
}

function hideNodeText(navName){
  let textTag = getTextTag(navName);
  $("."+textTag).hide(400);
}
function showNodeText(navName){
  let textTag = getTextTag(navName);
  $("."+textTag).show();
}
function setInAnimation(navName,ani){
  let obj = getObjectFromName(navName);
  obj.isAnimating = ani;
}

function getNumberOfActiveNodes(){
  return nav.children.length;
}
function recentreAll(){
  let compStyle = getComputedStyle(nav);
  let compX = parseFloat(compStyle.getPropertyValue('left'));
  let compY = parseFloat(compStyle.getPropertyValue('top'));
  let obj;
  //Set all on screen navs to the nav components position
  for(let i = 0;i<nav.children.length;i++){
    obj = getObjectFromNavElement(nav.children[i]);
    nav.children[i].style.left = compX + obj.position.x + "px";
    nav.children[i].style.top =compY + obj.position.y + "px";
  }

}
//Closes all nav elements regardless of where in the hierachcy the uses has put it
function closeAllNavs(){
  let rootElement = document.querySelector("."+getNavTag("root"));
  if(rootElement==undefined){
    let navStyles= getComputedStyle(nav);
    let navX = parseFloat(navStyles.getPropertyValue('left'))-45.5;
    let navY = parseFloat(navStyles.getPropertyValue('top'))-25;
    createNavNode("root","http://#",navX,navY,true);
    closeOpenNavs();
    $(".nav-node").promise().done(()=>{
      destroyOpenNavs();
      rootClose();
    });
  }
  else{
    rootClose();
  }
}
//Close all open navs except the root, which must be present
function closeOpenNavs(){
  let obj;
  let rootObj = getObjectFromName("root");
  for(let i = 0;i<nav.children.length;i++){
    obj = getObjectFromNavElement(nav.children[i]);
    if(obj.name != "root"){
      obj.closeSelf(rootObj);
      obj.toggleBackNode(false);
    }
  }
}
//Destroy all open navs except the root, which must be present
function destroyOpenNavs(){
  let obj;
  let rootObj = getObjectFromName("root");
  for(let i = nav.children.length-1;i>0;i--){
    obj = getObjectFromNavElement(nav.children[i]);
    if(obj.name != "root"){
      obj.destroySelf(rootObj);
      
    }
  }
}
function destroyNavNode(navElement){
  
  navElement.remove();
}
function getOppositeSideOfCentreRelative(navElement,obj){
  let theNavStyles = getComputedStyle(nav);
  let theNavX = parseFloat(theNavStyles.getPropertyValue('left')) - main_nav_position_offset;
  let theNavY = parseFloat(theNavStyles.getPropertyValue('top'));
  let theElementStyles = getComputedStyle(navElement);
  let theElementX = obj.position.x;//parseFloat(theElementStyles.getPropertyValue('left'));
  let theElementY = obj.position.y;//parseFloat(theElementStyles.getPropertyValue('top'));

  let diffX = theElementX ;//theElementX - theNavX;
  let diffY = theElementY;//theElementY - theNavY;
  return {x:-diffX,y:-diffY};//{x:-diffX,y:-diffY};
}
function getDockedRootPosition(){
 
  return {x: window.innerWidth > 992 ?root_start_margin:root_start_margin_small,y:vhToPx(50)};
}
//Object definitions
class navNode{
  constructor(name,link,subNodes,parent){
    this.name=name;
    this.link=link;
    this.parentPosition=0;//The opposite position occupied on the nodes parent list (uses the number of parents child node and the position of this node on the list to calculate)
    this.subNodes=subNodes;
    this.isBackNode = false;
    this.opened = false;//temporary
    this.parent=parent;
    this.originDiffX=nodeDistFromCentre;//70;//default number (should only be used on root)
    this.originDiffY=0;
    this.isAnimating = false;
    this.position ={x:0,y:0};//To prevent drift (relative to Nav Component)
  }
  getSubNodesAndSelf(){
    let res = [...this.subNodes];
    res.unshift(this.name);
    return res;
  }

  openNode(useDefaultOffset = false,childNodeObj =null){
let childNodeName = "";
    if(childNodeObj != null){
      let childStyles = getComputedStyle(document.querySelector("."+getNavTag(childNodeObj.name)));
      let childX = parseFloat(childStyles.getPropertyValue('left'));
      let childY = parseFloat(childStyles.getPropertyValue('top'));
      childNodeName = childNodeObj.name;
      createNavNode(this.name,this.link,childX,childY,this.subNodes.length != 0);
    }

    let openedNodes = this.getSubNodesAndSelf();
    let theNodeStyle = getComputedStyle(document.querySelector("."+getNavTag(this.name)));
    if(childNodeObj != null){
      theNodeStyle = getComputedStyle(document.querySelector("."+getNavTag(childNodeName)));
    }
    let theNodeX = parseFloat(theNodeStyle.getPropertyValue('left'));
    let theNodeY = parseFloat(theNodeStyle.getPropertyValue('top'));
    let theNodeWidth = parseFloat(theNodeStyle.getPropertyValue('width'));
    let theNodeHeight = parseFloat(theNodeStyle.getPropertyValue('height'));
    let theCircleStyle = getComputedStyle(document.querySelector("."+getCircleTag(this.name)));
    let theCircleX = parseFloat(theCircleStyle.getPropertyValue('width'));
    let theCircleY = parseFloat(theCircleStyle.getPropertyValue('height'));
    theCircleX /=2;
    theCircleY /=2;
    let theNodeIcon = document.querySelector("."+getIconTag(this.name));
    let theNodeText = document.querySelector("."+getTextTag(this.name));
    let theNavStyles = getComputedStyle(nav);
    let theNavX = parseFloat(theNavStyles.getPropertyValue('left')) - main_nav_position_offset;
    let theNavY = parseFloat(theNavStyles.getPropertyValue('top')) ;
    let navOffset;// = getOppositeSideOfCentreRelative(document.querySelector("."+getNavTag(this.name)));
    if(useDefaultOffset){
      navOffset = {x:-75,y:0};
    }
    else{
      navOffset = this.getOppositeSideOfCentre();//getOppositeSideOfCentreRelative(document.querySelector("."+getNavTag(this.name)),this);
    }
    let rotArray = [];
    //Calculate the local positions around the centre point
    for(let i =0;i<openedNodes.length;i++){
 
      let currentSub = getObjectFromName(openedNodes[i]);
      if(i!=0 && openedNodes[i] != childNodeName){
        createNavNode(openedNodes[i],currentSub.link,theNodeX,theNodeY,currentSub.subNodes.length != 0);
      }

            let currentStyle = getComputedStyle(document.querySelector("."+getNavTag(openedNodes[i])));
     let currentWidth = parseFloat(currentStyle.getPropertyValue('width'));
    // navOffset.x -= currentWidth;
    let moddedOffsetX = navOffset.x - (currentWidth/2);
    let moddedOffsetY = navOffset.y - 25;
    let rot = applyRotationLocal(theNavY,theNavY,moddedOffsetX,moddedOffsetY,(6.28318/openedNodes.length)*i);//applyRotationLocal(theNavY,theNavY,navOffset.x,navOffset.y,(6.28318/openedNodes.length)*i);
    //Correct for width and height of node
    rot.x 
    rotArray.push(rot);
    }
    //Perform the animation
    for(let i=0;i<rotArray.length;i++){
      let currentTag = "."+ getNavTag(openedNodes[i]);
      let currentStyle = getComputedStyle(document.querySelector(currentTag));
      let currentX = parseFloat(currentStyle.getPropertyValue('left'));
      let currentY = parseFloat(currentStyle.getPropertyValue('top'));
      let currentWidth = parseFloat(currentStyle.getPropertyValue('width'));
      let currentHeight = parseFloat(currentStyle.getPropertyValue('height'));
      if(i==0 && useDefaultOffset){
        currentX = theNavX;
        currentY= theNavY;
      }
      let currentObj= getObjectFromName(openedNodes[i]);
      //Store to prevent drift
      currentObj.position.x = rotArray[i].x;
      currentObj.position.y = rotArray[i].y;
      $(currentTag).css("z-index","2");//Reduce z-index for movement
      $(currentTag).css("pointer-events","none");
      //perform animation
      $(currentTag).animate({left:rotArray[i].x + theNavX + "px", top: rotArray[i].y + theNavY + "px"},animation_speed);
      $(currentTag).queue(()=>{
        $(currentTag).css("z-index","3");//Reduce z-index for movement
        $(currentTag).css("pointer-events","initial");
        $(currentTag).dequeue();
      });
    }
    $("."+getNavTag(this.name)).promise().done(()=>{

        if(this.name != "root"){
          this.toggleBackNode(!this.isBackNode);
        }       

    });

  }
//   openNavNode(offOriginX,offOriginY,alt_name = ""){
//   //  alert("pressed");
//   let activeName;
// if(alt_name == ""){
//   activeName =  this.name;
// }
// else{
//   activeName =  alt_name;
// }
//    let navOrigin = document.querySelector("." + getNavTag(activeName));
//    let navOriginStyle = getComputedStyle(navOrigin);
//    let rotArray = [];
//    //let orX;
//    //let orY;

//    let orX = navOriginStyle.getPropertyValue('left');
//    let orY = navOriginStyle.getPropertyValue('top');



  
// let localDiffX = this.originDiffX;
// let localDiffY = this.originDiffY;
//   let subNodesList = this.subNodes;//local subnodes list so that permenent data relating to the object isn't modified
//   if(alt_name!=""){
//     let tempList = [];
//     for(let i =0;i<subNodesList.length;i++){
//       if(alt_name != subNodesList[i]){
//         tempList.push(subNodesList[i]);
//       }
//     }
//     subNodesList = tempList;
//     subNodesList.unshift(this.name);//Add the current node to the start
//     let alt_obj = getObjectFromName(alt_name);
//     localDiffX = alt_obj.originDiffX;
//     localDiffY = alt_obj.originDiffY;
//   }
//   //Modified offOrigin to
//     let offOriginXmod = offOriginX + (localDiffX);
//     let offOriginYmod = offOriginY + (localDiffY);
//     let actualOriginXmod = offOriginX + (localDiffX * 2);
//     let actualOriginYmod = offOriginY + (localDiffY * 2);
//     for(let i = 0;i<subNodesList.length;i++){

//       let subObj = getObjectFromName(subNodesList[i]);
//         createNavNode(subNodesList[i],subObj.link,orX,orY);
//         //If a node has no children it must be given the alternate styles
//         if(getObjectFromName(subNodesList[i]).subNodes.length == 0){
//          let el = document.querySelector("."+getCircleTag(subNodesList[i])); 
//           el.classList.add("terminal-node");
//         }
//         let modifiedNodeNumber = subNodesList.length + 1;//Size of subnode list plus remain node turned into backnode

//         let rot = applyRotationLocal(offOriginX,offOriginY,localDiffX,localDiffY,(6.28318/modifiedNodeNumber)*(i+1)); //applyRotation3("." + getNavTag(subNodesList[i]),offOriginX,offOriginY,localDiffX,localDiffY,(6.28318/modifiedNodeNumber)*(i+1));//applyRotation2("." + getNavTag(this.subNodes[i]),"." + getNavTag(this.name),(6.28318/this.subNodes.length)*i);
//         rotArray.push(rot);
//   }

// let a =1000;
// let b =1000;
// $("." + getNavTag(activeName)).css("pointer-events","none");
// $("." + getNavTag(activeName)).animate({left:actualOriginXmod,top:actualOriginYmod},animation_speed);
// $("." + getNavTag(activeName)).queue(()=>{
//   $("." + getNavTag(activeName)).css("pointer-events","initial");
//   $("." + getNavTag(activeName)).dequeue();
// });
//   for(let i =0;i<rotArray.length;i++){
//       let sub = "."+getNavTag(subNodesList[i]);
//       //set Origin Diff
//       let element = document.querySelector(sub);
      
//       let obj = getObjectFromNavElement(element);
//       let elementIcon = document.querySelector("."+getIconTag(subNodesList[i]));
//       let elementText = document.querySelector("."+getTextTag(subNodesList[i]));
//       if(obj.isBackNode && this.name!="root"){
//         elementIcon.classList.add("nav-icon-back");
//         elementText.textContent = "back";
//       }
      
//       //Apply local coords to originDiffs
//       obj.originDiffX =  rotArray[i].x //-  offOriginX;
//       obj.originDiffY =  rotArray[i].y //- offOriginY ;

//       $(sub).css("z-index","2");//Reduce z-index for movement
//       //perform animation
//       $(sub).css("pointer-events","none");
//       $(sub).animate({left:rotArray[i].x + offOriginXmod, top: rotArray[i].y + offOriginYmod},animation_speed);
//       $(sub).queue(()=>{
        
        
//         $(sub).css("pointer-events","initial");
//         $(sub).css("z-index","3");//Restore z-index once in position
        
//         $(sub).dequeue();
//       });
//       // $(sub).animate({left:rotArray[i].x, top: rotArray[i].y},2000);
//       // $(sub).queue(()=>{
//       //   $(sub).css("pointer-events","initial");
//       //   $(sub).css("z-index","3");//Restore z-index once in position
        
//       //   $(sub).dequeue();
//       // });

//   }
//   let elIcon = document.querySelector("."+getIconTag(this.name));
//   let elText = document.querySelector("."+getTextTag(this.name));
//     if(this.isBackNode && this.name!="root"){
//       elIcon.classList.add("nav-icon-back");
//       elText.textContent = "back";
//     } 
//   }
  //Find all child nodes on the html (minus one optionally) and bring them to the navs location before destroying them.
  //Used when a child node is selected (resulting the current node becoming a 'back' node) and when a back node is selected resulting in no additional back nodes
  closeNode(preservedNodeObj=null){
    let preservedNodeStyles;
    let preservedX;
    let preservedY;
    let preservedWidth;
    let preservedName;
    if(preservedNodeObj == null){
      preservedName =this.name;
      preservedNodeStyles = getComputedStyle(document.querySelector("."+getNavTag(this.name)));
      
      
    }
    else{
      preservedName =preservedNodeObj.name;
      preservedNodeStyles = getComputedStyle(document.querySelector("."+getNavTag(preservedNodeObj.name)));
    }
    preservedX = parseFloat(preservedNodeStyles.getPropertyValue('left'));
    preservedY = parseFloat(preservedNodeStyles.getPropertyValue('top'));
    preservedWidth = parseFloat(preservedNodeStyles.getPropertyValue('width'))/4;

    for(let i=0;i<this.subNodes.length;i++){
      if(this.subNodes[i] != preservedName){


                let currentTag = "."+getNavTag(this.subNodes[i]);


                hideNodeText(this.subNodes[i]);
                $(currentTag).css("z-index","2");//Set lower value for closing
                $(currentTag).css("pointer-events","none");
              
                $(currentTag).animate({left:preservedX + preservedWidth + "px", top:preservedY + "px"},animation_speed);
                $(currentTag).queue(()=>{
                //  $(currentTag).remove();
              
                $(currentTag).css("pointer-events","initial");
                  $(currentTag).dequeue();
                  
                });


           let a=0;

           
    }

    }
    if(this.name != "root"){
      this.toggleBackNode(!this.isBackNode);
     }
  }
  destroySubnodes(preservedNodeObj = null){
    let preservedName = "";
    if(preservedNodeObj !=null){
      preservedName = preservedNodeObj.name;
    }
    for(let i = 0;i<this.subNodes.length;i++){
      if(this.subNodes[i] != preservedName){


        let currentTag = "."+getNavTag(this.subNodes[i]);
        $(currentTag).remove();
      }
    }
  }
  destroySelf(){
    let currentTag = "."+getNavTag(this.name);
    $(currentTag).remove();
  }
  getOppositeSideOfCentre(){
    return {x:-this.position.x,y:-this.position.y};
  }
  // closeNavNode(preserved = null,posX=-1,posY=-1){
  //   for(let i = 0;i<this.subNodes.length;i++){
  //     let sub = document.querySelector("."+getNavTag(this.subNodes[i]));
  //     let subClassTag ="."+getNavTag(this.subNodes[i]);
  //     let preservedName;
  //     if(preserved == null){
  //       preservedName = "";
  //     }
  //     else{
  //       preservedName =preserved.name;
  //     }
  //     if(sub!=null){
  //       if(this.subNodes[i]!=preservedName){

      
  //         let origin = document.querySelector("." + getNavTag(this.name));
  //         let orStyle = getComputedStyle(origin);
  //         let closeX;
  //         let closeY;
  //         if(posX==-1 || posY==-1){
  //           closeX = orStyle.getPropertyValue('left');
  //           closeY = orStyle.getPropertyValue('top');
  //         }
  //         else{
  //           closeX = posX;
  //           closeY = posY;
  //         }
  //         //this.isAnimating = true;
  //         hideNodeText(this.subNodes[i]);
  //         moveNav(sub,closeX,closeY,this);

  //       }

  //     }
  //   }
  //   if(!this.isBackNode && this.name != "root"){
  //     let iconElement = document.querySelector("." + getIconTag(this.name));
  //     let textElement =document.querySelector("." + getTextTag(this.name));
  //     textElement.textContent = this.name;
  //     iconElement.classList.remove("nav-icon-back");
  //   }
  // }
  closeSelf(theNodeObj){
    let theNodeTag = "."+getNavTag(this.name);
    let currentTag = "."+getNavTag(theNodeObj.name);
    let currentStyle = getComputedStyle(document.querySelector(currentTag));
    let currentX = parseFloat(currentStyle.getPropertyValue('left'));
    let currentY = parseFloat(currentStyle.getPropertyValue('top'));
    let theNodeStyle = getComputedStyle(document.querySelector("."+getNavTag(theNodeObj.name)));
    let theNodeWidth = parseFloat(theNodeStyle.getPropertyValue('width'))/4;
    hideNodeText(this.name);
    $(theNodeTag).css("z-index","2");//Set lower value for closing
    $(theNodeTag).css("pointer-events","none");
    $(theNodeTag).animate({left:currentX + theNodeWidth  +"px", top:currentY  + "px"},animation_speed);//.remove().css("pointer-events","initial");
   // $(theNodeTag).animate({left:currentX+"px", top:currentY+"px"},animation_speed);
    $(theNodeTag).queue(()=>{
    //  $(theNodeTag).remove();
  
    $(theNodeTag).css("pointer-events","initial");
      $(theNodeTag).dequeue();
      
    });
  }
  toggleBackNode(back){
    let elementIcon = document.querySelector("."+getIconTag(this.name));
    let elementText = document.querySelector("."+getTextTag(this.name));
    this.isBackNode = back;
    if(back){
      
      if(!elementIcon.classList.contains("nav-icon-back")){
        elementIcon.classList.add("nav-icon-back");
        
      }
      elementText.textContent = "back";
    }
    else{
      elementIcon.classList.remove("nav-icon-back");
      elementText.textContent = this.name;
    }
  }
  
moveSelf(posX,posY){
  let elementTag = "." + getNavTag(this.name);
  $(elementTag).animate({left:posX + "px", top: posY + "px"},animation_speed);
}
  setInAnimation(ani){
    this.isAnimating = ani;
  }
  //Open this specific nav node
  // openNavNode(event) {
  //   if(event.target.classList.contains == "nav-circle" )//if one of the many classes a single div can have is nav-circle
  //   {
  //     alert("pressed");
  //   }
    

  // }

}


function createNavNode(navName,theLink, posX=0,posY=0,hasSubs=true){
  //let objName = 'nav-circle-'+navNodeObj;
  let elementTag =getNavTag(navName);
  let textTag = getTextTag(navName);
  let iconTag = getIconTag(navName);
  let circleTag = getCircleTag(navName);
  let terminalTag = hasSubs?"":"terminal-node";
  if(navName == "root"){
    navName = "open/close";
  }
  //let obj = getObjectFromName(navName);
  nav.innerHTML += '<div class="nav-node  '+elementTag+'  " href="'+theLink +'"><div class="nav-circle '+ circleTag +'  '+ terminalTag +'"  ><div class = "nav-icon ' + iconTag + '"></div></div><div class="nav-text '+ textTag +' ">'+ navName +'</div></div>';//'<div class="nav-circle '+elementTag+' " ><div>'+ navName +'</div></div>';//Create the object in html
  let element = document.querySelector("."+elementTag);

  element.style.top = posY +"px";
  element.style.left = posX + "px";
}
function adjustPosition(navName,posX=0,posY=0){
  let objName =getNavTag(navNodeObj);
  let obj = document.querySelector("."+objName);
  obj.style.top = posX + "px";
  obj.style.left = posY + "px";
}
//Object declarations
const navNodes = [
  new navNode("root","http://#",["home","about","code","portfolio","scs","contact"],""),
  new navNode("home","index.php",[],"root"),
  new navNode("about","About-Me.php",[],"root"),
  new navNode("portfolio","My-Portfolio.php",[],"root"),
  new navNode("code","http://#",["example","demo"],"root"),
  new navNode("scs","SCS-Scheme.php",[],"root"),
  new navNode("contact","index.php#contact",[],"root"),
  //code children
  new navNode("example","Coding-Examples.php",[],"code"),
  new navNode("demo","http://#",["demoA","demoB"],"code"),
  new navNode("demoA","Coding-Examples.php",[],"demo"),
  new navNode("demoB","Coding-Examples.php",[],"demo")
];
function getNavFromName(navName){
  for(let i=0;i<navNodes.length;i++){
    if(navNodes[i].name==navName){
      return navNodes[i];
    }
  }
  return null;
}
// const navNode_root = new navNode("root","http://#",["home","about","code"]);
// const navNode_home = new navNode("home","http://#",[]);
// const navNode_about = new navNode("about","http://#",[]);
// const navNode_code = new navNode("code","http://#",["example","demo"]);
// const navNode_example = new navNode("example","http://#",[]);
// const navNode_demo = new navNode("demo","http://#",[]);

//navNode_root.openNavNode();
// let testb = document.getElementById("test-button");
// testb.addEventListener("click",(e)=>{
//   recentreAll();
// })

//Initial opening behaviour for the root node
function rootOpen(){
  let background = document.querySelector(".nav-outer");
  background.classList.add("nav-outer-visible");
  let rootObj = getObjectFromName("root");
  rootObj.openNode(true);
}
function rootClose(){
  let background = document.querySelector(".nav-outer");
  background.classList.remove("nav-outer-visible");
  let rootObj = getObjectFromName("root");
  rootObj.closeNode();
  $(".nav-node").promise().done(()=>{
    rootObj.destroySubnodes();
    let rootPos = getDockedRootPosition();
    rootObj.moveSelf(rootPos.x,rootPos.y);
 });
  //  theNodeObj.closeNode();
  //  $(".nav-node").promise().done(()=>{
  //   theNodeObj.destroySubnodes();
  //   theNodeObj.moveSelf(root_start_position.x,root_start_position.y);
  // });
}
function branchNodeOpen(theNodeObj){
  let parNodeObj = getObjectFromName( theNodeObj.parent);
  if(theNodeObj.isBackNode){
    theNodeObj.closeNode();
    $(".nav-node").promise().done(()=>{
    if(parNodeObj!=null){
      theNodeObj.destroySubnodes();
      //Parent node won't exist as an element so create it
     
      parNodeObj.openNode(true,theNodeObj);
    }
  });
  }
  else{
    //Close all theNodeObj's parent node's subnodes (except theNodeObj) as well as the parent node itself, and move them to the position of theNodeObj
  //$(".nav-node-code").queue({});

    //var def = $.Deferred();
    if(parNodeObj!=null){
      parNodeObj.closeNode(theNodeObj);
      parNodeObj.closeSelf(theNodeObj);


    }
    //Open theNodeObj's subnodes having them emerge from theNodeObj's position and settling them around the centre point
    $(".nav-node").promise().done(()=>{
      if(parNodeObj!=null){
      parNodeObj.destroySubnodes(theNodeObj);
     parNodeObj.destroySelf();
      }
      theNodeObj.openNode();
    });
  

  }
}

window.addEventListener('resize',()=>{
  if(getNumberOfActiveNodes() != 1)
{
  recentreAll();
}
else{
  let rootPos = getDockedRootPosition();
  let rootElement = document.querySelector("."+getNavTag("root"));
  rootElement.style.left = rootPos.x + "px";
  rootElement.style.top = rootPos.y + "px";
}
});
nav.addEventListener("click",(e)=>{
  if(e.target.parentNode.classList.contains("nav-node")){
    let theNodeObj =  getObjectFromNavElement(e.target.parentNode);
    if(theNodeObj.name =="root" && getNumberOfActiveNodes() == 1){
      rootOpen();
    }
    else if(theNodeObj.name =="root"){
      rootClose();
    }
    //Branch Node Behaviour
    else if(theNodeObj.subNodes.length!=0){
      branchNodeOpen(theNodeObj);
    }
    else{
      window.location.href = e.target.parentNode.getAttribute("href");
    }
  }

});

let outer_nav = document.querySelector(".nav-outer");
outer_nav.addEventListener('click',(e)=>{

if(e.target.classList.contains("nav-outer")){
  closeAllNavs();
}
});
let startPos = getDockedRootPosition();
createNavNode("root","#",startPos.x ,startPos.y);


const circleDiv = '<div class="nav-node"></div>';
// function createCircle(){
// document.getElementById("nav-component").innerHTML += circleDiv;
// }
function applyRotationLocal(originX,originY,orDiffX,orDiffY, angle){
  let orX = originX; 
  let orY = originY; 
  let tarY = orY + orDiffY;// orY ;//orDiffY;//orY + 70;
  let tarX = orX + orDiffX;// orX + 70;//orDiffX;//orX;
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
function applyRotation3(targetName,originX,originY,orDiffX,orDiffY, angle){


  let orX = originX; 
  let orY = originY; 
  let tarY = orY + orDiffY;// orY ;//orDiffY;//orY + 70;
  let tarX = orX + orDiffX;// orX + 70;//orDiffX;//orX;
  //Place coords in terms of origin
  let translateX = tarX - orX;
  let translateY = tarY - orY;

  let cosTheta = Math.cos(angle);
  let sinTheta = Math.sin(angle);
  let rotatedX = translateX * cosTheta - translateY * sinTheta;
  let rotatedY = translateX * sinTheta + translateY * cosTheta;
  //Place coords back into global coords
  //And place result in target


  return {
    x:rotatedX + orX,
    y:rotatedY + orY
  }
  // let debugStyle = getComputedStyle(targetItem);
  // let debugX = debugStyle.getPropertyValue('left');
  // let debugY= debugStyle.getPropertyValue('top');
 //$(targetItem).animate({left:rotatedX + orX, top: rotatedY + orY},2000);
  // $(targetItem).queue(()=>{
  //   //$(targetItem).remove();
  //   //$(targetItem).dequeue();
  // });

}
// function applyRotation2(targetName,originName, angle){

//   let originItem = document.querySelector(originName);
//   let targetItem = document.querySelector(targetName);
//   let style= getComputedStyle(originItem);
//   let posY = style.getPropertyValue('top');
//   let posX = style.getPropertyValue('left');

//   let orX =   parseInt( style.getPropertyValue('left'));// + (parseInt(style.getPropertyValue('width'))/2);
//   let orY = parseInt( style.getPropertyValue('top'));// + (parseInt(style.getPropertyValue('height'))/2);
//   let tarY = orY + 70;
//   let tarX = orX;
//   //Place coords in terms of origin
//   let translateX = tarX - orX;
//   let translateY = tarY - orY;

//   let cosTheta = Math.cos(angle);
//   let sinTheta = Math.sin(angle);
//   let rotatedX = translateX * cosTheta - translateY * sinTheta;
//   let rotatedY = translateX * sinTheta + translateY * cosTheta;
//   //Place coords back into global coords


//   return {
//     x:rotatedX + orX,
//     y:rotatedY + orY
//   }


// }
// function applyRotation(targetItem,originItem, angle){

//     let style= getComputedStyle(originItem);
//     let posY = style.getPropertyValue('top');
//     let posX = style.getPropertyValue('left');
//    // let test = parseInt( style.getPropertyValue('left')) ;
//    // let test2 =parseInt(style.getPropertyValue('width'))/2;
//     let orX =   parseInt( style.getPropertyValue('left'));// + (parseInt(style.getPropertyValue('width'))/2);
//     let orY = parseInt( style.getPropertyValue('top'));// + (parseInt(style.getPropertyValue('height'))/2);
//     let tarY = orY + 70;
//     let tarX = orX;
//     //Place coords in terms of origin
//     let translateX = tarX - orX;
//     let translateY = tarY - orY;

//     let cosTheta = Math.cos(angle);
//     let sinTheta = Math.sin(angle);
//     let rotatedX = translateX * cosTheta - translateY * sinTheta;
//     let rotatedY = translateX * sinTheta + translateY * cosTheta;
//     //Place coords back into global coords
//     //And place result in target
//     targetItem.style.left = rotatedX + orX;
//     targetItem.style.top = rotatedY + orY;


// }


