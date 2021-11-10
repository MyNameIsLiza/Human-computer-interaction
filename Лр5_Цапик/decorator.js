var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayHello = function () {
        return 'It is too cold to say Hello';
    };
    return Person;
}());
var Decorator = /** @class */ (function () {
    function Decorator(person) {
        this.person = person;
    }
    Decorator.prototype.sayHello = function () {
        return this.person.sayHello();
    };
    return Decorator;
}());
var Coat = /** @class */ (function (_super) {
    __extends(Coat, _super);
    function Coat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Coat.prototype.sayHello = function () {
        return "Hello, thank you for coat";
    };
    return Coat;
}(Decorator));
var Hat = /** @class */ (function (_super) {
    __extends(Hat, _super);
    function Hat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hat.prototype.sayHello = function () {
        return _super.prototype.sayHello.call(this) + ". I have great hat";
    };
    return Hat;
}(Decorator));
var person = new Person('Мирослав');
var addCoat = document.getElementById('addCoat');
var addHat = document.getElementById('addHat');
addCoat.addEventListener('click', function () {
    // @ts-ignore
    person = new Coat(person);
    console.log(person);
    changeImage(person);
    // @ts-ignore
    addCoat.disabled = true;
});
addHat.addEventListener('click', function () {
    // @ts-ignore
    person = new Hat(person);
    console.log(person);
    changeImage(person);
    // @ts-ignore
    addHat.disabled = true;
});
var img = document.getElementById('person');
img.addEventListener('click', function () {
    alert(person.sayHello());
});
function changeImage(person) {
    if (person instanceof Person) {
        // @ts-ignore
        img.src = 'images/person.png';
    }
    else {
        // @ts-ignore
        if (person instanceof Coat && person.person instanceof Person) {
            // @ts-ignore
            img.src = 'images/personWithCoat.png';
            return;
        }
        // @ts-ignore
        if (person instanceof Hat && person.person instanceof Person) {
            // @ts-ignore
            img.src = 'images/personWithHat.png';
            return;
        }
        // @ts-ignore
        img.src = 'images/personWithHatAndCoat.png';
    }
}
