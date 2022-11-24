const { expect } = require('chai')
const chooseYourCar = require('./chooseYourCar')

describe("Test for chooseYourCar", function () {
    describe('Test choosingType', function () {
        it('should return invalid if year is invalid', () => {
            expect(() => chooseYourCar.choosingType('Sedan', 'Red', 1899)).to.throw();
            expect(() => chooseYourCar.choosingType('Sedan', 'Red', 2023)).to.throw();
        })
        it('should throw if car type is invalid', () => {
            expect(() => chooseYourCar.choosingType('Cabriolet', 'Red', 2000)).to.throw();
            expect(() => chooseYourCar.choosingType('ASd', 'Red', 2000)).to.throw();
            expect(() => chooseYourCar.choosingType('Pesho', 'Red', 2000)).to.throw();
        })

        it('happy cases for sedan', () => {
            expect(chooseYourCar.choosingType('Sedan', 'Red', 2000)).to.equal('This Sedan is too old for you, especially with that Red color.');
            expect(chooseYourCar.choosingType('Sedan', 'Red', 2010)).to.equal(`This Red Sedan meets the requirements, that you have.`);
            expect(chooseYourCar.choosingType('Sedan', 'Red', 2011)).to.equal(`This Red Sedan meets the requirements, that you have.`);
        })
    });

    describe('Test brandName', function () {
        it('check input', () => {
            expect(() => chooseYourCar.brandName('BMW, Audi', 1)).to.throw()
            expect(() => chooseYourCar.brandName('BMW, Audi', 'asd')).to.throw()
            expect(() => chooseYourCar.brandName(['BMW', 'Audi'], 'asd')).to.throw()
            expect(() => chooseYourCar.brandName(['BMW', 'Audi'], -1)).to.throw()
            expect(() => chooseYourCar.brandName(['BMW', 'Audi'], 3)).to.throw()
            expect(() => chooseYourCar.brandName(['BMW', 'Audi'], '-1')).to.throw()
            expect(() => chooseYourCar.brandName(['BMW', 'Audi'], '3')).to.throw()
        })

        it('return correct result', () => {
            expect(chooseYourCar.brandName(['BMW', 'Audi'], 1)).to.equal('BMW')
            expect(chooseYourCar.brandName(['BMW', 'Audi', 'Opel'], 1)).to.equal('BMW, Opel')
            expect(chooseYourCar.brandName(['BMW', 'Audi', 'Opel', 'Toyota'], 3)).to.equal('BMW, Audi, Opel')
            
        })
    });

    describe('Test carFuelConsumption', function () {
        it('check input', () => {
            expect(() => chooseYourCar.carFuelConsumption('1', '2')).to.throw()
            expect(() => chooseYourCar.carFuelConsumption(1, '2')).to.throw()
            expect(() => chooseYourCar.carFuelConsumption('1', 2)).to.throw()
            expect(() => chooseYourCar.carFuelConsumption(0, '2')).to.throw()
            expect(() => chooseYourCar.carFuelConsumption('0', 0)).to.throw()
            expect(() => chooseYourCar.carFuelConsumption(-1, '2')).to.throw()
            expect(() => chooseYourCar.carFuelConsumption('0', -1)).to.throw()
            expect(() => chooseYourCar.carFuelConsumption(1, -1)).to.throw()
            expect(() => chooseYourCar.carFuelConsumption(-1, 1)).to.throw()
            expect(() => chooseYourCar.carFuelConsumption(-1, -1)).to.throw()
            expect(() => chooseYourCar.carFuelConsumption(0, 0)).to.throw()
        })

        it('check litersperhkm', () => {
            expect(chooseYourCar.carFuelConsumption(50, 100)).to.equal(`The car burns too much fuel - 200.00 liters!`)
            expect(chooseYourCar.carFuelConsumption(100, 8)).to.equal(`The car burns too much fuel - 8.00 liters!`)
            expect(chooseYourCar.carFuelConsumption(100, 7)).to.equal(`The car is efficient enough, it burns 7.00 liters/100 km.`)
            expect(chooseYourCar.carFuelConsumption(100, 6)).to.equal(`The car is efficient enough, it burns 6.00 liters/100 km.`)

            
        })
    });
});