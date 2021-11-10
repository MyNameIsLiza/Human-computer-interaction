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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var hashCode = function (str) {
    var hash = 0, i, chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
var Person = /** @class */ (function () {
    function Person(source) {
        this.id = hashCode(source.lastName + " " + source.firstName);
        this.firstName = source.firstName;
        this.lastName = source.lastName;
    }
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(source) {
        var _this = _super.call(this, source) || this;
        _this.group = source.group;
        return _this;
    }
    Student.prototype.clone = function () {
        return new Student(this);
    };
    return Student;
}(Person));
var prototypeForm = document.getElementById('prototypeForm');
var lastNameInput = document.getElementById('lastname');
var firstNameInput = document.getElementById('firstname');
var groupInput = document.getElementById('group');
prototypeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // @ts-ignore
    var student = new Student({ firstName: firstNameInput.value, lastName: lastNameInput.value, group: groupInput.value });
    console.log(student.clone());
    console.log(__assign({}, student));
});
