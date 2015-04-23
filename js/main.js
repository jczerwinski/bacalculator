angular.module('baculator', [
    'ui.bootstrap'
    ])
.controller('baculatorController', function ($scope) {
    var user = {};
    $scope.user = user;

    user.height = function () { // In metres
        if (this.units === 'metric') return this.height.cm;
        if (this.units === 'imperial') return (this.height.ft*12 + this.height.in) * 2.54;
        return undefined;
    };

    user.weight = function () { // In kilograms
        if (this.units === 'metric') return this.weight.kg;
        if (this.units === 'imperial') return this.weight.lbs*0.453592;
        return undefined;
    };

    user.bac = function () {
        // Calculate BAC here
        var Q;
        var elim = 0.018;
        if (this.sex ==='male') {
            Q = 0.3362*this.weight() + 0.1074*this.height() - 0.09516*this.age + 2.447;
        } else if (this.sex === 'female') {
            Q = 0.2466*this.weight() + 0.1069*this.height() - 2.097;
        }
        // 14 g alcohol per standard drink
        var alc = 14 * this.drinks;
        var C = 0.844*alc/(10*Q) - elim*this.time;
        return Math.max(0,C);
    };

    user.safety = function () {
        // Whether the user is safe to drive. safe if so, danger if not. undefined if cannot determine.
        var safeConc = 0.01;
        if (this.bac() < safeConc) return 'safe';
        if (this.bac() >= safeConc) return 'danger';
        return undefined;
    };

    // Set defaults
    user.sex = 'male';
    user.units = 'imperial';
});
