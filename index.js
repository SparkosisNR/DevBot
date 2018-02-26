const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Blague = require('./commands/blague')
const Role = require('./commands/role')
const Whatis = require('./commands/whatis')
const Docs = require('./commands/docs')
const moment = require('moment')

moment.locale('fr', {
            months : 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split('_'),
            monthsShort : 'Janv._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.'.split('_'),
            monthsParseExact : true,
            weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
            weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
            weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
            weekdaysParseExact : true,
            longDateFormat : {
                LT : 'HH:mm',
                LTS : 'HH:mm:ss',
                L : 'DD/MM/YYYY',
                LL : 'D MMMM YYYY',
                LLL : 'D MMMM YYYY HH:mm',
                LLLL : 'dddd D MMMM YYYY HH:mm'
            },
            calendar : {
                sameDay : '[Aujourd’hui à] LT',
                nextDay : '[Demain à] LT',
                nextWeek : 'dddd [à] LT',
                lastDay : '[Hier à] LT',
                lastWeek : 'dddd [dernier à] LT',
                sameElse : 'L'
            },
            relativeTime : {
                future : 'dans %s',
                past : 'il y a %s',
                s : 'quelques secondes',
                m : 'une minute',
                mm : '%d minutes',
                h : 'une heure',
                hh : '%d heures',
                d : 'un jour',
                dd : '%d jours',
                M : 'un mois',
                MM : '%d mois',
                y : 'un an',
                yy : '%d ans'
            },
            dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
            ordinal : function (number) {
                return number + (number === 1 ? 'er' : 'e');
            },
            meridiemParse : /PD|MD/,
            isPM : function (input) {
                return input.charAt(0) === 'M';
            },
            // In case the meridiem units are not separated around 12, then implement
            // this function (look at locale/id.js for an example).
            // meridiemHour : function (hour, meridiem) {
            //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
            // },
            meridiem : function (hours, minutes, isLower) {
                return hours < 12 ? 'PD' : 'MD';
            },
            week : {
                dow : 1, // Monday is the first day of the week.
                doy : 4  // The week that contains Jan 4th is the first week of the year.
            }
        });
        moment.locale('fr');

bot.on('ready', function() {
	console.log('Bot connecté')
	bot.user.setGame('coder du sale | d?help').catch(console.error)
})


//guildMemebrAdd
bot.on('guildMemberAdd', function(member) {

	member.guild.channels.find("name", "general").sendMessage(member.toString() + ' Bienvenue dans le serveur ' + '**' + member.guild.name + '**' + ' utilisez la commande d?all_roles pour les roles que vous souhaitez ajouter, *__n\'oubliez pas de lire le reglement__*');

	member.addRole(member.guild.roles.find("name", "Membre"));

})


//Message
bot.on('message', function(message) {

	Google.parse(message)

	Blague.parse(message)

	Role.parse(message)

	Whatis.parse(message)

	Docs.parse(message)

	if(message.content === 'd?help') {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.addField("Toutes les commandes du bot", "d?google\nFaire une recherche google et obtenir le lien de la recherche\n\nd?stats\nToutes les informations a savoir sur le serveur\n\nd?blague\nLe bot t'affiche une blague\n\nd?role -[ex: dev] ou d?role --[ex: dev] pour retirer le role\nCommande qui permet d'ajouter ou de retirer un role pour voir tous les roles dispos entrer la commande d?all_roles\n\nd?all_roles\nCommande qui permet d'afficher tous les roles disponibles\n\nd?whatis [front-end, back-end ou full-stack]\nCommande qui permet de savoir la signification de front-end, back-end ou full-stack\n\nd?game [phrase pour savoir si elle est vraie ou fausse\nCommande pour lancer le jeu vrai ou faux\n\nd?gitdevbot\nCommande qui permet d'obtenir le lien du github du bot\n\nd?apropos\nCommande pour connaitre quelques informations a propos du bot\n\nd?doc\nCommande qui permet d'obtenir le lien de docs de languages de programmation (ou pas)")
		message.channel.send(embed).catch(console.error)

	} else if(message.content === 'd?stats') {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.addField('Statistiques du serveur DevHack', 'Il y a actuellement ' + '**' + message.guild.channels.size + '**' +' channels dans ce serveur \nIl y a exactement ' + '**' + message.guild.members.size + '**' + ' membres dans ce serveur\nLe serveur a été crée le: ' + '**' + moment(message.guild.createdAt).format('DD MMM YYYY') + '** \nJe suis present dans ' + '**' + bot.guilds.size + '**' + ' serveurs')
		message.channel.send(embed).catch(console.error)
	
	}  else if(message.content === 'd?all_roles') {

		var embed = new Discord.RichEmbed()
		.setColor("#226666")
		.addField("Tous les roles disponibles", "-Développeur ->  d?role -dev\n-Youtubeur ->      d?role -youtubeur\n-Hacker ->           d?role -hacker\n-Graphiste ->     d?role -graphiste\n-Rédacteur ->    d?role -redacteur\n-Front-end ->      d?role -frontend\n-Back-end ->      d?role -backend\n-Full-stack ->      d?role -fullstack\n-Gamer->           d?role -gamer")
		message.channel.send(embed).catch(console.error)

	} else if(message.content.startsWith('d?game')) {

		let randnum_game = Math.floor(Math.random() * 2)

		if (randnum_game == 0) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription("Vrai :wink:")
			.setFooter('Jeu du vrai ou faux')
			message.channel.send(embed).catch(console.error)

		} else if(randnum_game == 1) {

			var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription("Faux :wink:")
			.setFooter('Jeu du vrai ou faux')
			message.channel.send(embed).catch(console.error)
		}
	} else if(message.content === 'd?gitdevbot') {
		message.reply('Voila le repos github du bot DevBot: https://github.com/karim-vapor/DevBot/')
	}  else if(message.content === 'd?apropos') {

		var embed = new Discord.RichEmbed()
			.setColor("#226666")
			.setDescription("Le développeur du bot: **K A R I M**\nSite web: https://devhack.fr.nf\nHébergeur: **Heroku**\nTwitter: https://twitter.com/karim_uchiwa")
			.setFooter('A propos du bot')
			message.channel.send(embed).catch(console.error)
		
	} 
	
})


bot.login(process.env.TOKEN);
