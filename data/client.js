$(document).ready(function () {
    var zindex = 10;

    $("div.card").click(function (e) {
        e.preventDefault();

        var isShowing = false;

        if ($(this).hasClass("show")) {
            isShowing = true
        }

        if ($("div.cards").hasClass("showing")) {
            // a card is already in view
            $("div.card.show")
                .removeClass("show");

            if (isShowing) {
                // this card was showing - reset the grid
                $("div.cards")
                    .removeClass("showing");
            } else {
                // this card isn't showing - get in with it
                $(this)
                    .css({
                        zIndex: zindex
                    })
                    .addClass("show");

            }

            zindex++;

        } else {
            // no cards in view
            $("div.cards")
                .addClass("showing");
            $(this)
                .css({
                    zIndex: zindex
                })
                .addClass("show");

            zindex++;
        }

    });

    ajaxGetDatas();
    

    
});
$(document).on("click",".card__image-holder", function() {
    vd = document.getElementsByTagName('video');
    for (let index = 0; index < vd.length; index++) {
        const element = vd[index];
        //element.pause(); 
        if (element.currentTime > 0 ) {
            element.currentTime = 0; 
            element.load();      
        }
    }
   
    video = $(this).data('video');
    video = document.getElementById(video);
    video.play();
    video.addEventListener('ended',function() {
       // video.load();
    })
});
function ajaxGetDatas(){
    $.ajax({
        type: "GET",
        url: "/alls",
        
        
        success: function (response) {
            if (response) {
                appendCards(response);
            }
        }
    });
}
function appendCards(data){
    console.log(data)
    if (data.length) {
        data.forEach(element => {
            html = `<div class="card">
                <div class="card__image-holder" data-video="${element['video']}">
                    <video  id="${element['video']}" width="470" height="255" poster="/thumbnails/${element['thumbnail']}" playsinline style="pointer-events: none;" class="card__image">
                        <source src="/videos/${element['video']}" type="video/mp4">
                        
                    </video>
                    
                </div>
                <div class="card-title">                    
                    <h2>
                        ${element['title']}
                        <small></small>
                    </h2>
                </div>           
            </div>`;

            $('#card-container').append(html);
        });
    }
}