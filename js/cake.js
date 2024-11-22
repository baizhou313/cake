
// 获取音频元素
const audio = document.getElementById('myAudio');
const rotateButton = document.querySelector('.top-right-button');
let flag = 0;
//播放或暂停音频
function musicChange() {
    if (flag == 0) {
        flag = 1;
        audio.play().catch(error => {
            alert("播放音频时出错");
        });
        rotateButton.classList.add('rotating');
    }
    else if (flag == 1) {
        flag = 0;
        audio.pause();
        rotateButton.classList.remove('rotating');
    }
}