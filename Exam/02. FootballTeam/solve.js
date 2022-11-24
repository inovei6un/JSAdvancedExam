class footballTeam {
    constructor(clubName, country) {
        this.clubName = clubName;
        this.country = country;
        this.invitedPlayers = [];
        this.invitedNames = [];
    }

    newAdditions(footballPlayers) {
        footballPlayers.forEach(el => {
            let [name, age, value] = el.split('/');

            if (this.invitedPlayers.some(el => el.name == name)) {
                let currentPlayer = this.invitedPlayers.find(x => x.name === name);
                if (currentPlayer.value < value) {
                    currentPlayer.value = value;
                }
            }

            let currentPlayer = {
                name,
                age,
                value
            }

            this.invitedPlayers.push(currentPlayer);
            this.invitedNames.push(currentPlayer.name);

        })
        return `You successfully invite ${this.invitedNames.join(', ')}.`
    }

    signContract(selectedPlayer) {
        let name = selectedPlayer.split('/')[0];
        let offer = selectedPlayer.split('/')[1];

        if (!this.invitedPlayers.some(x => x.name == name)) {
            throw new Error(`${name} is not invited to the selection list!`)
        }

        let currentPlayer = this.invitedPlayers.find(x => x.name === name);

        if (Number(offer) < currentPlayer.value) {
            throw new Error(`The manager's offer is not enough to sign a contract with ${name}, ${currentPlayer.value - Number(offer)} million more are needed to sign the contract!`)
        }

        currentPlayer.value = 'Bought'

        return `Congratulations! You sign a contract with ${currentPlayer.name} for ${Number(offer)} million dollars.`
    }

    ageLimit(name, age) {
        if (!this.invitedPlayers.some(x => x.name == name)) {
            throw new Error(`${name} is not invited to the selection list!`)
        }

        let currentPlayer = this.invitedPlayers.find(x => x.name === name);

        if (currentPlayer.age < age) {
            let difference = age - currentPlayer.age
            if (difference < 5) {
                return `${name} will sign a contract for ${difference} years with ${this.clubName} in ${this.country}!`
            } else if (difference > 5) {
                return `${name} will sign a full 5 years contract for ${this.clubName} in ${this.country}!`
            }
        } else if (currentPlayer.age >= age) {
            return `${name} is above age limit!`
        }
    }

    transferWindowResult() {
        let result = '';
        result += `Players list:\n`

        this.invitedPlayers.sort((a, b) => a.name.localeCompare(b.name))

        for (let el of this.invitedPlayers) {
            result += `Player ${el.name}-${el.value}\n`
        }
        return result.trim()
    }
}

let fTeam = new footballTeam("Barcelona", "Spain");
console.log(fTeam.newAdditions(["Kylian Mbappé/23/160", "Lionel Messi/35/50", "Pau Torres/25/52"]));
console.log(fTeam.signContract("Kylian Mbappé/240"));
console.log(fTeam.ageLimit("Kylian Mbappé", 30));
console.log(fTeam.transferWindowResult());


