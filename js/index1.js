window.onload = function() {
    search();
    banner();
    time();
}

/*搜索栏滚动透明*/
var search = function() {
        var serchBox = document.querySelector('.jd_search_box');
        var serchBoxHeight = serchBox.offsetHeight;
        var banner = document.querySelector('.jd_banner');
        var bannerHeight = banner.offsetHeight;
        var opacity = 0;
        window.onscroll = function() {
            var scrollTop = document.documentElement.scrollTop;
            if (scrollTop < bannerHeight) {
                opacity = scrollTop / bannerHeight * 0.85;
            } else {
                opacity = 0.85;
            }
            serchBox.style.background = 'rgba(201, 21, 35, ' + opacity + ')';
        }
    }
    /*轮播图*/
var banner = function() {
    //轮播图图片
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector('ul:first-child');
    var lis = imgBox.querySelectorAll('li');
    //轮播图焦点
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');

    //加过渡方法
    var addTransition = function() {
            imgBox.style.transition = 'all 0.2s';
            imgBox.style.webkitTransition = 'all 0.2s';
        }
        //移除过渡方法
    var removeTransition = function() {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    }

    //设置位移方法
    var setTranslateX = function(translateX) {
            imgBox.style.transform = 'translateX(' + translateX + 'px)';
            imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
        }
        /*4.当屏幕变化的时候，重新计算宽度*/
    window.onresize = function() {
        /*4.1.获取banner的宽度,覆盖全局的宽度值*/
        width = banner.offsetWidth;
        /*4.2 设置图片盒子的宽度*/
        imgBox.style.width = lis.length * width + "px";
        /*4.3设置每一个li(图片)元素的宽度*/
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = width + "px";
        }
        /*4.4重新设置定位值*/
        imgBox.style.left = -index * width + "px";
    }

    var index = 1;
    var timer = setInterval(function() {
        index++;
        //过渡效果
        addTransition();
        setTranslateX(-index * width);
    }, 1000);

    imgBox.addEventListener('transitionend', function() {
        //到达最后一张
        if (index >= 9) {
            index = 1;
            //清除过度
            removeTransition();
            //位移
            setTranslateX(-index * width);
            //到达第一张
        } else if (index <= 0) {
            index = 8;
            //清除过度
            removeTransition();
            //位移
            setTranslateX(-index * width);
        }
        setPoint();
        //console.log(index);

    });
    /*轮播图焦点动画方法*/
    //index 1-8  点索引0-7
    var setPoint = function() {
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        points[index - 1].classList.add('now');
    }

    var startX = 0;
    var translateX = 0;
    var distanceX = 0;
    var isMove = false;
    /*绑定移动端touch事件*/
    imgBox.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;

        clearInterval(timer);
    });

    imgBox.addEventListener('touchmove', function(e) {
        var moveX = e.touches[0].clientX;
        //手指移动的距离
        distanceX = moveX - startX;
        // 轮播图图片移动距离
        translateX = -index * width + distanceX;
        //清除过渡,位移图片
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });

    imgBox.addEventListener('touchend', function(e) {
        if (isMove) {
            //移动距离小于图片1/3 弹回原来位置
            if (Math.abs(distanceX) < width / 3) {
                addTransition();
                //原位置就是此时图片的位置
                setTranslateX(-index * width);
            } else {
                //判断方向
                if (distanceX > 0) {
                    index--;
                } else {
                    index++;
                }
                //再位移
                addTransition();
                setTranslateX(-index * width);
            }
        }
        //重置参数
        startX = 0;
        distanceX = 0;
        isMove = false;
        //先清理定时器
        clearInterval(timer);
        //滑动结束，启用用定时器
        timer = setInterval(function() {
            index++;
            //过渡效果
            addTransition();
            setTranslateX(-index * width);
        }, 1000);
    });



}



/*倒计时*/
var time = function() {
    //设置时间
    var time = 1 * 60 * 60;
    var timer = setInterval(function() {
        var span = document.querySelectorAll('.time span')
        var h = Math.floor(time / 3600);
        var m = Math.floor(time / 60 % 60);
        var s = time % 60;
        time--;
        span[0].innerHTML = Math.floor(h / 10);
        span[1].innerHTML = h % 10;
        span[3].innerHTML = Math.floor(m / 10);
        span[4].innerHTML = m % 10;
        span[6].innerHTML = Math.floor(s / 10);
        span[7].innerHTML = s % 10;

        if (time <= 0) {
            clearInterval(timer);
        }

    }, 1000);

}
