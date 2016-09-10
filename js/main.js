$(document).ready(function () {

    // Слайдер
    (function () {

        // Создаю архив слайдов
        var sliderArr = [],
            maxHeightContent = 0,
            sliderContent;
        // Расставляю слайды
        $('.slider__main').each(function (i) {
            sliderArr.push(this);
            sliderArr[i].style.left = (100 * i) + "%";
        });

        var
            dotsArr = $('.slider__dots > li'), //Собираю массив круглешков
            dotId = 0, //Позиция точки
            newId = 0; //Новая позиция

        // Обработчик нажатия по круглешку
        dotsArr.on('click', function () {
            newId = dotsArr.index(this); // Записываем порядковый номер круглешка

            if (dotId !== newId) {
                // отменяем активацию первого и вешаем на новый круглешок
                $(dotsArr[newId]).addClass("slider__dot--active");
                $(dotsArr[dotId]).removeClass("slider__dot--active");

                // Матаем слайдер
                if (dotId < newId) {
                    $(sliderArr).each(function (i) {
                        $(this).animate({left: (100 * (-newId + i)) + "%"}, 1000);
                    });
                } else {
                    $(sliderArr).each(function (i) {
                        $(this).animate({left: (100 * (-newId + i)) + "%"}, 1000);
                    });
                }

                dotId = newId; // Задаем точку о умолчанию
            }
        });


        // Обработка скрола мышей

        var jqSider = $("#slider"); // Забирю слайдер
        var mouseupX = 0;

        // При зажатой кнопки мыши считываю кардинаты по X
        jqSider.on('mousedown', function (e) {
            mouseupX = e.clientX;
            console.log(mouseupX);
        });

        // При отпускании кноки мыши
        jqSider.on('mouseup', function (e) {
            var mousedownX = e.clientX; // Пишу кардинаты
            console.log(mousedownX);
            console.log("+" + mouseupX);
            var difference = mousedownX - mouseupX; // разница между 2умя кардинатами
            console.log("diff: " + difference);

            if (difference < 0) { // Если минус то убирам его
                difference = -difference;
            }

            // начинаем двигать слайдер
            if (mouseupX && mouseupX != mousedownX && difference > 20) {
                if (mouseupX < mousedownX) {
                    if (dotId !== 0) {
                        newId = --dotId;
                        $(dotsArr[newId]).addClass("slider__dot--active");
                        $(dotsArr[newId + 1]).removeClass("slider__dot--active");

                        $(sliderArr).each(function (i) {
                            $(this).animate({left: (100 * (-newId + i)) + "%"}, 1000);
                        });
                    } else {
                        // к последнему слайду
                        newId = dotsArr.length - 1;
                        dotId = dotsArr.length - 1;
                        $(dotsArr[newId]).addClass("slider__dot--active");
                        $(dotsArr[0]).removeClass("slider__dot--active");
                        ////
                        $(sliderArr).each(function (i) {
                            $(this).animate({left: (100 * (-newId + i)) + "%"}, 300);
                        });
                    }
                } else {
                    if (dotId < (dotsArr.length - 1)) {
                        newId = ++dotId;
                        $(dotsArr[newId]).addClass("slider__dot--active");
                        $(dotsArr[newId - 1]).removeClass("slider__dot--active");

                        $(sliderArr).each(function (i) {
                            $(this).animate({left: (100 * (-newId + i)) + "%"}, 1000);
                        });
                    } else {
                        // к первому слайду
                        newId = 0;
                        dotId = 0;
                        $(dotsArr[0]).addClass("slider__dot--active");
                        $(dotsArr[dotsArr.length - 1]).removeClass("slider__dot--active");
                        ////
                        $(sliderArr).each(function (i) {
                            $(this).animate({left: (100 * (-newId + i)) + "%"}, 300);
                        });
                    }
                }
            }

        });

        // Обработка Тач-скрина на JS
        var slide = document.getElementById('slider');
        var startx = 0;

        slide.addEventListener('touchstart', function (e) {

            var touchobj = e.changedTouches[0];
            startx = parseInt(touchobj.clientX);
            e.preventDefault()
        }, false);

        slide.addEventListener('touchend', function (e) {
            var touchobj = e.changedTouches[0];

            var difference = startx - touchobj.clientX;
            console.log("diff: " + difference);

            if (difference < 0) {
                difference = -difference;
            }

            if (startx != touchobj.clientX && difference > 20) {
                if (startx < touchobj.clientX) {
                    // jQuery
                    if (dotId !== 0) {
                        newId = --dotId;
                        $(dotsArr[newId]).addClass("slider__dot--active");
                        $(dotsArr[newId + 1]).removeClass("slider__dot--active");

                        $(sliderArr).each(function (i) {
                            $(this).animate({left: (100 * (-newId + i)) + "%"}, 1500);
                        });
                    } else {
                        // к последнему слайду
                        newId = dotsArr.length - 1;
                        dotId = dotsArr.length - 1;
                        $(dotsArr[newId]).addClass("slider__dot--active");
                        $(dotsArr[0]).removeClass("slider__dot--active");
                        ////
                        $(sliderArr).each(function (i) {
                            $(this).animate({left: (100 * (-newId + i)) + "%"}, 300);
                        });
                    }
                } else {
                    // jQuery
                    if (dotId < (dotsArr.length - 1)) {
                        newId = ++dotId;
                        $(dotsArr[newId]).addClass("slider__dot--active");
                        $(dotsArr[newId - 1]).removeClass("slider__dot--active");

                        $(sliderArr).each(function (i) {
                            $(this).animate({left: (100 * (-newId + i)) + "%"}, 1500);
                        });
                    } else {
                        // к первому слайду
                        newId = 0;
                        dotId = 0;
                        $(dotsArr[0]).addClass("slider__dot--active");
                        $(dotsArr[dotsArr.length - 1]).removeClass("slider__dot--active");
                        ////
                        $(sliderArr).each(function (i) {
                            $(this).animate({left: (100 * (-newId + i)) + "%"}, 300);
                        });
                    }
                }
            }


            e.preventDefault()
        }, false);

        // maxHeightContent
        sliderContent = $('.slider__content');

        sliderContent.each(function () {
            if (maxHeightContent < $(this).height()) {
                maxHeightContent = $(this).height();
                console.log(maxHeightContent);
            }
        });

        console.log(maxHeightContent);
        jqSider.css('height', maxHeightContent + "px"); // setHeight
        // -- END -- //

    }());

    // Bideo.js - Video background
    (function () {

        var bv = new Bideo();
        bv.init({
            // Video element
            videoEl: document.querySelector('#background_video'),

            // Container element
            container: document.querySelector('body'),

            // Resize
            resize: true,

            // autoplay: false,

            isMobile: window.matchMedia('(max-width: 768px)').matches,

            playButton: document.querySelector('#play'),
            pauseButton: document.querySelector('#pause'),

            // Array of objects containing the src and type
            // of different video formats to add
            src: [
                {
                    src: 'images/promo/promo.mp4',
                },
                {
                    src: 'images/promo/promo.webm',
                    type: 'video/webm;codecs="vp8, vorbis"'
                }
            ],

            // What to do once video loads (initial frame)
            onLoad: function () {
                document.querySelector('#video_cover').style.display = 'none';
            }
        });
    }());

    //PopUp
    (function () {
        $('.portfolio__link').magnificPopup({
            type: 'iframe',


            iframe: {
                patterns: {
                    dailymotion: {

                        index: 'vimeo.com/',

                        id: '/',

                        src: '//player.vimeo.com/video/%id%?autoplay=1'

                    }
                }
            }

        });
    }());

    /// Send form to mail - Ajax
    (function () {
        $("#form").submit(function(e) { //устанавливаем событие отправки для формы с id=form
            e.preventDefault();
            var form_data = $(this).serialize(); //собераем все данные из формы
            $.ajax({
                type: "POST", //Метод отправки
                url: "sendForm.php", //путь до php фаила отправителя
                data: form_data,
                success: function() {
                    //код в этом блоке выполняется при успешной отправке сообщения
                    alert("Ваше сообщение отпрвлено!");
                }
            });
            return false; // блокируем обработчик отправки
        });
    }());

    // scroll
    (function () {
        $('a[href^="#cell"]').on('click', function () {
            var element = $(this).attr('href');
            $('body').animate({
                    scrollTop: $(element).offset().top
                }, 1000
            );
            return false;
        });
    })();

});