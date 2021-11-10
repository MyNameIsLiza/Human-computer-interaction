interface PersonI {
    sayHello(): string;
}

class Person implements PersonI {
    public name: string;

    constructor(name) {
        this.name = name;
    }

    public sayHello(): string {
        return 'It is too cold to say Hello';
    }
}

class Decorator implements PersonI {
    protected person: Person;

    constructor(person: Person) {
        this.person = person;
    }

    public sayHello(): string {
        return this.person.sayHello();
    }
}

class Coat extends Decorator {

    public sayHello(): string {
        return `Hello, thank you for coat`;
    }
}

class Hat extends Decorator {
    public sayHello(): string {
        return `${super.sayHello()}. I have great hat`;
    }
}

let person = new Person('Мирослав');
const addCoat = document.getElementById('addCoat');
const addHat = document.getElementById('addHat');
addCoat.addEventListener('click', () => {
    // @ts-ignore
    person = new Coat(person);
    console.log(person);
    changeImage(person);
    // @ts-ignore
    addCoat.disabled = true;
})

addHat.addEventListener('click', () => {
    // @ts-ignore
    person = new Hat(person);
    console.log(person);
    changeImage(person);
    // @ts-ignore
    addHat.disabled = true;
})

const img = document.getElementById('person');
img.addEventListener('click', () => {
    alert(person.sayHello());
});

function changeImage(person) {
    if (person instanceof Person) {
        // @ts-ignore
        img.src = 'images/person.png'
    } else {
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
