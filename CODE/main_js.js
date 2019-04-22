    var onAboutPage = false;
    function toggleAboutPage(){
        if(onAboutPage == false){
            $(".navPage").removeClass('opacity1');
            aboutButScramble();
            setTimeout(function(){
                    $(".aboutPage").addClass("opacity1");
                    $('.aboutPage').css('transform', 'scale(1)');
                     $('.navPage').prop('hidden', true);
                    onAboutPage = true;
            }, 500);
        }
        else{
            aboutButScramble();
            $(".aboutPage").removeClass('opacity1');
            $('.aboutPage').css('transform', 'scale(.97)');
            $('.navPage').prop('hidden', false);
            setTimeout(function(){
                    $(".navPage").addClass("opacity1");
//                    $('.navPage').prop('hidden', true);
                    onAboutPage = false;
            }, 500);
        }
        
    }
    var allbuttons = $(document).find(".button");
    var allVids = $(document).find(".video");
    var allCaptions = $(document).find(".captionText");
    var allImgs = $(document).find(".img");
    var onMobile = false;
    function changeToMobile(x) {
        if (x.matches) { // on mobile
            onMobile = true;
            $('.redLine').prop('hidden', true);
            $(".sideNav").prop('hidden', true);
            $('.sideNavBarWrap').prop('hidden', true);
            $('.arrowWrap').prop('hidden', true);
            $('.selectedStoryWrap').prop('hidden', true);
            $(".SR05_buttonGroup").prop('hidden', true);
            $(".WL04_buttonLabel").prop('hidden', true);
//            $('.audioButContainer').prop('hidden', true);
            $('.transcriptWrap').prop('hidden', true);
            $('.mobileDotsWrap').prop('hidden', false);
            for (var i = 0; i < allVids.length; i++) {
                $(allVids[i]).prop('hidden', true); //mute
            }
            for (var i = 0; i < allCaptions.length; i++) {
                $(allCaptions[i]).prop('hidden', true); //mute
            }
            for (var i = 0; i < allImgs.length; i++) {
                $(allImgs[i]).prop('hidden', true); //mute
            }
            for (var i = 0; i < allbuttons.length; i++) {
                $(allbuttons[i]).prop('hidden', true); //mute
            }
        } else { //not on mobile
            onMobile = false;
            $('.redLine').prop('hidden', false);
            $(".sideNav").prop('hidden', false);
            $(".SR05_buttonGroup").prop('hidden', false);
            $('.sideNavBarWrap').prop('hidden', false);
            $('.selectedStoryWrap').prop('hidden', false);
            $('.arrowWrap').prop('hidden', false);
            $(".WL04_buttonLabel").prop('hidden', false);
//            $('.audioButContainer').prop('hidden', false);
            $('.transcriptWrap').prop('hidden', false);
            $('.mobileDotsWrap').prop('hidden', true);
            for (var i = 0; i < allVids.length; i++) {
                if($(allVids[i]).hasClass("WL_Vid")){
                }
                else{
                    $(allVids[i]).prop('hidden', false); //mute
                }
            }
            for (var i = 0; i < allCaptions.length; i++) {
                $(allCaptions[i]).prop('hidden', false); //mute
            }
            for (var i = 0; i < allImgs.length; i++) {
                $(allImgs[i]).prop('hidden', false); //mute
            }
            for (var i = 0; i < allbuttons.length; i++) {
                $(allbuttons[i]).prop('hidden', false); //mute
            }
        }
    }
    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        
    }

    var x = window.matchMedia("(max-width: 480px)")
    changeToMobile(x) // Call listener function at run time
    x.addListener(changeToMobile) // Attach listener function on state changes

    var navClicked = false;
    var pageNumber = -1;
    var pageClassList;
    var storyName = "";

    //keep track of what pages in story have been visited
    var visitedPages = [];
    var numPages = 6;
    while (numPages--) visitedPages.push(false);

    function resetVisitedPagesArray() {
        for(var i = 0;  i < visitedPages.length; i++){
            visitedPages[i] = false;
        }
    }
    
    var allNavMenuItems = $(document).find('.navMenu');
    function navPageIntro(){
        var nav1Items = $(document).find('.nav1');
        var nav2Items = $(document).find('.nav2');
        var nav3Items = $(document).find('.nav3');
        $(navNumber).removeClass('fadeOutAndScale');
        $('.navPage').removeClass("fadeInAndScale");
        $('.navPage').css("visibility", 'visible');
        for(var i = 0; i < allNavMenuItems.length; i++){
            $(allNavMenuItems[i]).removeClass('fadeOutAndScaleUp');
        }
        $('.navPage').css("transform", 'scale(1)');
        $('.navPage').addClass("opacity1");
        clearBackground();
//        for(var i = 0; i < nav1Items.length; i++){
//            $(nav1Items[i]).css('transform', 'scale(1)');
//            $(nav1Items[i]).addClass('opacity1');
//        }
//        setTimeout(function(){
//            for(var i = 0; i < nav2Items.length; i++){
//                $(nav2Items[i]).css('transform', 'scale(1)');
//                $(nav2Items[i]).addClass('opacity1'); 
//            }
//        }, 400);
//        setTimeout(function(){
//            for(var i = 0; i < nav3Items.length; i++){
//                $(nav3Items[i]).css('transform', 'scale(1)');
//                $(nav3Items[i]).addClass('opacity1'); 
//            }
//        }, 800);
//        navMenuItems
    }

    function resetNavBar(){
        for(var i = 0; i < sideNavBarList.length; i++){
            if(i == 0){
                $(sideNavBarList[i]).addClass('active');
            }
            else{
                $(sideNavBarList[i]).removeClass('active');
            }
        }
    }

    function changeStoryName(storyNum){
        var newStoryName = '';
        var newStoryNum = '';
        if(storyNum == 1){
            newStoryName = "SILK ROAD";
            newStoryNum = "01";
        }
        else if(storyNum == 2){
            newStoryName = "WIKILEAKS";
            newStoryNum = "02";
        }
        else{
            newStoryName = "ANONYMOUS";
            newStoryNum = "03";
        }
        $(".selectedStory").html(newStoryName);
        $(".selectedStoryNum").html(newStoryNum);
    }

    var navNumber = "";
    function startStory(storyName) {
        resetNavBar();
        resetVisitedPagesArray();
        revealUIElements();
        var story = $(storyName).attr('class');
        if (story == "anonNavMenu" || $(storyName).hasClass('nav3')) {
            changeStoryName(3);
            $(".bgImage").removeAttr("hidden");
            $('.nav1').addClass("fadeOut");
            $('.nav2').addClass("fadeOut");
            navNumber = ".nav3";
            pageClassList = ['.anonPage1', '.anonPage2', '.anonPage3', '.anonPage35', '.anonPage4', '.anonPage5'];
            storyName = "anon";
        } else if (story == "wikiLeaksNavMenu" || $(storyName).hasClass('nav2')) {
            changeStoryName(2);
            $('.nav1').addClass("fadeOut");
            $('.nav3').addClass("fadeOut");
            navNumber = ".nav2";
            pageClassList = ['.WL_Page1', '.WL_Page15', '.WL_Page2', '.WL_Page3', '.WL_Page4', '.WL_Page5'];
            storyName = "wl";
        } else {
            changeStoryName(1);
            $('.nav2').addClass("fadeOut");
            $('.nav3').addClass("fadeOut");
            navNumber = ".nav1";
            pageClassList = ['.SR_Page1', '.SR_Page2', '.SR_Page25', '.SR_Page3', '.SR_Page4', '.SR_Page5'];
            storyName = "sr";
        }

        navClicked = true;
        pageNumber = 0;
        //fade out clicked element
        setTimeout(function() {
            $(navNumber).addClass('fadeOutAndScale');
            $('.navPage').css('visibility', 'hidden');
            $('.navPage').removeClass('opacity1');
        }, 700);
        setTimeout(function() {
//             $(pageClassList[pageNumber]).css('visibility', 'visible');
             $(pageClassList[pageNumber]).css('transform', 'scale(1)');
             $(pageClassList[pageNumber]).addClass('opacity1');
//             $('.navPage').prop('hidden', true); //fuck with this
        }, 1100);
    }

    function revealUIElements() {
        setTimeout(function() {
            $(".sideNavBarWrap").addClass("opacity1");
            $(".selectedStoryWrap").addClass("opacity1");
            $('.arrowWrap').addClass("opacity1");
        }, 1200);
    }
    
    var sideNavBarList = $(".sideNavBarWrap").find(".sideNavBar");
    var mobileDotNavList = $(".mobileDotsWrap").find(".mobileDot");

    var currentlyScrolling = false;
    //prev page in story
    function pageUp() {
        console.log(pageNumber);
        if (navClicked == true && pageNumber != 0 && currentlyScrolling == false) {
            currentlyScrolling = true;
            setTimeout(function() {
                currentlyScrolling = false;
                pageNumber--;
            }, 700);
                $(pageClassList[pageNumber]).css('transform', 'scale(1.03)');
                $(pageClassList[pageNumber]).removeClass('opacity1');
            setTimeout(function() {
                $(sideNavBarList[pageNumber]).removeClass('active');
                $(sideNavBarList[pageNumber - 1]).addClass('active');
                $(mobileDotNavList[pageNumber]).removeClass('active');
                $(mobileDotNavList[pageNumber - 1]).addClass('active');
                $(pageClassList[pageNumber - 1]).css('transform', 'scale(1)');
                $(pageClassList[pageNumber - 1]).addClass('opacity1');
            }, 600);
        }
    }
    
    //next page in story
    function pageDown() {
        if (navClicked == true && pageNumber != 5 && currentlyScrolling == false) {
            currentlyScrolling = true;
            setTimeout(function() {
                currentlyScrolling = false;
                pageNumber++;
            }, 700);
            //current page fade out / scale up
            $(pageClassList[pageNumber]).css('transform', 'scale(.95)');
            $(pageClassList[pageNumber]).removeClass('opacity1'); 
            //next page fade in / scale up
            setTimeout(function() {
                $(sideNavBarList[pageNumber]).removeClass('active');
                $(sideNavBarList[pageNumber + 1]).addClass('active');
                $(mobileDotNavList[pageNumber]).removeClass('active');
                $(mobileDotNavList[pageNumber + 1]).addClass('active');
                $(pageClassList[pageNumber + 1]).css('transform', 'scale(1)');
                $(pageClassList[pageNumber + 1]).addClass('opacity1');
            }, 600);
            
            //if page hasnt been visited yet
            if (visitedPages[pageNumber + 1] == false) {

                visitedPages[pageNumber + 1] = true;
                //quote scramble
                if (pageClassList[pageNumber + 1] == ".SR_Page25") {
                    fSR_quote.setText(phrases5[counter]);
                    counter = (counter + 1) % phrases5.length
                } else if (pageClassList[pageNumber + 1] == ".anonPage35") {
                    fAnon_quote.setText(phrases7[counter]);
                    counter = (counter + 1) % phrases7.length
                } else if (pageClassList[pageNumber + 1] == ".WL_Page15") {
                    fWL_quote.setText(phrases6[counter]);
                    counter = (counter + 1) % phrases6.length
                } 

                var pageVids = $(pageClassList[pageNumber + 1]).find('.video');
                for (var i = 0; i < pageVids.length; i++) {
                    pageVids[i].play();
                    if(pageVids[i].id == 'anon_cruise' || pageVids[i].id == 'anon_pay'){
                        $(pageVids[i]).addClass('opacity1');
                    }
                    else{
                        $('#anon_curise').removeClass('opacity1');
                        $('#anon_pay').removeClass('opacity1');
                    }
                }
            }
        }
    }
    
    function pageJump(pageClicked){
        var newPageNum;
        for(var i = 0; i < sideNavBarList.length; i++){
            if(pageClicked.id == sideNavBarList[i].id){
                newPageNum = i;
            }
        }
        //next page
        if(newPageNum != pageNumber){
//            setTimeout(function() {
                $(sideNavBarList[pageNumber]).removeClass('active');
                $(sideNavBarList[newPageNum]).addClass('active');
                $(mobileDotNavList[pageNumber]).removeClass('active');
                $(mobileDotNavList[newPageNum]).addClass('active');
                //scale up if 
                if(newPageNum > pageNumber){
                    $(pageClassList[pageNumber]).css('transform', 'scale(.97)');
                }
                else{
                    $(pageClassList[pageNumber]).css('transform', 'scale(1.03)');
                }
                $(pageClassList[pageNumber]).removeClass('opacity1');
                pageNumber = newPageNum;
//            }, 400);
            setTimeout(function(){
                 //if page hasnt been visited yet
            if (visitedPages[pageNumber] == false) {
                visitedPages[pageNumber] = true;
                //quote scramble
//                console.log(pageClassList[pageNumber + 2]);
                $(pageClassList[newPageNum]).css('transform', 'scale(1)');
                $(pageClassList[newPageNum]).addClass('opacity1');
                if (pageClassList[pageNumber] == ".SR_Page25") {
                    fSR_quote.setText(phrases5[counter]);
                    counter = (counter + 1) % phrases5.length
                } else if (pageClassList[pageNumber] == ".anonPage35") {
                    fAnon_quote.setText(phrases7[counter]);
                    counter = (counter + 1) % phrases7.length
                } else if (pageClassList[pageNumber] == ".WL_Page15") {
                    fWL_quote.setText(phrases6[counter]);
                    counter = (counter + 1) % phrases6.length
                } 

                var pageVids = $(pageClassList[pageNumber]).find('.video');
                for (var i = 0; i < pageVids.length; i++) {
                    console.log(pageVids[i].id);
                    if(pageVids[i].id == 'anon_cruise' || pageVids[i].id == 'anon_pay'){
                        $(pageVids[i]).addClass('opacity1');
                    }
                    else{
                        $('#anon_curise').removeClass('opacity1');
                        $('#anon_pay').removeClass('opacity1');
                    }
                    pageVids[i].play();
                }
            }
            }, 600);
           
//            if (visitedPages[pageNumber + 1] == false) {
//
//                visitedPages[pageNumber + 1] = true;
//                //quote scramble
////                console.log(pageClassList[pageNumber + 2]);
//                if (pageClassList[pageNumber + 1] == ".SR_Page25") {
//                    fSR_quote.setText(phrases5[counter]);
//                    counter = (counter + 1) % phrases5.length
//                } else if (pageClassList[pageNumber + 1] == ".anonPage35") {
//                    fAnon_quote.setText(phrases7[counter]);
//                    counter = (counter + 1) % phrases7.length
//                } else if (pageClassList[pageNumber + 1] == ".WL_Page15") {
//                    fWL_quote.setText(phrases6[counter]);
//                    counter = (counter + 1) % phrases6.length
//                } else if (pageClassList[pageNumber + 1] == ".anonPage4"){
//                    revealAnonVideos(); 
//                }
//
//                var pageVids = $(pageClassList[pageNumber + 1]).find('.video');
//                for (var i = 0; i < pageVids.length; i++) {
//                    pageVids[i].play();
//                    console.log('PLAY ME');
//                }
//            }
        }

    }

    var WL_vids = [".WL_04", ".WL_01", ".WL_02", ".WL_05", ".WL_06", ".WL_03"];
    var vidsRevealed = false;
    
    function revealWLVideos() {
        if (vidsRevealed == false) {
            $(WL_vids[0]).addClass('VideoFadeInAndScale');
            setTimeout(function() {
                $(WL_vids[1]).addClass('VideoFadeInAndScale');
            }, 300);
            setTimeout(function() {
                $(WL_vids[2]).addClass('VideoFadeInAndScale');
            }, 600);
            setTimeout(function() {
                $(WL_vids[3]).addClass('VideoFadeInAndScale');
            }, 1000);
            setTimeout(function() {
                $(WL_vids[4]).addClass('VideoFadeInAndScale');
            }, 1300);
            setTimeout(function() {
                $(WL_vids[5]).addClass('VideoFadeInAndScale');
            }, 1700);
            vidsRevealed = true;
        }
        else{
            console.log('bye bye');
            $(WL_vids[0]).removeClass('VideoFadeInAndScale');
            setTimeout(function() {
                $(WL_vids[1]).removeClass('VideoFadeInAndScale');
            }, 200);
            setTimeout(function() {
                $(WL_vids[2]).removeClass('VideoFadeInAndScale');
            }, 500);
            setTimeout(function() {
                $(WL_vids[3]).removeClass('VideoFadeInAndScale');
            }, 800);
            setTimeout(function() {
                $(WL_vids[4]).removeClass('VideoFadeInAndScale');
            }, 1100);
            setTimeout(function() {
                $(WL_vids[5]).removeClass('VideoFadeInAndScale');
            }, 1400);
            vidsRevealed = false;
        }
    }

    var anon_vids = [".anon_01", ".anon_04", ".anon_05", ".anon_03", ".anon_06", ".anon_02"];
    var anonVidsRevealed = false;
    function toggleAnonVideos(){
        if (anonVidsRevealed){
            hideAnonVideos();
        }
        else{
            revealAnonVideos();
        }
    }
    function revealAnonVideos() {
        console.log('reveal anon');
        $(anon_vids[0]).addClass('VideoFadeInAndScale');
        setTimeout(function() {
            $(anon_vids[1]).addClass('VideoFadeInAndScale');
        }, 400);
        setTimeout(function() {
            $(anon_vids[2]).addClass('VideoFadeInAndScale');
        }, 800);
        setTimeout(function() {
            $(anon_vids[3]).addClass('VideoFadeInAndScale');
        }, 1200);
        setTimeout(function() {
            $(anon_vids[4]).addClass('VideoFadeInAndScale');
        }, 1600);
        setTimeout(function() {
            $(anon_vids[5]).addClass('VideoFadeInAndScale');
        }, 2000);
        anonVidsRevealed = true;
    }
    function hideAnonVideos(){
        $(anon_vids[5]).removeClass('VideoFadeInAndScale');
        setTimeout(function() {
            $(anon_vids[4]).removeClass('VideoFadeInAndScale');
        }, 200);
        setTimeout(function() {
            $(anon_vids[3]).removeClass('VideoFadeInAndScale');
        }, 500);
        setTimeout(function() {
            $(anon_vids[2]).removeClass('VideoFadeInAndScale');
        }, 800);
        setTimeout(function() {
            $(anon_vids[1]).removeClass('VideoFadeInAndScale');
        }, 1100);
        setTimeout(function() {
            $(anon_vids[0]).removeClass('VideoFadeInAndScale');
        }, 1400);
        anonVidsRevealed = false;
    }

    function revealUI(){
        $('.titleWrap').addClass("opacity1");
        $('.aboutBut').addClass("opacity1");
        $(".audioButContainer").addClass('opacity1');
    }

    var scrambling = false;
    //scrolling event listener
    var midScroll = false;
    var lastPoint = null; //global
    $(window).on('touchstart', function(e) {

        var swipe = e.originalEvent.touches,
        start = swipe[0].pageY;

        $(this).on('touchmove', function(e) {

            var contact = e.originalEvent.touches,
            end = contact[0].pageY,
            distance = end-start;
            if (onIntroPage2 == true) {
                onIntroPage2 = false;
                var introPage2 = $('.introPage2');
                $(introPage2).removeClass('fadeInAndScale');
                fadeOutAndReset(introPage2);
                setTimeout(function() {
                    revealUI();
                    navPageIntro();
                    next();
                    scrambling = true;
                    setTimeout(function(){
                        scrambling = false;
                    }, 2000);
                }, 900);
            }
            else if (pageNumber != -1) {
                if (distance < -30) {
                    if (midScroll == false) {
                        pageDown();
                        console.log('scroll down');
                        midScroll = true;
                        //2s limitation bw each scroll
                        setTimeout(function() {
                            midScroll = false;
                        }, 1200);
                    }
                }// up
                if (distance > 30) 
                {
                    if (midScroll == false) {
                        pageUp();
                        console.log('scroll up');
                        midScroll = true;
                        //2s limitation bw each scroll
                        setTimeout(function() {
                            midScroll = false;
                        }, 2000);
                    }
                }// down
            }
        })
        .one('touchend', function() {

            $(this).off('touchmove touchend');
        });
    });
    function leaveIntroPage2(){
        onIntroPage2 = false;
        var introPage2 = $('.introPage2');
        $(introPage2).removeClass('fadeInAndScale');
        fadeOutAndReset(introPage2);
        setTimeout(function() {
            revealUI();
            navPageIntro();
            next();
            scrambling = true;
            $('.introPage2').prop('hidden', 'true');
            setTimeout(function(){
                scrambling = false;
            }, 2000);
        }, 900);
    }
    document.addEventListener("wheel", function(e) {
        if (onIntroPage2 == true) {
            onIntroPage2 = false;
            var introPage2 = $('.introPage2');
            $(introPage2).removeClass('fadeInAndScale');
            fadeOutAndReset(introPage2);
            setTimeout(function() {
                revealUI();
                navPageIntro();
                next();
                scrambling = true;
                $('.introPage2').prop('hidden', 'true');
                setTimeout(function(){
                    scrambling = false;
                }, 2000);
            }, 900);
        } else {
            if (pageNumber != -1) {
                var variation = parseInt(e.deltaY);
                //scroll down - next page in story
                if (variation > 0) {
                    if (midScroll == false) {
                        pageDown();
                        console.log('scroll down');
                        midScroll = true;
                        //2s limitation bw each scroll
                        setTimeout(function() {
                            midScroll = false;
                        }, 1200);
                    }
                }
                //scroll up - prev page in story
                else if (pageNumber != 6) {
                    if (midScroll == false) {
                        pageUp();
                        console.log('scroll up');
                        midScroll = true;
                        //2s limitation bw each scroll
                        setTimeout(function() {
                            midScroll = false;
                        }, 2000);
                    }
                }
            }
        }
    });
    $(".video").hover(
        function() {
            if(audioEnabled == true){
                 $(this).animate({
                    volume: .9
                }, 700);
                $(this).prop('muted', false); //mute
            }
        },
        function() {
            $(this).animate({
                volume: 0
            }, 700);
        }
    );
    var audioEnabled = true;
    function audioButClicked(){
        if (audioEnabled == true){
            //disable audio from all videos 
            console.log('DISABLE AUDIO');
            $('audio,video').each(function(){
                $(this).prop('muted', true);
            });
            zeroAllVidVolume();
//            var audioBars = $('.audioButContainer').find('.audioButBars');
            $('.audioButContainer').children().addClass('smallHeight');
            audioEnabled = false;
        }
        else{
            console.log('ENABLE AUDIO');
            $('audio,video').each(function(){
//               $(this).prop('muted', false);
               $(this).volume = 0;
            });
            $('.audioButContainer').children().removeClass('smallHeight');
            audioEnabled = true;
        }
    }
    function zeroAllVidVolume(){
        $('video').each(function(){
            $(this).prop('muted', true);
            $(this).volume = 0;
        });
    }
    zeroAllVidVolume();
    //    ****
    //    var WL_Vids = $(".WL_Page4").find(".WL_Vid");
    //    for(var i = 0; i < WL_Vids.length; i++){
    //        $(WL_Vids[i]).get(0).play();
    //    }

    //    mute all videos for sanitys sake
