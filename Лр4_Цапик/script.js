function task2() {
    var Student = /** @class */ (function () {
        function Student(surname, name, middle_name, faculty, group) {
            this.id = Student.newId++;
            this.surname = surname;
            this.name = name;
            this.middle_name = middle_name;
            this.faculty = faculty;
            this.group = group;
        }
        Student.newId = 1;
        return Student;
    }());
    var Discipline = /** @class */ (function () {
        function Discipline(id, name) {
            this.id = id;
            this.name = name;
        }
        Discipline.Math = new Discipline(1, 'Math');
        Discipline.Ukrainian = new Discipline(2, 'Ukrainian');
        Discipline.English = new Discipline(3, 'English');
        return Discipline;
    }());
    var MarkType = /** @class */ (function () {
        function MarkType(minScore, maxScore, increase) {
            this.minScore = minScore;
            this.maxScore = maxScore;
            this.increase = increase;
        }
        MarkType.MT1_5 = new MarkType(1, 5, 1);
        MarkType.MT1_12 = new MarkType(1, 12, 1);
        return MarkType;
    }());
    var Mark = /** @class */ (function () {
        function Mark(mark, markType, discipline, student) {
            this.mark = mark;
            this.markType = markType;
            this.discipline = discipline;
            this.student = student;
        }
        Mark.addMark = function (mark) {
            this.marks.push(mark);
        };
        Mark.marksBy = function (by) {
            var lists = {};
            this.marks.forEach(function (item) {
                if (lists[item[by].id]) {
                    lists[item[by].id].marks.push(item);
                }
                else {
                    var o = { marks: [item] };
                    o[by] = item[by];
                    lists[item[by].id] = o;
                }
            });
            return lists;
        };
        Mark.marks = [];
        return Mark;
    }());
    var Liza = new Student('Цапик', 'Єлизавета', 'Романівна', 'ПІ', 181);
    var Ania = new Student('Хуршудян', 'Аня', 'Юріївна', 'ПМ', 192);
    var Roman = new Student('Зейлик', 'Роман', 'Вікторович', 'ПІ', 182);
    var Sasha = new Student('Муштин', 'Олександр', 'Романович', 'ПІ', 211);
    var Olga = new Student('Кулачук', 'Ольга', 'Романівна', 'ПІ', 181);
    var Masha = new Student('Кулачук', 'Марія', 'Романівна', 'КІ', 202);
    var Vania = new Student('Городовий', 'Іван', 'Петрович', 'ПМ', 201);
    var students = [Liza, Ania, Roman, Sasha, Olga, Masha, Vania];
    Mark.addMark(new Mark(5, MarkType.MT1_5, Discipline.Ukrainian, students[0]));
    Mark.addMark(new Mark(5, MarkType.MT1_5, Discipline.Math, students[0]));
    Mark.addMark(new Mark(4, MarkType.MT1_5, Discipline.Math, students[1]));
    Mark.addMark(new Mark(4, MarkType.MT1_12, Discipline.English, students[6]));
    Mark.addMark(new Mark(7, MarkType.MT1_12, Discipline.Ukrainian, students[6]));
    console.log('Marks by students', Mark.marksBy('student'));
    console.log('Marks by discipline', Mark.marksBy('discipline'));
}
//task1();
task2();
