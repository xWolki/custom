(function () {

    // Change this to your GitHub username so you don't have to modify so many things.
    var fork = "xWolki";

    // Define our function responsible for extending the bot.
    function extend() {
        // If the bot hasn't been loaded properly, try again in 1 second(s).
        if (!window.bot) {
          return setTimeout(extend, 1 * 1000);
        }

        // Precaution to make sure it is assigned properly.
        var bot = window.bot;

        // Load custom settings set below
        bot.retrieveSettings();

        //Extend the bot here, either by calling another function or here directly.

        // You can add more spam words to the bot.
        var spamWords = ['spam1', 'spam2', 'spam3', 'spam4'];
        for (var i = 0; i < spamWords.length; i++) {
          window.bot.chatUtilities.spam.push(spamWords[i]);
        }

        // Example code for a bot command:
        bot.commands.baconCommand = {
            command: 'bacon',  // The command to be called. With the standard command literal this would be: !bacon
            rank: 'user', // Minimum user permission to use the command
            type: 'exact', // Specify if it can accept variables or not (if so, these have to be handled yourself through the chat.message
              functionality: function (chat, cmd) {
                if (this.type === 'exact' && chat.message.length !== cmd.length) return void (0);
                if (!bot.commands.executable(this.rank, chat)) return void (0);
                else {
                  API.sendChat("EOQ");
                }
              }
            };

        // Load the chat package again to account for any changes
        bot.loadChat();

      
if (API.getUser().role > 2){
	var ss_attr = {
			control : [],
			sid : null,
			sson : true,
			lang : 'pt'
		},
		ed_attr = {
			edon : true
		},
		bots_attr = {
			botson : true
		},
		all = {
			request : function(bot,bn,obj,msg){
				$.ajax({
					url : 'https://bots-caipira.rhcloud.com',
					method: 'POST',
					data : {bot:bot,msg : msg}
				})
				.done(function(data){
					all.response(obj,bn,data);
				})
				.error(function() {
					console.log('Erro ao enviar request.');
				});
			},
			response : function(obj,type, msg){
				try{
					API.sendChat('['+type+' > @' + obj.un + '] ' + JSON.parse(msg).resp.replace(/<\/?[^>]+(>|$)/g, ""));
				}catch(e){}
			}
		},
		ed = {
			response : function(obj, msg){
				if ( msg.data.toLowerCase().indexOf('seu ip é') != -1 )
					return API.sendChat('[Ed > @' + obj.un + '] Resposta bloqueada: IP do host');

				API.sendChat('[Ed > @' + obj.un + '] ' + msg.data.replace(/<\/?[^>]+(>|$)/g, ""));
			},	
			ed : function(obj){
				if ( API.getUser(obj.uid).role > 2 && obj.message.indexOf('!edoff') != -1 ){
					ed_attr.edon = false;
					return API.sendChat('Ed chat desativado');
				}
				if ( API.getUser(obj.uid).role > 2 && obj.message.indexOf('!edon') != -1 ){
					ed_attr.edon = true;
					return API.sendChat('Ed chat ativado');
				}
				if ( ed_attr.edon && obj.message.toLowerCase().indexOf('!ed') == 0 )
					all.request('ed','Ed',obj,obj.message.substring(4));
			}
		},
		ss = {
			response : function(obj, msg){
				if ( msg.result != 200 )
					return API.sendChat('[SimSimi erro: ' + msg.result + ' - ' + msg.msg + ', ' + msg.sentence_resp +']');
					
				API.sendChat('[SimSimi (' + msg.lang.nc.toUpperCase() + ') > @' + obj.un + '] ' + msg.sentence_resp);
			},
			ss : function(obj){
				if ( ss_attr.control.indexOf(obj.cid) != -1 )
					return;
				
				if ( ss_attr.control.length > 10 )
					ss_attr.control.splice(0,1);
					
				ss_attr.control.push(obj.cid);
				
				if ( API.getUser(obj.uid).role > 2 && obj.message.indexOf('!ssoff') != -1 ){
					ss_attr.sson = false;
					return API.sendChat('SimSimi chat desativado');
				}
				if ( API.getUser(obj.uid).role > 2 && obj.message.indexOf('!sson') != -1 ){
					ss_attr.sson = true;
					return API.sendChat('SimSimi chat ativado');
				}
				if ( ss_attr.sson && obj.message.toLowerCase().indexOf('!ss') == 0 ){
					all.request('ss','SimSimi',obj,obj.message.substring(4));
				}
			}
		};

	function bots(obj){
		if ( API.getUser(obj.uid).role > 2 && obj.message.indexOf('!botsoff') != -1 ){
			bots_attr.botson = false;
			return API.sendChat('Bots chat desativado');
		}
		if ( API.getUser(obj.uid).role > 2 && obj.message.indexOf('!botson') != -1 ){
			bots_attr.botson = true;
			return API.sendChat('Bots chat ativado');
		}
		if ( !bots_attr.botson )
			return;
			
		if ( obj.message.toLowerCase().indexOf('!ed') == 0 )
			ed.ed(obj);
		else{
			if ( obj.message.toLowerCase().indexOf('!ss') == 0 )
				ss.ss(obj);
			else{
				if ( obj.message.toLowerCase().indexOf('!langss') == 0 ){
					ss_attr.lang = obj.message.substring(8);
					API.sendChat('Idioma do SimSimi definido, caso existir: ' + ss_attr.lang.toUpperCase());
				}
			}
		}
	}
	
	API.on(API.CHAT, bots);
	API.sendChat('/me SimSimi e Ed ativados');
}else{
	API.chatLog('Ed Bot e SimSimi Bot somente podem ser ativados por coordenadores ou superior.', true);
}

    //Change the bots default settings and make sure they are loaded on launch

    localStorage.setItem("basicBotsettings", JSON.stringify({
      botName: "EletroBot",
      language: "portuguese",
      chatLink: "https://rawgit.com/xWolki/source/master/lang/en.json",
      scriptLink: "https://rawgit.com/xWolki/source/master/basicBot.js",
      roomLock: false, // Requires an extension to re-load the script
      startupCap: 1, // 1-200
      startupVolume: 0, // 0-100
      startupEmoji: false, // true or false
      autowoot: true,
      autoskip: false,
      smartSkip: true,
      cmdDeletion: false,
      maximumAfk: 120,
      afkRemoval: true,
      maximumDc: 60,
      bouncerPlus: true,
      blacklistEnabled: true,
      lockdownEnabled: false,
      lockGuard: false,
      maximumLocktime: 10,
      cycleGuard: true,
      maximumCycletime: 10,
      voteSkip: false,
      voteSkipLimit: 10,
      historySkip: false,
      timeGuard: true,
      maximumSongLength: 10,
      autodisable: true,
      commandCooldown: 30,
      usercommandsEnabled: true,
      skipPosition: 3,
      skipReasons: [
      ["theme", "This song does not fit the room theme. "],
      ["op", "This song is on the OP list. "],
      ["history", "This song is in the history. "],
      ["mix", "You played a mix, which is against the rules. "],
      ["sound", "The song you played had bad sound quality or no sound. "],
      ["nsfw", "The song you contained was NSFW (image or sound). "],
      ["unavailable", "The song you played was not available for some users. "]
      ],
      afkpositionCheck: 15,
      afkRankCheck: "ambassador",
      motdEnabled: false,
      motdInterval: 5,
      motd: "Menssagem temporaria do dia!",
      filterChat: true,
      etaRestriction: false,
      welcome: true,
      opLink: null,
      rulesLink: null,
      themeLink: null,
      fbLink: "https://www.facebook.com/groups/1607726482889466/",
      youtubeLink: null,
      website: null,
      intervalMessages: [],
      messageInterval: 5,
      songstats: true,
      commandLiteral: "!",
      blacklists: {
        NSFW: "https://rawgit.com/xWolki/custom/master/blacklists/NSFWlist.json",
        OP: "https://rawgit.com/xWolki/custom/master/blacklists/OPlist.json",
        BANNED: "https://rawgit.com/xWolki/custom/master/blacklists/BANNEDlist.json"
      }
    }));

    // Start the bot and extend it when it has loaded.
    $.getScript("https://rawgit.com/xWolki/source/master/basicBot.js", extend);

}).call(this);
