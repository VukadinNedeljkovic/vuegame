new Vue({
	el: '#app',
	data: {
		fightLog: [],
		players: [
			{
				name: 'Vukadin',
				health: 100,
				baseDmg: 7,
				criticalChance: 15.4,
				critDmgMultiply: 3,
				dodgeChance: 5,
				energy: 0,
				healHealth: 10,
				healCriticalChance: 2,
				specialBase: "energy",
				specialDmg: 3,
				specialName: 'Holy Smite',
				specialCost: 75
			},
			{
				name: 'Fear',
				health: 100,
				baseDmg: 10,
				criticalChance: 18,
				critDmg: 3,
				dodgeChance: 0,
				energy: 0,
				healHealth: 0,
				healCriticalChance: 0,
				specialBase: 'Reversed opposite specialBase',
				specialDmg: 3.2,
				specialName: 'Spook',
				specialCost: 75
			}
		],
		userPlayer: false,
		robotPlayer: false,
		choosed: false
	},
	methods: {
		attack: function(attacker, target) {
			var dodged = chance(target.dodgeChance);
			var dmg = attacker.baseDmg + chance(attacker.criticalChance) * attacker.critDmgMultiply;
			var hitResult = dodged ? 0 : dmg;
			var logResult = !hitResult ? target.name + ' doddged!' : hitResult + ' to ' + taget.name + '!';
			target.health = target.health - hitResult;
			this.fightLog.push(logResult);
		},
		chance: function(chance) {
			return (Math.random() < (chance/100) ? 0 : 1);
		},
		choosePlayer: function(player){
			if(this.userPlayer) {
				this.robotPlayer = player;
				player.choosed = true;
				this.choosed = true;
			} else {
				this.userPlayer = player;
				player.choosed = true;
			}
		}
	},
	mounted: function() {
		for(var i = 0; i <= this.players.length - 1; i++) {
			this.$set(this.players[i], 'showInfo', false);
			this.$set(this.players[i], 'choosed', false);
		}
	},
	created: function (player) {
		// console.log(this.players)
	}
});
