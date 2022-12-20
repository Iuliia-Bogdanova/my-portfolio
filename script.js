/*
добавление задач в список дел:
- найти форму, при отправке которой происходит добавление
- найти input из которого забираем введенное текстовое содержимое и создаем задачу
*/
// 1. НАХОДИМ ЭЛЕМЕНТЫ НА СТРАНИЦЕ/ ОБЪЯВЛЯЕМ ПЕРЕМЕННЫЕ
const form = document.querySelector('#form'); // через # выбираем элементы по id 
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// интерактив - вешаем прослушку на форму: форма отправляется нажатием на кнопку "добавить" или enter внутри формы - отслеживаем событие "отправка формы"
// обращаемся к форме (она уже есть в const form), вызываем у нее метод addEventListene, который принимает в себя 2 аргумента: событие submit которое хотим отследить, и функцию которая будет выполнена когда произойдет нужное событие (будет отправляться форма). функцию можем передать прямо внутри колбэком (функция описывается здесь сразу и будет вызвана в определенный нужный момент - после сабмита формы)
// еще обязательно нужно отменить стандартное поведение формы - перезагрузку страницы - в функции объявляем параметр event (е) с методом preventDefault
/*
form.addEventListener('submit', function (event) {
    event.preventDefault() // отменяем перезагрузку (отправку формы)
   // достаем текст задачи из поля ввода - input уже нашли, он записан в переменной const taskInput в значении value которое введено в поле
   const taskText = taskInput.value // в переменной const taskText хранится значение которое ввели в поле
 
   // добавляем задачу на стр - генерируем/копируем нужную часть разметки из HTML для каждой новой задачи с помощью шаблонных строк/обратных кавычек. внутри шаблонных строк используем интерполяцию - вставляем переменные (здесь ${taskText})
    const taskHTML = `
                    <li class="list-group-item d-flex justify-content-between task-item">
                        <span class="task-title">${taskText}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button type="button" data-action="delete" class="btn-action">
                                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                    </li>`;
    
    // добавляем задачу на страницу - обращаемся к списку с задачами. вверху в стр 12 записываем переменную const tasksList = document.querySelector('#tasksList') и добавляем в него тот кусок разметки: обращаемся к тегу ul который в const = tasksList. dspsdftv у него метод insertAdjacentHTML с 2 аргументами: 1 - куда добавляем кусок кода (начало, конец...), 2 - переменную куска разметки, который хотим отобразить
    tasksList.insertAdjacentHTML('beforeend', taskHTML );

    taskInput.value = "" // очищаем поле ввода (берем input из переменной вверху) - задаем значение value = ""
    taskInput.focus() // возвращаем на поле ввода фокус 

    // убираем блок "список дел пуст" когда он заполняется (находим ul в html и пишем вверху переменную по id - const emptyList). проверяем, есть ли задачи в списке, и затем скрываем
    if (tasksList.children.length > 1) { // проверяем чтобы кол-во элементов внутри тега было > 1 
        emptyList.classList.add('none'); // класс none прописан в css 
    } 
}) */

// делаем рефакторинг - упрощаем код. функцию, которую передавали в колбэк опишем как отдельную функцию и передадим ее в addEventListener (стр 18), для этого объявляем новую функцию, вырезаем и аккуратно переносим в нее весь код, который передавали в эту функцию (со стр 19 до 46 не затрагивая закрытие)
// функции именуем глаголами, переменные существительными

// 2. ДОБАВЛЕНИЕ ЗАДАЧИ:
form.addEventListener('submit', addTask); // передаем только название функции addTask, не запускаем ее на выполнение (), иначе немедленный запуск не дожидая submit. а так будет запущена только после submit

// 3. УДАЛЕНИЕ ЗАДАЧИ:
tasksList.addEventListener('click', deleteTask); //удаление задач из списка дел - отследить нажатие на кнопку Х и по нажатию удалить со страницы тег li в котором эта задача. но кнопка появляется только после добавления задачи, а не присутствует изначально, поэтому будем слушать клик по всему списку задач tasksList (стр 19 html). функцию deleteTask описываем ниже функции addTask

// 4. отмечаем заадчу завершенной
tasksList.addEventListener('click', doneTask); // слушаем клик по всему списку и в момент клика запускаем функцию doneTask

// 5. ФУНКЦИИ:
// функция добавления задачи
function addTask (event) { //это function declaration (функция - имя - тело), ее можно вызывать до того,как объявлена в коде (объявлена на стр 56, а вызывается на стр 54)
    
    event.preventDefault() // отменяем отправку формы

    const taskText = taskInput.value // достаем текст задачи из поля ввода

    // формируем разметку для новой задачи
    const taskHTML = `
                    <li class="list-group-item d-flex justify-content-between task-item">
                        <span class="task-title">${taskText}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button type="button" data-action="delete" class="btn-action">
                                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                    </li>`;

     tasksList.insertAdjacentHTML('beforeend', taskHTML ); // добавляем задачу на страницу 

     taskInput.value = "" // очищаем поле ввода 
     taskInput.focus() // возвращаем на поле ввода фокус 

     // проверка. если в списке задач > 1 элемента, скрываем убираем блок 
    if (tasksList.children.length > 1) { 
         emptyList.classList.add('none'); // класс none прописан в css 
    }
}

// функция удаления задачи
function deleteTask(event) {
    // проверяем если  клик был НЕ по кнопке "удалить задачу" функция  прекращает работу (return) и работает код ниже
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item'); // удаляем родительский тег li вложенный в этой кнопке
    parentNode.remove()  // удаляем родительскую ноду - задача исчезнет

        // проверка. если в списке задач 1 элемент, показываем блок
    if (tasksList.children.length === 1) { 
        emptyList.classList.remove('none');
    }
} 

// функция отметки задачи выполненной doneTask
function doneTask(event) {
    // проверяем что клик был НЕ по кнопке "задача выполнена": 
    if (event.target.dataset.action !== 'done') return;
        
        const parentNode = event.target.closest('.list-group-item'); // поднимаемся до родительского тега li , от него найдем тег span с нужным классом task-title и добавим к нему нужный класс task-title--done
        const taskTitle = parentNode.querySelector('.task-title'); // нашли нужный span в котором содержится название задачи
        taskTitle.classList.toggle('task-title--done'); // методом toggle добавляем к спану нужный класс task-title--done (добавляется зачеркивание и убирается нажатием на кнопку V)
}

// сохранение данных