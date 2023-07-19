function init() {

}

function right() {
    let elements = document.getElementsByClassName("teacherItem")
    for (let i = 0; i < elements.length; i++) {

        if (elements[i].firstElementChild.className.includes("active") && i+1<elements.length){
            elements[i+1].firstElementChild.click()
            hideRight(elements);
            return
        }
    }
}

function left() {
    let elements = document.getElementsByClassName("teacherItem")
    for (let i = elements.length-1; i >=0; i--) {
        if (elements[i].firstElementChild.className.includes("active") && i-1>=0){
            elements[i-1].firstElementChild.click()
            hideLeft(elements);
            return
        }
    }
}
function hideRight(elements) {
    for (let i = 0; i < elements.length; i++) {
        if (!elements[i].className.includes("hideTeacher")) {
            if (i + 3 < elements.length) {
                elements[i].className += " hideTeacher"
                elements[i + 3].className = elements[i + 3].className.replace("hideTeacher", "")
            }
            return
        }
    }
}

function hideLeft(elements) {
    for (let i = elements.length-1; i >=0; i--) {
        if (!elements[i].className.includes("hideTeacher")) {
            if (i - 3 >= 0) {
                elements[i].className += " hideTeacher"
                elements[i - 3].className = elements[i - 3].className.replace("hideTeacher", "")
            }
            return
        }
    }
}



//sender to  mail
function sendMail(nameId,phoneId) {
    let elementName = document.getElementById(nameId);
    let elementPhone = document.getElementById(phoneId);
    send(elementName, elementPhone, "Math");
}


function send(elementName, elementPhone, from) {
    let data =
        'name="' + elementName.value + '"&phone="' + elementPhone.value + '"&from="' + from + '"';
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/sendMail.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // после получения какого-либо ответа от сервера
    xhr.onload = () => {
        if (xhr.status !== 200) {
            // выводим ошибку в консоль
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            return;
        }
        // получаем ответ сервера
        const response = xhr.response;
        console.log(response);
    };
    // срабатывает, когда запрос не может быть выполнен (например, нет соединения или не корректный URL)
    xhr.onerror = () => {
        // происходит, только когда запрос совсем не получилось выполнить
        console.log(`Ошибка при выполнении запроса`);
    };
    xhr.send(data);

    elementName.value = "";
    elementPhone.value = "";
}