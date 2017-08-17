new Vue({
	el: '#app',
	data: {
		fightLog: [],
		players: [
			{
				name: 'Priest',
				health: 100,
				baseDmg: 7,
				criticalChance: 15.4,
				critDmg: 3,
				dodgeChance: 5,
				energy: 0,
				maxEnergy: 150,
				healHealth: 20,
				healCriticalChance: 2,
				healCost: 5,
				specialDmg: 3,
				specialName: 'Holy Smite',
				specialCost: 75
			},
			{
				name: 'Warlock',
				health: 100,
				baseDmg: 10,
				criticalChance: 18,
				critDmg: 3,
				dodgeChance: 10,
				energy: 0,
				maxEnergy: 170,
				healHealth: 13,
				healCriticalChance: 0,
				healCost: 5,
				specialDmg: 3.2,
				specialName: 'Fear',
				specialCost: 75
			}
		],
		userPlayer: false,
		robotPlayer: false,
		choosed: false,
		fightEnds: false,
		winner: null
	},
	methods: {
		attack: function(attacker, target, special = false) {
			var dodged = this.chance(target.dodgeChance);
			var dmg = attacker.baseDmg + this.chance(attacker.criticalChance) * attacker.critDmg;
			var hitResult = dodged ? 0 : dmg;
			var logResult = hitResult ? `${attacker.name} deals ${hitResult} damage to ${target.name}!` :  `${target.name} doddged!`;
			if (special) {
				attacker.energy -= attacker.specialCost;
				dodge = false;
				dmg = attacker.specialDmg * attacker.baseDmg;
				hitResult = dmg;
				logResult = `${attacker.name} casted ${attacker.specialName} at ${target.name} dealing ${hitResult} damage !`;
			} else {
				attacker.energy += 10;
			}
			target.health = target.health - hitResult;
			this.fightLog.push(logResult);
			this.fightComplete(attacker, target);
			var vm = this;
			setTimeout(function(){
				vm.scrollLog();
			}, 50);
		},
		heal: function(healer, healTarget = healer) {
			healTarget.health += healer.healHealth;
			var targetCheck = healer == healTarget;
			var target = targetCheck ? 'himself' : healTarget.name;
			healer.energy -= healer.healCost;
			if(healTarget.health > healTarget.healthInit) {
				healTarget.health = healTarget.healthInit;
			}
			this.fightLog.push(`${healer.name} healed ${target} by ${healer.healHealth} health!`);
		},
		chance: function(chance) {
			var random = Math.random();
			return (random < (chance/100) ? 1 : 0);
		},
		scrollLog: function() {
			var log = this.$el.querySelector('.log');
			log.scrollTop = log.scrollHeight;
		},
		fightComplete: function(attacker, target) {
			if(target.health <= 0) {
				this.fightEnds = true;
				this.winner = attacker;
				target.health = 0;
				this.fightLog.push(`${attacker.name} kills ${target.name}!`);
			}
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
			this.$set(this.players[i], 'healthInit', this.players[i].health);
			this.$set(this.players[i], 'healthPercent', this.players[i].health/this.players[i].healthInit *100);
		}
	},
	created: function (player) {
		// console.log(this.players)
	}
});
