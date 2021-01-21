export default class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    execute(data, target) {
        this.strategy.render(data, target);
    }
}