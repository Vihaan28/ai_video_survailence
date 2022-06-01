video="";
objects=[];
status = "";
vol_value=0;
speed_value=0;

function setup(){
    canvas = createCanvas( 480 , 380);
    canvas.center();
    video.hide();    
}

function start(){
    objectdetector = ml5.objectDetector("cocossd" , modalLoaded);
    document.getElementById("status").innerHTML = " status : detecting objects";
   }
   
function draw(){
    image(video ,0 ,0 , 480 , 380);

    if(status != ""){
        objectdetector.detect( video , gotresults );
        for(var  i = 0 ; i <= objects.length ; i++){

            document.getElementById("status").innerHTML = " Status = Objects detected ";
            document.getElementById("nob").innerHTML = "number of objects detected are " + objects.length;

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text( objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("red");
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height );
        }

    }
}

function gotresults( error , results){

    if(error){
        console.error(error);
    }
     console.log(results);
     objects=results;

}

function preload(){
    video = createVideo("video.mp4");

}


function modalLoaded(){
    console.log(" Modal Loaded ");
    status = true;
    video.loop();
}

function slider_vol(){
    vol_value = document.getElementById("vol_slider_id").value;
    video.volume(vol_value);
}

function slider_speed(){
    speed_value = document.getElementById("speed_slider_id").value;
    video.speed(speed_value);
}