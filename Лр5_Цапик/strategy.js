var PublicTransport = /** @class */ (function () {
    function PublicTransport() {
    }
    PublicTransport.prototype.calculateExpenses = function (distance) {
        return distance < 10 ? PublicTransport.price : distance / 10 * PublicTransport.price;
    };
    PublicTransport.price = 8;
    return PublicTransport;
}());
var Walking = /** @class */ (function () {
    function Walking() {
    }
    Walking.prototype.calculateExpenses = function (distance) {
        return 0;
    };
    return Walking;
}());
var Taxi = /** @class */ (function () {
    function Taxi() {
    }
    Taxi.prototype.calculateExpenses = function (distance) {
        return Taxi.startPrice + Taxi.kmPrice * distance;
    };
    Taxi.startPrice = 20;
    Taxi.kmPrice = 3;
    return Taxi;
}());
var Context = /** @class */ (function () {
    function Context() {
    }
    Context.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    Context.prototype.executeStrategy = function (distance) {
        return this.strategy.calculateExpenses(distance);
    };
    return Context;
}());
var way = {
    'taxi': new Taxi(),
    'publicTransport': new PublicTransport(),
    'walking': new Walking()
};
var strategyForm = document.getElementById('strategyForm');
var distanceInput = document.getElementById('distance');
var waySelect = document.getElementById('way');
strategyForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var context = new Context();
    // @ts-ignore
    context.setStrategy(way[waySelect.value]);
    // @ts-ignore
    var result = context.executeStrategy(distanceInput.value);
    console.log(result);
});
