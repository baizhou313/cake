let str = '刷卡机打卡机圣诞卡思考角度看顶顶顶顶顶撒大苏打实打实大苏打实打实大苏打实打实好好感激和今后的手机号发就开始大环境的';
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