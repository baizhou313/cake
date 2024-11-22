let str = '时间过的还挺快的,虽然我不想回到高中,可能是因为封闭式的高中生活或者别的什么，但16,17岁的夏天也有很多美好瞬间，可能很多同学已经在我的剧本里完成了杀青，不经意间我们已经见过了最后一面，但故事中的人和事被定格为永恒，在故事中鲜活地存在着，和同学的回忆也足够美好，往事总在回忆时被赋予意义。人生是一场单程的旅行，不断有人离开，但也会有新的人加入，我相信我们会认识更多同样很好的朋友，我们都有光明的未来。最后，祝你生日快乐，天天开心，岁岁春无事，相逢总玉颜。';
/*querySelector:选择符合指定的第一个元素*/
let main = document.querySelector('.main');
/*分割字符串为字符串数组(分隔符,返回字符串数量)*/
let words = str.split('');

let write = () => {
    if (words.length > 0) {
        /*创建元素*/
        let span = document.createElement('span');
        /*移除数组第一个元素并返回该元素*/
        let del = words.shift();
        let opc = 0;
        span.innerHTML = del;
        /*添加元素*/
        main.appendChild(span);

        let fade = setInterval(() => {
            opc++;
            span.style.opacity = opc / 10;
            span.style.color = "transparent";
            span.style.textShadow = "0 0 5px #57606f,0 0 10px #57606f,0 0 4px #57606f,0 0 12px #57606f";
            span.style.filter = "blur(${(10/opc-1)}px)";
            if (opc >= 10) {
                clearInterval(fade);
                span.style.color = "azure";
            }
        }, 50);
    }
    else {
        scrollHint.style.opacity = 1;
        // 监听整个页面的滚动事件
        window.addEventListener('scroll', () => {
            document.body.classList.add('fade-out');
            // 在动画结束后跳转页面
            setTimeout(() => {
                window.location.href = "../html/problem.html";
            }, 500); // 与 CSS 动画时间匹配
        });
    }
}
setInterval(write, 50);

/* document.addEventListener('DOMContentLoaded', () => {
    if (words.length <= 0) {
        // 监听整个页面的滚动事件
        window.addEventListener('scroll', () => {
            document.body.classList.add('fade-out');
            // 在动画结束后跳转页面
            setTimeout(() => {
                window.location.href = "../html/problem.html";
            }, 500); // 与 CSS 动画时间匹配
        });
    }
}); */