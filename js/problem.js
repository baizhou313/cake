let input = document.querySelector('#input');
const message = document.getElementById('message');


document.addEventListener('DOMContentLoaded', () => {

    document.body.classList.add('fade-in');

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            judge();
        }
    });
});

function judge() {
    let input = document.querySelector('#input');
    // 获取输入框的值
    let inputValue = input.value;
    // 将输入框的值转换为数字类型
    let num = parseFloat(inputValue);

    message.classList.remove('success', 'error');
    if (num > 1023) {
        message.textContent = '这个数太大了, 请重新输入';
        message.classList.add('error');
    }
    else if (num < 1023) {
        message.textContent = '这个数太小了, 请重新输入';
        message.classList.add('error');
    }
    else if (num == 1023) {
        alert('恭喜你，答对了！');
        window.location.href = "../html/cake.html";

    }
    else {
        message.textContent = '你这输的也不是数字呀';
        message.classList.add('error');
    }
}