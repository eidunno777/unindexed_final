    var allVids = $(document).find(".video");
    function myFunction(x) {
        if (x.matches) { // If media query matches
            $(".sideNav").prop('hidden', true);
            $(".SR05_buttonGroup").prop('hidden', true);
            for (var i = 0; i < allVids.length; i++) {
                $(allVids[i]).prop('hidden', true); //mute
            }
        } else {
            $(".sideNav").prop('hidden', false);
            $(".SR05_buttonGroup").prop('hidden', false);
            for (var i = 0; i < allVids.length; i++) {
                if($(allVids[i]).hasClass("WL_Vid")){
                }
                else{
                    $(allVids[i]).prop('hidden', false); //mute
                }
            }
        }
    }

    var x = window.matchMedia("(max-width: 480px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes

    var navClicked = false;
    var pageNumber = -1;
    var pageClassList;
    var storyName = "";

    //keep track of what pages in story have been visited
    var visitedPages = [];
    var numPages = 6;
    while (numPages--) visitedPages.push(false);

    function resetVistedPagesArray() {
        while (numPages--) visitedPages.push(false);
    }
    
    var allNavMenuItems = $(document).find('.navMenu');
    function navPageIntro(){
        var nav1Items = $(document).find('.nav1');
        var nav2Items = $(document).find('.nav2');
        var nav3Items = $(document).find('.nav3');
        $('.navMenuRow').prop('hidden', false);
        $('.navPage').removeClass("fadeInAndScale");
        $('.navPage').css("visibility", 'visible');
        console.log(nav1Items);
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
    
    function startStory(storyName) {
//        $(".uiTitle").prop("hidden", false);
        var navNumber = "";
        setTimeout(function(){
            $('.titleWrap').addClass("opacity1");
            $('.sideNav').addClass("opacity1");
        }, 1100);
    
        var story = $(storyName).attr('class');
        if (story == "anonNavMenu" || $(story).hasClass('nav3')) {
            $(".bgImage").removeAttr("hidden");
            $('.nav1').addClass("fadeOut");
            $('.nav2').addClass("fadeOut");
            navNumber = ".nav3";
            pageClassList = ['.anonPage1', '.anonPage2', '.anonPage3', '.anonPage35', '.anonPage4', '.anonPage5'];
            storyName = "anon";
        } else if (story == "wikiLeaksNavMenu" || $(story).hasClass('nav2')) {
            $('.nav1').addClass("fadeOut");
            $('.nav3').addClass("fadeOut");
            navNumber = ".nav2";
            pageClassList = ['.WL_Page1', '.WL_Page15', '.WL_Page2', '.WL_Page3', '.WL_Page4', '.WL_Page5'];
            storyName = "wl";
        } else {
            $('.nav2').addClass("fadeOut");
            $('.nav3').addClass("fadeOut");
            navNumber = ".nav1";
            pageClassList = ['.SR_Page1', '.SR_Page2', '.SR_Page25', '.SR_Page3', '.SR_Page4', '.SR_Page5'];
            storyName = "sr";
        }

        navClicked = true;
        pageNumber = 0;
        setTimeout(function() {
            $(navNumber).addClass('fadeOutAndScaleUp');
            $('.navPage').css('visibility', 'hidden');
        }, 700);
        setTimeout(function() {
             $(pageClassList[pageNumber]).css('visibility', 'visible');
             $(pageClassList[pageNumber]).css('transform', 'scale(1)');
             $(pageClassList[pageNumber]).addClass('opacity1');
             $('.navPage').prop('hidden', true);
        }, 1100);
        slideSideBar();
    }

    function slideSideBar() {
        setTimeout(function() {
            $(".sideNav").css("left", "100%");
        }, 1500);
    }
    
    var currentlyScrolling = false;
    //prev page in story
    function pageUp() {
        if (navClicked == true && pageNumber != 0 && currentlyScrolling == false) {
            currentlyScrolling = true;
            setTimeout(function() {
                currentlyScrolling = false;
                pageNumber--;
            }, 800);
                $(pageClassList[pageNumber]).css('transform', 'scale(.95)');
                $(pageClassList[pageNumber]).removeClass('opacity1');
            setTimeout(function() {
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
            }, 800);
            //current page fade out / scale up
            $(pageClassList[pageNumber]).css('transform', 'scale(1.05)');
            $(pageClassList[pageNumber]).removeClass('opacity1'); 
            //next page fade in / scale up
            setTimeout(function() {
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
                }
            }
        }
    }

    var WL_vids = [".WL_04", ".WL_01", ".WL_02", ".WL_05", ".WL_06", ".WL_03"];
    var vidRevealInterval = 0;
    var vidsRevealed = false;

    function revealWLVideos() {
        if (vidsRevealed == false) {
            $(WL_vids[0]).attr("hidden", false);
            $(WL_vids[0]).addClass('VideoFadeInAndScale');
            setTimeout(function() {
                $(WL_vids[1]).attr("hidden", false);
                $(WL_vids[1]).addClass('VideoFadeInAndScale');
            }, 500);
            setTimeout(function() {
                $(WL_vids[2]).attr("hidden", false);
                $(WL_vids[2]).addClass('VideoFadeInAndScale');
            }, 1000);
            setTimeout(function() {
                $(WL_vids[3]).attr("hidden", false);
                $(WL_vids[3]).addClass('VideoFadeInAndScale');
            }, 1500);
            setTimeout(function() {
                $(WL_vids[4]).attr("hidden", false);
                $(WL_vids[4]).addClass('VideoFadeInAndScale');
            }, 2000);
            setTimeout(function() {
                $(WL_vids[5]).attr("hidden", false);
                $(WL_vids[5]).addClass('VideoFadeInAndScale');
            }, 2500);
            vidsRevealed = true;
        }
    }

    //scrolling event listener
    var midScroll = false;
    document.addEventListener("wheel", function(e) {
        if (onIntroPage2 == true) {
            onIntroPage2 = false;
            var introPage2 = $('.introPage2');
            $(introPage2).removeClass('fadeInAndScale');
            fadeOutAndReset(introPage2);
            setTimeout(function() {
//                $('.navMenuRow').prop('hidden', false);
//                $('.navPage').addClass("fadeInAndScale");
                navPageIntro();
                next();
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
                else if (pageNumber != 5) {
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
            $(this).animate({
                volume: .9
            }, 700);
            $(this).prop('muted', false); //mute
        },
        function() {
            $(this).animate({
                volume: 0
            }, 700);
            //        $( this ).prop('muted', true); //unmute
        }
    );
    //    ****
    //    var WL_Vids = $(".WL_Page4").find(".WL_Vid");
    //    for(var i = 0; i < WL_Vids.length; i++){
    //        $(WL_Vids[i]).get(0).play();
    //    }

    //    mute all videos for sanitys sake
    for (var i = 0; i < allVids.length; i++) {
        $(allVids[i]).prop('muted', true); //mute
    }

    function returnToNav() {
        navClicked = false;
        $(".uiTitle").removeClass("opacity1");
        $('.sideNav').removeClass("opacity1");
        clearBackground();
        fadeOutAndReset(pageClassList[pageNumber]);
        for(var i = 0; i < allNavMenuItems.length; i++){
            $(allNavMenuItems[i]).removeClass('fadeOut');
        }
        pageNumber = -1;
        navPageIntro();
//        location.reload();
    }

    //    var animation = bodymovin.loadAnimation({
    //        container: document.getElementById('navMenuAnim'),
    //        renderer: 'svg',
    //        loop: false,
    //        autoplay: true,
    //        path: 'JS/data.json'
    //    });

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
        $(".transcriptText").css("opacity", "1");
        setTimeout(function() {
            $(".WL_collatCap").css("opacity", "1");
            transcriptVisible = true;
            timePassed = true;
        }, 1000);
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
        if (clickedSiteID == "SR_viewBut1" && SR05_viewBut1Clicked == false) {
            SR05_viewBut1Clicked = true;
            captionElementID = SR05_captions[0].id;
        }
        if (clickedSiteID == "SR_viewBut2" && SR05_viewBut2Clicked == false) {
            SR05_viewBut2Clicked = true;
            captionElementID = SR05_captions[1].id;
        }
        if (clickedSiteID == "SR_viewBut3" && SR05_viewBut3Clicked == false) {
            SR05_viewBut3Clicked = true;
            captionElementID = SR05_captions[2].id;
        }

        $("#" + captionElementID).css("opacity", "1");
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
            this.chars = '!<>-_\\/[]{}—=+*^?#ABQCEURI18492047'
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
                const start = Math.floor(Math.random() * 0);
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

                } else {
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
        "One of the best ways to achieve justice is to expose injustice."
    ]
    const phrases7 = [
        "We are anonymous, we are legion, we do not forgive, we do not forget"
    ]

    const title = document.querySelector('.titleText');
    const SR_quote = document.querySelector('.SR_quoteText');
    const WL_quote = document.querySelector('.WL_quoteText');
    const anon_quote = document.querySelector('.anon_quoteText');
    const silkRoad = document.querySelector('.navText1');
    const wikiLeaks = document.querySelector('.navText2');
    const anon = document.querySelector('.navText3');

    const fSilkRoad = new TextScramble(silkRoad);
    const fWikiLeaks = new TextScramble(wikiLeaks);
    const fAnon = new TextScramble(anon);
    const fSR_quote = new TextScramble(SR_quote);
    const fWL_quote = new TextScramble(WL_quote);
    const fAnon_quote = new TextScramble(anon_quote);
    const fTitle = new TextScramble(title);

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


    // ——————————————————————————————————————————————————
    // Intro/Transition Animation
    // ——————————————————————————————————————————————————

    var onIntroPage2 = false;
    var introPage = $(".introPage");

    function fadeOutAndReset(currentPage) {
        var pageElements = $(currentPage).children();
        for (var i = 0; i < pageElements.length; i++) {
            //            $(pageElements[i]).addClass("fadeOut");
        }
        $(currentPage).addClass("fadeOutAndScale");
        setTimeout(function() {
            $(currentPage).prop('hidden', true);
        }, 1000);
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
        generateBackground(navNum);
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
        console.log(oldBGImgs);
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