//    for (var i = 0; i < allVids.length; i++) {
//        $(allVids[i]).prop('muted', true); //mute
//    }
    function resetButtons(){
        var buttons = $(document).find('.button');
        for(var i = 0; i < buttons.length; i++){
            if($(buttons[i]).hasClass("clicked")){
               $(buttons[i]).trigger( "click" );
               $(buttons[i]).trigger( "mouseout" );
            }
        }
    }
    function resetVidsToHidden(){
        vidsRevealed = false;
    }
    function returnToNav() {
        navClicked = false;
        resetVidsToHidden();
        resetVisitedPagesArray();
        hideAnonVideos();
        $(".uiTitle").removeClass("opacity1");
        $(".sideNavBarWrap").removeClass("opacity1");
        $(".selectedStoryWrap").removeClass("opacity1");
        $('.arrowWrap').removeClass("opacity1");
//        var arrows = $('.arrowWrap').find(".uiArrow");
//        $(arrows[0]).removeClass("opacity1");
//        $(arrows[1]).removeClass("opacity1");
        clearBackground();
        $(pageClassList[pageNumber]).css('transform', 'scale(.97)');
        $(pageClassList[pageNumber]).removeClass('opacity1');
        setTimeout(function(){
             resetPagePositions();
            resetButtons();
        }, 1000);
//        fadeOutAndReset(pageClassList[pageNumber]);
        for(var i = 0; i < allNavMenuItems.length; i++){
            $(allNavMenuItems[i]).removeClass('fadeOut');
        }
        pageNumber = -1;
        setTimeout(function(){
            navPageIntro();
        }, 1000);
    }
    
    function resetPagePositions(){
       var storyPages = $("#main").find('.storyPage');
       $(storyPages).each(function( index ) {
           console.log('hi');
           $(this).css('transform', 'scale(1.03)');
        });
    }
    /*BoDYMOVIN BUTTON ANIMATIONS*/

    var transcriptAnim = bodymovin.loadAnimation({
        container: document.getElementById('transcriptBut'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'JS/transcriptBut.json'
    });
    var viewAnim1 = bodymovin.loadAnimation({
        container: document.getElementById('SR_viewBut1'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'JS/viewBut.json'
    });
    var viewAnim2 = bodymovin.loadAnimation({
        container: document.getElementById('SR_viewBut2'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'JS/viewBut.json'
    });
    var viewAnim3 = bodymovin.loadAnimation({
        container: document.getElementById('SR_viewBut3'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'JS/viewBut.json'
    });
    var WL_playBut = bodymovin.loadAnimation({
        container: document.getElementById('WL04_playButID'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'JS/playBut.json'
    });
    var anon_playBut = bodymovin.loadAnimation({
        container: document.getElementById('anon04_playButID'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'JS/playBut.json'
    });
    function addButHoverAnim(containerID, animName){
        $(containerID).on( "click", function() {
            var paths = $(containerID).find('path');
            if($(containerID).hasClass("clicked") == false){
              $(containerID).addClass("clicked");
                for(var i = 0; i < paths.length; i++){
                    $(paths[i]).addClass('butTransition');
                }
                for(var i = 0; i < paths.length; i++){
                    $(paths[i]).addClass('redBut');
                }
            }
            else{
                $(containerID).removeClass("clicked");
                for(var i = 0; i < paths.length; i++){
                    $(paths[i]).removeClass('redBut');
                }
            }
        });
        $(containerID).hover(
        //hovering
          function() {
              if($(this).hasClass("clicked") == false){
                  animName.setDirection(1);
                  animName.play();
              }
          }, 
         //stopped hovering
         function() {
            if($(this).hasClass("clicked") == false){
                animName.setDirection(-1);
                animName.play();
            }
          }
        );
    }

    addButHoverAnim("#transcriptBut", transcriptAnim);
    addButHoverAnim("#SR_viewBut1", viewAnim1);
    addButHoverAnim("#SR_viewBut2", viewAnim2);
    addButHoverAnim("#SR_viewBut3", viewAnim3);
    addButHoverAnim("#anon04_playButID", anon_playBut);
    addButHoverAnim("#WL04_playButID", WL_playBut);


    // ——————————————————————————————————————————————————
    // Video Code
    // ——————————————————————————————————————————————————

    $(".playBut").click(function() {
        if ($(this).hasClass('playBut')) {
            revealVid($(this).attr("id"));
        } else if ($(this).hasClass('textBut')) {

        } else if ($(this).hasClass('otherBut')) {

        }
    });

    var timePassed = true;
    var transcriptVisible = false;

    function toggleTranscript() {
        if (transcriptVisible == true && timePassed == true) {
            hideTranscript();
            timePassed = false;
        } else {
            revealTranscript();
            timePassed = false;
        }
    }

    function revealTranscript() {
//        $(".transcriptText").css("opacity", "1");
        $(".transcriptText").addClass('typewriter');
        $('.WL03_buttonLabel').css('top', '23px');
//        $(".transcriptText").css('animation', 'type2 2s steps(400, end)');
        setTimeout(function() {
            $(".WL_collatCap").css("opacity", "1");
            transcriptVisible = true;
            timePassed = true;
        }, 1900);
    }

    function hideTranscript() {
        $(".transcriptText").css("opacity", "0");
        $(".WL_collatCap").css("opacity", "0");
        transcriptVisible = false;
        timePassed = true;
    }

    var SR05_viewBut1Clicked = false;
    var SR05_viewBut2Clicked = false;
    var SR05_viewBut3Clicked = false;
    var SR05_captions = document.getElementsByClassName('SR05_caption');

    function revealSR_05(viewBut) {
        var captionElementID;
        var clickedSiteID = viewBut.id;
        console.log(captionElementID);
        console.log(clickedSiteID);
        if (clickedSiteID == "SR_viewBut1") {
            if(SR05_viewBut1Clicked == false){
                SR05_viewBut1Clicked = true;
                captionElementID = SR05_captions[0].id;
                $("#" + captionElementID).addClass("opacity1");
            }
            else{
                SR05_viewBut1Clicked = false;
                console.log('false');
                captionElementID = SR05_captions[0].id;
                $("#" + captionElementID).removeClass("opacity1");
            }
        }
        else if (clickedSiteID == "SR_viewBut2") {
            if(SR05_viewBut2Clicked == false){ 
                console.log('inside viewBut2');
                SR05_viewBut2Clicked = true;
                captionElementID = SR05_captions[1].id;
                $("#" + captionElementID).addClass("opacity1");
            }
            else{
                SR05_viewBut2Clicked = false;
                console.log('false');
                captionElementID = SR05_captions[1].id;
                $("#" + captionElementID).removeClass("opacity1");
            }
        }
        else if (clickedSiteID == "SR_viewBut3") {
            if(SR05_viewBut3Clicked == false){
                SR05_viewBut3Clicked = true;
                captionElementID = SR05_captions[2].id;
                $("#" + captionElementID).addClass("opacity1");
            }
            else{
                SR05_viewBut3Clicked = false;
                console.log('false');
                captionElementID = SR05_captions[2].id;
                $("#" + captionElementID).removeClass("opacity1");
            }
        }
    }

    // ——————————————————————————————————————————————————
    // Text Scramble
    // ——————————————————————————————————————————————————

    //questions to figure out:
    //how to stop looping - SetTimeout
    class TextScramble {
        //text scramble object has class of element to scramble innerHTML of, chars to scramble with and update method(?)
        constructor(el) {
            this.el = el
            this.chars = '!<>-_\\/[]{}—=+*^?#AQCI18492047'
            this.update = this.update.bind(this)
        }
        setText(newText) {
            //            const oldText = this.el.childNodes[0].innerText;

            //take innerHTML of class passed into constructor
            const oldText = this.el.innerText;
            //max of og innerHTML and newScrambledText
            const length = Math.max(oldText.length, newText.length)
            //???
            const promise = new Promise((resolve) => this.resolve = resolve)
            this.queue = []

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || ''
                const to = newText[i] || ''
                var start = Math.floor(Math.random() * 0);
                var end;
                if (newText == "UNINDEXED") {
                    //by altering this changes length of scramble
                    //                    end = start + Math.floor(Math.random() * 100);
                    //should manually set unindexed reveal times
                    if (i == 5) {
                        end = 190;
                    } else {
                        end = Math.floor(Math.random() * ((175 - 50) + 1) + 50);
                    }

                } 
                else if (newText == "?" || newText == "X") {
                    end = 70;
                    start = 0;
                }
                else {
                    end = Math.floor(Math.random() * ((155 - 30) + 1) + 30);
                }
                this.queue.push({
                    from,
                    to,
                    start,
                    end
                })
            }
            cancelAnimationFrame(this.frameRequest)
            this.frame = 0
            this.update();
            return promise
        }
        update() {
            let output = ''
            let complete = 0
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let {
                    from,
                    to,
                    start,
                    end,
                    char
                } = this.queue[i]
                if (this.frame >= end) {
                    complete++
                    output += to
                } else if (this.frame >= start) {
                    //changes speed of scramble
                    if (!char || Math.random() < 0.1) {
                        char = this.randomChar()
                        this.queue[i].char = char
                    }
                    output += `<span class="dud">${char}</span>`
                } else {
                    output += from
                }
            }
            this.el.innerHTML = output
            //            this.el.childNodes[0].innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve()
            } else {
                this.frameRequest = requestAnimationFrame(this.update)
                this.frame++
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)]
        }
    }

    // Example

    const phrases1 = [
        'SILK ROAD'
    ]
    const phrases2 = [
        'WIKILEAKS'
    ]
    const phrases3 = [
        'ANONYMOUS'
    ]
    const phrases4 = [
        'UNINDEXED'
    ]
    const phrases5 = [
        "People should have the right to buy and sell whatever they wanted so long as they aren't hurting anyone"
    ]
    const phrases6 = [
        "It is impossible to correct abuses unless we know that they’re going on."
    ]
    const phrases7 = [
        "We are anonymous, we are legion, we do not forgive, we do not forget"
    ]
    const phrases8 = [
        "?",
        "X"
    ]

    const title = document.querySelector('.titleText');
    const SR_quote = document.querySelector('.SR_quoteText');
    const WL_quote = document.querySelector('.WL_quoteText');
    const anon_quote = document.querySelector('.anon_quoteText');
    const silkRoad = document.querySelector('.navText1');
    const wikiLeaks = document.querySelector('.navText2');
    const anon = document.querySelector('.navText3');
    const questionMark = document.querySelector('.aboutBut');

    const fSilkRoad = new TextScramble(silkRoad);
    const fWikiLeaks = new TextScramble(wikiLeaks);
    const fAnon = new TextScramble(anon);
    const fSR_quote = new TextScramble(SR_quote);
    const fWL_quote = new TextScramble(WL_quote);
    const fAnon_quote = new TextScramble(anon_quote);
    const fTitle = new TextScramble(title);
    
    const fQuestionMark = new TextScramble(questionMark);


    let counter = 0
    const next = () => {
        //PHRASE1
        //sets time in between iterations of scramble
        fSilkRoad.setText(phrases1[counter]);
        //for multiple phrases
        counter = (counter + 1) % phrases1.length
        //PHRASE2
        fWikiLeaks.setText(phrases2[counter]);
        counter = (counter + 1) % phrases2.length
        //PHRASE3
        fAnon.setText(phrases3[counter]);
        counter = (counter + 1) % phrases3.length

    }

    let counter2 = 1;
    const aboutButScramble = () => {
        if(counter2 == 1){
            fQuestionMark.setText(phrases8[counter2]);
            counter2 = 0;
            console.log(counter2);
        }
        else{
            fQuestionMark.setText(phrases8[counter2]);
            counter2 = 1;
            console.log(counter2);
        }
    }

//    aboutButScramble();
    // ——————————————————————————————————————————————————
    // Intro/Transition Animation
    // ——————————————————————————————————————————————————

    var onIntroPage2 = false;
    var introPage = $(".introPage");

    function fadeOutAndReset(currentPage) {
//        var pageElements = $(currentPage).children();
//        for (var i = 0; i < pageElements.length; i++) {
//            //            $(pageElements[i]).addClass("fadeOut");
//        }
        $(currentPage).addClass("fadeOutAndScale");
//        $(currentPage).removeClass("opacity1");
//        $(currentPage).css('transform', 'scale(.9)');
//        $(currentPage).removeClass('opacity1');
//        setTimeout(function() {
//            $(currentPage).css('visibility', 'hidden');
//        }, 1000);
    }

    function introAnim() {
        $(".redBar").css('width', '110%');
        fTitle.setText(phrases4[counter]);
        counter = (counter + 1) % phrases4.length

        //fadeOut/scaleDown titlePage and hide
        setTimeout(function() {
            fadeOutAndReset(introPage);
        }, 4000);

        //unhide and fadeIn/scaleDown
        setTimeout(function() {
            $('.introPage2').addClass("fadeInAndScale");
            setTimeout(function() {
                onIntroPage2 = true;
                $('.introPage').prop('hidden', 'true');
            }, 500);
        }, 4500);
    }
    introAnim();


    // ——————————————————————————————————————————————————
    // BG Generation / Movement
    // ——————————————————————————————————————————————————

    var navHovering = false;
    $('.navMenu').mouseenter(navMouseEnter).mouseleave(navMouseLeave);

    function navMouseEnter() {
        if(scrambling == false){
            clearBackground();
            navHovering = true;
            var navNum = this.classList[2];
            var navNumNode;
            if (navNum == 'nav1') {
                navNumNode = document.querySelector(".navNum1");
                $(".nav1").addClass("navHover");
                $(".nav2").addClass("navNotHovered");
                $(".nav3").addClass("navNotHovered");
                //            clearWrongBG();
            }
            if (navNum == 'nav2') {
                navNumNode = document.querySelector(".navNum2");
                $(".nav2").addClass("navHover");
                $(".nav1").addClass("navNotHovered");
                $(".nav3").addClass("navNotHovered");
            }
            if (navNum == 'nav3') {
                navNumNode = document.querySelector(".navNum3");
                $(".nav3").addClass("navHover");
                $(".nav2").addClass("navNotHovered");
                $(".nav1").addClass("navNotHovered");
            }
            if(onMobile == false){
                generateBackground(navNum);
            }
        }
    }

    function navMouseLeave() {
        navHovering = false;
        var navNum = this.classList[2];
        var navNumNode;
        if (navNum == 'nav1') {
            navNumNode = document.querySelector(".navNum1");
            $(".nav1").removeClass("navHover");
            $(".nav2").removeClass("navNotHovered");
            $(".nav3").removeClass("navNotHovered");
        }
        if (navNum == 'nav2') {
            navNumNode = document.querySelector(".navNum2");
            $(".nav2").removeClass("navHover");
            $(".nav1").removeClass("navNotHovered");
            $(".nav3").removeClass("navNotHovered");

        }
        if (navNum == 'nav3') {
            navNumNode = document.querySelector(".navNum3");
            $(".nav3").removeClass("navHover");
            $(".nav2").removeClass("navNotHovered");
            $(".nav1").removeClass("navNotHovered");
        }
        clearBackground();
    }

    var bgGenerated = false;

    var wikiLeaksImgs = ['IMG/WIKILEAKS/1.png', 'IMG/WIKILEAKS/2.png', 'IMG/WIKILEAKS/3.png', 'IMG/WIKILEAKS/4.png', 'IMG/WIKILEAKS/5.png', 'IMG/WIKILEAKS/6.png', 'IMG/WIKILEAKS/7.png', 'IMG/WIKILEAKS/8.png', 'IMG/WIKILEAKS/9.png', 'IMG/WIKILEAKS/10.png', 'IMG/WIKILEAKS/11.png'];

    //silkRoad imgs [2][8] is last one
    var silkRoadImgs = [
        ['IMG/SILKROAD/GOOD/SR_GOOD1.png', 'IMG/SILKROAD/GOOD/SR_GOOD2.png', 'IMG/SILKROAD/GOOD/SR_GOOD3.png', 'IMG/SILKROAD/GOOD/SR_GOOD4.png', 'IMG/SILKROAD/GOOD/SR_GOOD5.png', 'IMG/SILKROAD/GOOD/SR_GOOD6.png', 'IMG/SILKROAD/GOOD/SR_GOOD7.png', 'IMG/SILKROAD/GOOD/SR_GOOD8.png', 'IMG/SILKROAD/GOOD/SR_GOOD9.png'],

        ['IMG/SILKROAD/BAD/SR_BAD1.png', 'IMG/SILKROAD/BAD/SR_BAD2.png', 'IMG/SILKROAD/BAD/SR_BAD3.png', 'IMG/SILKROAD/BAD/SR_BAD4.png', 'IMG/SILKROAD/BAD/SR_BAD5.png', 'IMG/SILKROAD/BAD/SR_BAD6.png', 'IMG/SILKROAD/BAD/SR_BAD7.png', 'IMG/SILKROAD/BAD/SR_BAD8.png', 'IMG/SILKROAD/BAD/SR_BAD9.png'],

        ['IMG/SILKROAD/WORST/SR_WORST1.png', 'IMG/SILKROAD/WORST/SR_WORST2.png', 'IMG/SILKROAD/WORST/SR_WORST3.png', 'IMG/SILKROAD/WORST/SR_WORST4.png', 'IMG/SILKROAD/WORST/SR_WORST5.png', 'IMG/SILKROAD/WORST/SR_WORST6.png', 'IMG/SILKROAD/WORST/SR_WORST7.png', 'IMG/SILKROAD/WORST/SR_WORST8.png', 'IMG/SILKROAD/WORST/SR_WORST9.png']
    ];

    var imgNumLayer4 = 70;
    var imgNumLayer3 = 45;
    var imgNumLayer2 = 10;
    var imgNumLayer1 = 4;

    var anonCodeNumLayer1 = 8;
    var anonCodeNumLayer2 = 16;
    var anonCodeNumLayer3 = 25;
    var anonCodeNumLayer4 = 60;
    var codeBlockNumTotal = anonCodeNumLayer1 + anonCodeNumLayer2 + anonCodeNumLayer3 + anonCodeNumLayer4;

    var bgLayer4Class;
    var bgLayer3Class;
    var bgLayer2Class;
    var bgLayer1Class;

    function generateBackground(storyNum) {
        clearBackground();
        var bgContainer = document.querySelector(".bgContainer");
        var oldBGImgs = $(".bgContainer").find('.bgLayer');
        if (bgGenerated == false) {
            if (storyNum == 'nav1') {
                bgLayer4Class = 'SR_BGLayer4';
                bgLayer3Class = 'SR_BGLayer3';
                bgLayer2Class = 'SR_BGLayer2';
                bgLayer1Class = 'SR_BGLayer1';
            } else if (storyNum == 'nav2') {
                bgLayer4Class = 'WL_bgLayer4';
                bgLayer3Class = 'WL_bgLayer3';
                bgLayer2Class = 'WL_bgLayer2';
                bgLayer1Class = 'WL_bgLayer1';
            } else if (storyNum == 'nav3') {
                bgLayer4Class = 'anonCodeLayer4';
                bgLayer3Class = 'anonCodeLayer3';
                bgLayer2Class = 'anonCodeLayer2';
                bgLayer1Class = 'anonCodeLayer1';
                generateAnonBG(anonCodeNumLayer4, bgLayer4Class);
                generateAnonBG(anonCodeNumLayer3, bgLayer3Class);
                generateAnonBG(anonCodeNumLayer2, bgLayer2Class);
                generateAnonBG(anonCodeNumLayer1, bgLayer1Class);
            }
            bgGenerated = true;
            generateBGLayer(storyNum, bgLayer4Class, imgNumLayer4);
            generateBGLayer(storyNum, bgLayer3Class, imgNumLayer3);
            generateBGLayer(storyNum, bgLayer2Class, imgNumLayer2);
            generateBGLayer(storyNum, bgLayer1Class, imgNumLayer1);
        }
    }

    //create each bgImage depending on numbers supplied to parameters
    function generateBGLayer(storyNum, bgLayerClass, imgNum) {
        var bgCounter = 0;
        var bgSetInterval = setInterval(function() {
            if (bgCounter > imgNum || navHovering == false) {
                clearInterval(bgSetInterval);
                if (navHovering == false) {
                    setTimeout(function(){
                        clearBackground();
                    }, 100);
                }
            }
               
            var topPos = Math.floor((Math.random() * 100) + 1);
            var leftPos = Math.floor((Math.random() * 100) + 1);
            var img = document.createElement("img");
            
            var bgContainer = document.querySelector(".bgContainer");

            if (storyNum == 'nav1') {
                //eliminate unwanted WL bgIMGs
                var oldWLIMGs = $(".bgContainer").find('.WL_bgImg');
                if(oldWLIMGs.length > 0){
                    for(var i = 0; i < oldWLIMGs.length; i++){
                        bgContainer.removeChild(oldWLIMGs[i]);
                    }
                }
                var rando = Math.random();
                var SR_ImgIndex = Math.floor((Math.random() * 9));
                if (rando < .3333) {
                    img.setAttribute('src', silkRoadImgs[0][SR_ImgIndex]);
                } else if (rando < .6666) {
                    img.setAttribute('src', silkRoadImgs[1][SR_ImgIndex]);
                } else if (rando < .9999) {
                    img.setAttribute('src', silkRoadImgs[2][SR_ImgIndex]);
                }
                $(img).addClass('SR_bgImg');
            } else if (storyNum == 'nav2') {
                //eliminate unwanted SR bgIMGs
                var oldSRIMGs = $(".bgContainer").find('.SR_bgImg');
                if(oldSRIMGs.length > 0){
                    for(var i = 0; i < oldSRIMGs.length; i++){
                        bgContainer.removeChild(oldSRIMGs[i]);
                    }
                }
                var WL_imgIndex = Math.floor((Math.random() * 10));
                $(img).addClass('WL_bgImg');
                img.setAttribute('src', wikiLeaksImgs[WL_imgIndex]);
            } 
            $(img).addClass(bgLayerClass);
            $(img).addClass('bgLayer');
            $(img).css({
                "top": +topPos + "%",
                "left": +leftPos + "%"
            });

            //hover on/off methods for each bgImg
            $(img).hover(
                function addHover(img) {
                    $(this).addClass('bgLayerHover');
                },

                function removeHover(img) {
                    $(this).removeClass('bgLayerHover');
                }
            );
            $('.bgContainer').append(img);
            if (storyNum == 'nav1' || storyNum == 'nav2') {}
            moveBG();
            bgCounter++;
        }, 15);
    }

    //generates first iteration of AnonCodeBlocks
    function generateAnonBG(codeBlockNum, bgLayerClass) {
        var bgCounter = 0;
        var bgSetInterval = setInterval(function() {
            if (bgCounter > codeBlockNum || navHovering == false) {
                clearInterval(bgSetInterval);
                if (navHovering == false) {
                    clearBackground();
                }
            }
            var randomTopPos = Math.floor((Math.random() * 100) + 1);
            var randomLeftPos = Math.floor((Math.random() * 100) + 1);
            var codeBlockNodes = document.querySelector(".codeBlockContainer").children;
            var rando;
            if (bgLayerClass == 'anonCodeLayer1') {
                //3-5 (Layer1)
                rando = Math.floor((Math.random() * 3) + 3);
            } else if (bgLayerClass == 'anonCodeLayer2') {
                //2-5 (layer2)
                rando = Math.floor((Math.random() * 4) + 2);
            } else if (bgLayerClass == 'anonCodeLayer3') {
                //1-5 (layer3)
                rando = Math.floor((Math.random() * 5) + 1);
            } else {
                rando = Math.floor((Math.random() * 6));
            }
            var codeBlockClone = $(codeBlockNodes[rando]).clone();
            $(codeBlockClone).addClass('.anonBGCode');
            $(codeBlockClone).addClass(bgLayerClass);
            $(codeBlockClone).css({
                "top": +randomTopPos + "%",
                "left": +randomLeftPos + "%"
            });
            $('.bgContainer').append(codeBlockClone);
            moveBG();
            bgCounter++;
        }, 15);
    }

    //moves all bgImgLayers at different speeds
    function moveBG() {
        //bgImg arrays
        var bgLayer1 = document.getElementsByClassName(bgLayer1Class);
        var bgLayer2 = document.getElementsByClassName(bgLayer2Class);
        var bgLayer3 = document.getElementsByClassName(bgLayer3Class);
        var bgLayer4 = document.getElementsByClassName(bgLayer4Class);

        var layer1Velocity = .012;
        var layer2Velocity = .007;
        var layer3Velocity = .004;
        var layer4Velocity = .001;
        var topEndPos = -600;

        move(bgLayer1, layer1Velocity);
        setTimeout(move(bgLayer2, layer2Velocity), 500);
        setTimeout(move(bgLayer3, layer3Velocity), 1000);
        setTimeout(move(bgLayer4, layer4Velocity), 500);
        //        move(bgLayer2Imgs, layer2Velocity);
        //        move(bgLayer3Imgs, layer3Velocity);
        //        move(bgLayer4Imgs, layer4Velocity);

        function move(bgLayerImgs, velocity) {
            for (var i = 0; i < bgLayerImgs.length; i++) {
                //calculate anim duration based on dist. to offscreen and velocity
                var offsetY = $(bgLayerImgs[i]).offset().top;
                var deltaY = offsetY - topEndPos;
                var animDur = deltaY / velocity;

                $(bgLayerImgs[i]).velocity({
                    top: topEndPos + 'px'
                }, {
                    duration: animDur,
                    easing: "linear",
                    complete: function() {}
                });
            }
        }

    }

    function clearBackground() {
        if (navClicked == false) {
            var bgContainer = document.querySelector(".bgContainer");
            while (bgContainer.firstChild) {
                bgContainer.removeChild(bgContainer.firstChild);
            }
            bgGenerated = false;
        }
    }
