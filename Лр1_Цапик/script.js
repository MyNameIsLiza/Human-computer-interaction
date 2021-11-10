alert('Привіт, друже');
if (confirm('Завдання 1\nВивести на екран більше з двох даних чисел')) {
    const a = myPrompt('Введіть перше число', isNumber);
    const b = myPrompt('Введіть друге число', isNumber);
    alert(`Максимальне: ${task1(a, b)}`);
}

if (confirm('Завдання 2\nПоміняти місцями першу і останню цифри числа')) {
    const c = myPrompt('Введіть число', isNumber);
    alert(`Змінене число: ${task2(c)}`);
}

if (confirm('Завдання 3\nСкільки букв "у" в слові стоїть на парних місцях?')) {
    const str = myPrompt('Введіть рядок');
    alert(`Кількість букв у на парних місцях: ${task3(str)}`);
}

if (confirm('Завдання 4\nСтворити функцію, що повертає строку, яка починається з перших 3 символів вашого імені та останніх 3 символів прізвища')) {
    const name = myPrompt('Введіть ім\'я', is3Length);
    const surname = myPrompt('Введіть прізвище', is3Length);
    alert(`Вийшло: ${task4(name, surname)}`);
}

if (confirm('Завдання 5\nДля цілочисельного масиву А, що містить 10 елементів, визначити, чи кратна сума його елементів 7')) {
    const arr = randArr(10);
    alert(task5(arr) ? 'Сума елементів масива кратна 7' : 'Сума елементів масива не кратна 7');
}

if (confirm('Завдання 6\nДана матриця Y (m, n). Знайти стовпець з найбільшою і найменшою сумою елементів')) {
    const m = myPrompt('Введіть кількість рядків', isInt);
    const n = myPrompt('Введіть кількість стовпців', isInt);
    const matrix = randArr(m, n);
    const [maxSum, minSum] = task6(matrix);
    alert(`Максимальна сума елементів: ${maxSum}\nМінімальна сума елементів: ${minSum}`);
}

function task1(a, b) {
    //Вивести на екран більше з двох даних чисел
    return Math.max(a, b);
}

function task2(a) {
    //Поміняти місцями першу і останню цифри числа
    const str = String(a);
    switch (str.length) {
        case 1:
            return str;
        case 2:
            return str[1] + str[0];
        default:
            return str[str.length - 1] + str.substring(1, str.length - 1) + str[0];
    }
}

function task3(str) {
    //Скільки букв "у" в слові стоїть на парних місцях?
    str = str.toLowerCase();
    let acc = 0;
    for (let i = 1; i < str.length; i += 2) {
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
    const sum = a.reduce((previousValue, currentValue) => previousValue + currentValue);
    console.log(sum)
    return sum % 7 === 0;
}

function task6(matrix) {
    //Дана матриця Y (m, n). Знайти стовпець з найбільшою і найменшою сумою елементів
    const sum = [];
    for (let j = 0; j < matrix[0].length; j++) {
        sum[j] = 0;
        for (let i = 0; i < matrix.length; i++) {
            sum[j] += matrix[i][j];
        }
    }
    console.log(sum);
    return [Math.max(...sum), Math.min(...sum)];
}

function randArr(m, n = 1) {
    const arr = [];
    for (let i = 0; i < m; i++) {
        if (n !== 1) {
            arr[i] = [];
            for (let j = 0; j < n; j++) {
                arr[i][j] = Math.floor(Math.random() * 100) - 50;
            }
        } else {
            arr[i] = Math.floor(Math.random() * 100) - 50;
        }
    }
    console.log(arr);
    return arr;
}

function myPrompt(message, conditionFunction = () => {
    return true;
}) {
    let result = String(prompt(message)).trim();
    if (!result || !conditionFunction(result)) {
        return myPrompt('Введіть ще раз', conditionFunction);
    } else {
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
