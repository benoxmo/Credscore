const Discord = require('discord.js');
const { fstat, linkSync } = require('fs');
const { relative } = require('path');
const bot = new Discord.Client();

const token = 'ZZZ';
const PREFIX = "!";


bot.on('ready', () =>{
    console.log('this bot is online!');
}) 



bot.on('message', message=>{
   let args = message.content.substring(PREFIX.length).split(" ");
   //let args = argsCasesensitive.toLowerCase();

   
   switch(args[0]){

        
        case 'read':
            
        const embedREAD = new Discord.MessageEmbed()
                        .addField('Some treat-links for Faruk', '[Landing page](https://sourcecred.io/)')
        
        message.channel.send(embedREAD)


        break;

        case 'listen':
           message.channel.send('https://anchor.fm/metagame/episodes/MetaView-E04---Defying-Status-Quo--Building-SourceCred-efc6gq')
        break;

        case 'watch':
            
           message.channel.send('https://www.youtube.com/watch?v=3ZBDiNvddG4')
        break;

        case 'clear':
            if (!args[1]) return message.channel.reply('please define 2nd arg')
            message.channel.bulkDelete(args[1]);
        break;

        
        case 'mycred':

        try{
            const targetNameManual = args[1];

            let credaccount = require('./bdd/bddmeta.json')
            let userlist = credaccount[1].users
            
            let position = userlist.findIndex((a) => a.address.pop()=== targetNameManual)

           

            //let targetid = userlist[1].address

         
                            let myTotalCred = userlist[position].totalCred;
            
                            var lengthArray = userlist[position].intervalCred.length;  
                            
                            let myWeeklyCred = userlist[position].intervalCred
                
                            var variationManual = 100*(myWeeklyCred[lengthArray-1]-myWeeklyCred[lengthArray-2])/myWeeklyCred[lengthArray-2]
                
                

            let embed = new Discord.MessageEmbed()
                            .setColor("#ff3864")
                            .setDescription(" Hello "  + targetNameManual + "! You look nice today") //```\
                
                            .setThumbnail("https://raw.githubusercontent.com/sourcecred/sourcecred/master/src/assets/logo/rasterized/logo_64.png")
                
                
                            .addFields(                        
                        
                                        {
                                            name: "Total",
                                            value: Math.round(myTotalCred) +" Cred",
                                            inline: true,                                                                                                      
                                        },
                                        
                                        {
                                            name: "Last week ",
                                            value: myWeeklyCred[lengthArray-1].toPrecision(3)+" Cred",
                                            inline:true
                                        },
                                        {
                                            name: "Week before",
                                            value: myWeeklyCred[lengthArray-2].toPrecision(4)+" Cred",
                                            inline: true
                                        },
                                        {
                                            name:  "Weekly Change",
                                            value: variationManual.toPrecision(2)+"%",
                                        
                                        },                                              
                
                
                                        );
                                        
                                                                
                       
                                                        
                                                    
                 message.channel.send(embed);
                                         
            
         return console.log(position); } catch { 
                    
            return message.channel.send("Hey, make sure to write this : !mycred *[your github name]* If unsuccessful, try then with discord or discourse name")

        }
    
        break;

          

        case 'welcome':
           
            const welcome = `
            Welcome to the SourceCred Discord! I know bots aren’t advanced enough to have feelings (yet), but I’m still really glad you’re here. I’d love to give you some next steps to connect you with the community and to get you earning Cred! Here are some **commands** to get you started:
           
            - **!read** // Links to all our intro docs
                *includes individual links to all Beta docs*
            - **!listen** // Podcasts on SourceCred
                *includes podcasts on SourceCred (including Metagame one)*
                *will one day include link to calls*
            - **!watch** // Our introduction video explaining SourceCred
            - **!myCred** & *[your name]* // to know your balance and how much you got from the last two weeks
            - **!clear ##** // If this bot gets too noisy, you can erase some of its posts.
        
            
            `
            message.channel.send(welcome)
        break;

    
   }

})

bot.login(token);
