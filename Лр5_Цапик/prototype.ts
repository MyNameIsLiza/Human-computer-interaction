const hashCode = function (str) {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

abstract class Person {
    private readonly id: number;
    public firstName: string;
    public lastName: string;

    protected constructor(source) {
        this.id = hashCode(`${source.lastName} ${source.firstName}`);
        this.firstName = source.firstName;
        this.lastName = source.lastName;
    }

    abstract clone(): Person;
}

class Student extends Person {
    public group: string;

    constructor(source: Student) {
        super(source);
        this.group = source.group;
    }

    clone(): Student {
        return new Student(this)
    }
}

const prototypeForm = document.getElementById('prototypeForm');
const lastNameInput = document.getElementById('lastname');
const firstNameInput = document.getElementById('firstname');
const groupInput = document.getElementById('group');
prototypeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // @ts-ignore
    const student = new Student({firstName: firstNameInput.value, lastName: lastNameInput.value, group: groupInput.value});
    console.log(student.clone());
    console.log({...student});
})
