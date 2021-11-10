interface Strategy {
    calculateExpenses(distance);
}

class PublicTransport implements Strategy {
    private static price = 8;

    calculateExpenses(distance) {
        return distance < 10 ? PublicTransport.price : distance / 10 * PublicTransport.price;
    }
}

class Walking implements Strategy {
    calculateExpenses(distance) {
        return 0;
    }
}

class Taxi implements Strategy {
    private static startPrice = 20;
    private static kmPrice = 3;

    calculateExpenses(distance) {
        return Taxi.startPrice + Taxi.kmPrice * distance;
    }
}

class Context {
    private strategy: Strategy;

    setStrategy(strategy: Strategy) {
        this.strategy = strategy
    }

    executeStrategy(distance) {
        return this.strategy.calculateExpenses(distance)
    }
}

const way = {
    'taxi': new Taxi(),
    'publicTransport': new PublicTransport(),
    'walking': new Walking()
}

const strategyForm = document.getElementById('strategyForm');
const distanceInput = document.getElementById('distance');
const waySelect = document.getElementById('way');
strategyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const context = new Context();
    // @ts-ignore
    context.setStrategy(way[waySelect.value]);
    // @ts-ignore
    const result = context.executeStrategy(distanceInput.value);
    console.log(result)
})
