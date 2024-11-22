//定义星星颜色
const STAR_COLOR = '#fff';
//大小
const STAR_SIZE = 3;
//最小缩放比例
const STAR_MIN_SCALE = 0.2;
//溢出阈值
const STAR_OVERFLOW = 50;
//星星数量       window-浏览器窗口对象
const STAR_NUM = (window.innerWidth + window.innerHeight) / 8;
//获取画布
const canvas = document.querySelector('canvas');
//获取上下文(画笔)
const context = canvas.getContext('2d');
//定义缩放比例
let scale = 1;
//定义宽高
let width;
let height;
//定义星星数组
let stars = [];
//定义鼠标位置
let mouseX;
let mouseY;
//定义速度对象
//对象类型,键值对的集合,包含属性和方法
let velocity = {
    //x,y为速度,tx,ty为目标速度,z为缩放速度
    x: 0, y: 0, tx: 0, ty: 0, z: 0.0009
};
//定义触摸输入标志
let touchInput = false;



//生成星星
generate();
//调整画布大小
resize();
//运行动画
step();
//窗口大小改变事件
window.onresize = resize;
//鼠标移动事件
canvas.onmousemove = onMouseMove;
//触摸移动事件
canvas.ontouchmove = onTouchMove;
//触摸结束事件
canvas.ontouchend = onTouchEnd;
//鼠标离开文档时
document.onmouseleave = onMouseLeave;
//生成星星
function generate() {
    for (let i = 0; i < STAR_NUM; i++) {
        stars.push({
            //random() 方法可返回介于 0（包含） ~ 1（不包含）之间的一个随机数。
            x: 0, y: 0, z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
    }
}
//放置星星
function placeStar(star) {
    star.x = Math.random() * canvas.width;
    star.y = Math.random() * canvas.height;
}

//回收星星并重新放置
function recycleStar(star) {
    // 初始化方向为'z'
    let direction = 'z';
    // 获取速度的绝对值
    let vx = Math.abs(velocity.x);
    let vy = Math.abs(velocity.y);
    // 如果速度绝对值大于1,则根据速度大小随机设置方向
    if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
            axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
            axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }

        if (axis === 'h') {
            direction = velocity.x > 0 ? 'l' : 'r';
        } else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
    }
    //随机设置星星缩放比例
    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
    //根据方向设置星星位置
    if (direction === 'z') {
        //
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    } else if (direction === 'l') {
        //左边
        star.x = -STAR_OVERFLOW;
        star.y = height * Math.random();
    } else if (direction === 'r') {
        //右边
        star.x = width + STAR_OVERFLOW;
        star.y = height * Math.random();
    } else if (direction === 't') {
        //上边
        star.x = width * Math.random();
        star.y = -STAR_OVERFLOW;
    } else if (direction === 'b') {
        //下边
        star.x = width * Math.random();
        star.y = height + STAR_OVERFLOW;
    }
}
//调整画布大小
function resize() {
    scale = window.devicePixelRatio || 1;
    //设置画布宽高
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * scale;
    canvas.height = height * scale;
    width = canvas.width;
    height = canvas.height;
    //重新设置星星位置
    stars.forEach(placeStar);
}

//每一帧动画
function step() {
    //清空画布
    context.clearRect(0, 0, width, height);
    //更新星星的位置和速度
    update();
    //绘制星星
    render();
    //下一帧
    requestAnimationFrame(step);
}
//更新星星的位置和速度
function update() {
    //缓动速度
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;
    //更新速度
    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;
    //遍历星星
    stars.forEach((star) => {
        //根据速度更新星星位置
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        //根据速度和缩放比例更新星星位置(围绕屏幕中心旋转)
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        //更新缩放比例
        star.z += velocity.z;
        //判断星星是否超出边界
        if (star.x < -STAR_OVERFLOW ||
            star.x > canvas.width + STAR_OVERFLOW ||
            star.y < -STAR_OVERFLOW ||
            star.y > canvas.height + STAR_OVERFLOW) {
            recycleStar(star);
        }
    });
}
//绘制星星
function render() {
    //遍历星星
    stars.forEach((star) => {
        //设置绘制星星样式
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.strokeStyle = STAR_COLOR;
        //绘制星星的路径
        context.beginPath();
        context.moveTo(star.x, star.y);
        //计算星星的尾巴坐标
        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;
        //如果尾巴坐标绝对值小于0.1,则设置为0.5
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        //绘制星星的尾巴
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
    });
}
//移动鼠标指针
function movePointer(x, y) {
    //如果鼠标位置存在
    if (typeof pointerX === 'number' && typeof pointerY === 'number') {
        let ox = x - pointerX;
        let oy = y - pointerY;

        velocity.tx += (ox / 8) * scale * (touchInput ? 1 : -1);
        velocity.ty += (oy / 8) * scale * (touchInput ? 1 : -1);
    }
    //更新鼠标指针位置
    pointerX = x;
    pointerY = y;
}
//鼠标移动事件
function onMouseMove(event) {
    touchInput = false;
    movePointer(event.clientX, event.clientY);
}
//触摸移动事件
function onTouchMove(event) {
    touchInput = true;
    movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
    event.preventDefault();
}
//鼠标离开canvas
function onMouseLeave() {
    pointerX = null;
    pointerY = null;
}
//触摸结束事件
function onTouchEnd() {
    pointerX = null;
    pointerY = null;
}

function ToRead() {
    setTimeout(function () {
        window.location.href = "./html/read.html";
    }, 1000);
}
