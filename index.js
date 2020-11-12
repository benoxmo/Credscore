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

   
   switch(args[0]){
      
        case 'mycred':

        try{
            const targetNameManual = args[1];

            let credaccount = require('https://github.com/MetaFam/TheSource/blob/master/scores.json')
            let userlist = credaccount[1].users
            
            let position = userlist.findIndex((a) => a.address.pop()=== targetNameManual)

         
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
                                        
                                                                
                       
                                                        
                                                    
                 message.author.send(embed);
                                         
            
         return console.log(position); } catch { 
                    
            return message.channel.send("Hey, make sure to write this : !mycred *[your github name]* If unsuccessful, try then with discord or discourse name")

        }
    
        break;    
   }

})

bot.login(token);
