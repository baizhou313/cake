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
    if (num > 1123) {
        alert('这个数太大了,请重新输入');
    }
    else if (num < 1123) {
        alert('这个数太小了,请重新输入');
    }
    else if (num == 1123) {
        alert('恭喜你，答对了！');
        window.location.href = "../html/cake.html";

    }
    else {
        alert('你这输的也不是数字呀');
    }
}