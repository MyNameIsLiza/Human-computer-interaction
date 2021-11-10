alert('Привіт, друже');
if (confirm('Завдання 1\nВивести на екран більше з двох даних чисел')) {
    var a = myPrompt('Введіть перше число', isNumber);
    var b = myPrompt('Введіть друге число', isNumber);
    alert("\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0435: " + task1(a, b));
}
if (confirm('Завдання 2\nПоміняти місцями першу і останню цифри числа')) {
    var c = myPrompt('Введіть число', isNumber);
    alert("\u0417\u043C\u0456\u043D\u0435\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: " + task2(c));
}
if (confirm('Завдання 3\nСкільки букв "у" в слові стоїть на парних місцях?')) {
    var str = myPrompt('Введіть рядок');
    alert("\u041A\u0456\u043B\u044C\u043A\u0456\u0441\u0442\u044C \u0431\u0443\u043A\u0432 \u0443 \u043D\u0430 \u043F\u0430\u0440\u043D\u0438\u0445 \u043C\u0456\u0441\u0446\u044F\u0445: " + task3(str));
}
if (confirm('Завдання 4\nСтворити функцію, що повертає строку, яка починається з перших 3 символів вашого імені та останніх 3 символів прізвища')) {
    var name_1 = myPrompt('Введіть ім\'я', is3Length);
    var surname = myPrompt('Введіть прізвище', is3Length);
    alert("\u0412\u0438\u0439\u0448\u043B\u043E: " + task4(name_1, surname));
}
if (confirm('Завдання 5\nДля цілочисельного масиву А, що містить 10 елементів, визначити, чи кратна сума його елементів 7')) {
    var arr = randArr(10);
    alert(task5(arr) ? 'Сума елементів масива кратна 7' : 'Сума елементів масива не кратна 7');
}
if (confirm('Завдання 6\nДана матриця Y (m, n). Знайти стовпець з найбільшою і найменшою сумою елементів')) {
    var m = myPrompt('Введіть кількість рядків', isInt);
    var n = myPrompt('Введіть кількість стовпців', isInt);
    var matrix = randArr(m, n);
    var _a = task6(matrix), maxSum = _a[0], minSum = _a[1];
    alert("\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430 \u0441\u0443\u043C\u0430 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432: " + maxSum + "\n\u041C\u0456\u043D\u0456\u043C\u0430\u043B\u044C\u043D\u0430 \u0441\u0443\u043C\u0430 \u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432: " + minSum);
}
function task1(a, b) {
    //Вивести на екран більше з двох даних чисел
    return Math.max(a, b);
}
function task2(a) {
    //Поміняти місцями першу і останню цифри числа
    var str = String(a);
    switch (str.length) {
        case 1:
            return +str;
        case 2:
            return +(str[1] + str[0]);
        default:
            return +(str[str.length - 1] + str.substring(1, str.length - 1) + str[0]);
    }
}
function task3(str) {
    //Скільки букв "у" в слові стоїть на парних місцях?
    str = str.toLowerCase();
    var acc = 0;
    for (var i = 1; i < str.length; i += 2) {
        if (str[i] === 'у' || str[i] === 'y') {
            acc++;
        }
    }
    return acc;
}
function task4(name, surname) {
    //Задайте у дві змінні ваші ім'я та прізвище.
    // Створіть функцію, що повертає строку,
    // яка починається з перших трьох символів вашого імені та останніх трьох символів прізвища.
    // Результат виведіть в консоль.
    return name.substring(0, 3) + surname.substring(surname.length - 3, surname.length);
}
function task5(a) {
    //Для цілочисельного масиву А, що містить 10 елементів, визначити, чи кратна сума його елементів 7
    var sum = a.reduce(function (previousValue, currentValue) { return previousValue + currentValue; });
    console.log(sum);
    return sum % 7 === 0;
}
function task6(matrix) {
    //Дана матриця Y (m, n). Знайти стовпець з найбільшою і найменшою сумою елементів
    var sum = [];
    for (var j = 0; j < matrix[0].length; j++) {
        sum[j] = 0;
        for (var i = 0; i < matrix.length; i++) {
            sum[j] += matrix[i][j];
        }
    }
    console.log(sum);
    return [Math.max.apply(Math, sum), Math.min.apply(Math, sum)];
}
function randArr(m, n) {
    if (n === void 0) { n = 1; }
    var arr = [];
    for (var i = 0; i < m; i++) {
        if (n !== 1) {
            arr[i] = [];
            for (var j = 0; j < n; j++) {
                arr[i][j] = Math.floor(Math.random() * 100) - 50;
            }
        }
        else {
            arr[i] = Math.floor(Math.random() * 100) - 50;
        }
    }
    console.log(arr);
    return arr;
}
function myPrompt(message, conditionFunction) {
    if (conditionFunction === void 0) { conditionFunction = function (result) {
        return true;
    }; }
    var result = String(prompt(message)).trim();
    if (!result || !conditionFunction(result)) {
        return myPrompt('Введіть ще раз', conditionFunction);
    }
    else {
        return result;
    }
}
function isNumber(num) {
    return +num === Number.parseFloat(num);
}
function isInt(num) {
    return +num === Number.parseInt(num);
}
function is3Length(str) {
    return str.length >= 3;
}
