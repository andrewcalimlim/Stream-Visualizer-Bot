const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var matches = msg.content.match(/(!|\w)+/g); 
    //matching a word
    
    //console.log(first_match[0]);
    
    if (matches[0] == "!svb"){
    //svb called
        if (matches.length == 2){
        //one word is matched next to it
        
            
            if (/\b[LDUR]+\b/.test(matches[1])){
                // word matched as valid input
                // valid input = non-blank word in LDUR alphabet 

                var arrow_input = matches[1];
                
                /* MAIN FUNCTIONALITY */

                var limit = 32;

                if(arrow_input.length <= limit){
                    output = "";

                    for(i = 0; i < arrow_input.length; i++){
                        var current_letter = arrow_input.charAt(i);
                        var current_arrow;
                        
                        //For every beat
                        switch(i % 4){
                            
                            //Whole beats are red
                            case 0:
                                switch (current_letter){
                                    case "L":
                                        current_arrow = "<:red_L:582418268321480723>";
                                    break;
                                    case "D":
                                        current_arrow = "<:red_D:582418268191457290>";
                                    break;
                                    case "U":
                                        current_arrow = "<:red_U:582418268472475658>";
                                    break;
                                    case "R":
                                        current_arrow = "<:red_R:582418268468412416>";
                                    break;
                                    default:
                                        current_arrow = "idk";
                                }
                            break;
                            
                            // .25 and .75 iteration of beats are green
                            case 1:
                            case 3:
                                switch (current_letter){
                                    case "L":
                                        current_arrow = "<:green_L:582418268074016768>";
                                    break;
                                    case "D":
                                        current_arrow = "<:green_D:582418267680014368>";
                                    break;
                                    case "U":
                                        current_arrow = "<:green_U:582418268241920035>";
                                    break;
                                    case "R":
                                        current_arrow = "<:green_R:582418268141256724>";
                                    break;
                                    default:
                                        current_arrow = "idk";
                                }
                            break;
                            
                            // .5 iterations of beats are blue
                            case 2:
                                switch (current_letter){
                                    case "L":
                                        current_arrow = "<:blue_L:582418267419836417>";
                                    break;
                                    case "D":
                                        current_arrow = "<:blue_D:582418267562573854>";
                                    break;
                                    case "U":
                                        current_arrow = "<:blue_U:582418267671494669>";
                                    break;
                                    case "R":
                                        current_arrow = "<:blue_R:582418267499528204>";
                                    break;
                                    default:
                                        current_arrow = "idk";
                                }
                            break;
    
                            default:
                                current_arrow = "idk";
                        }
                        
                        // emote for black space
                        var blank_space = "<:bg:582418972700311572>";
                        var current_line;
    
                        // organizes each arrow in a pretty, 4 column picture
                        if(current_letter == "L"){
                            current_line = current_arrow + " " +
                            blank_space + " " + blank_space + " " + 
                            blank_space;
                        }
                        else if (current_letter == "D"){
                            current_line = blank_space + " " + current_arrow 
                            + " " + blank_space + " " + blank_space;
                        }
                        else if (current_letter == "U"){
                            current_line = blank_space + " " + blank_space + 
                            " " + current_arrow + " " + blank_space;
                        }
                        else if (current_letter == "R"){
                            current_line = blank_space + " " + blank_space + 
                            " " + blank_space + " " + current_arrow;
                        }
    
                        output += current_line + "\n";
                        
                    } 
                    msg.channel.send("`Input: " + matches[1] + "`\n");
                    msg.channel.send(output);
                    msg.channel.send("-----------\n*Confused? Type* `!svb help`");
    
                }

                else{
                    // word is valid input but longer than the limit
                    msg.channel.send("*Error: Input string can be no more than " + limit + " characters long\n" + 
                    "(Your input was " + arrow_input.length + " characters long*)");
                }
            }

 

            else if(matches[1] == "help"){
                //help text

                var output = "*~Stream Visualizer Bot - Version 1.0~*\n\n"+
                "This bot visualizes any given 16th stream pattern you give it!\n\n" + 
                "To use this bot, use the command `!svb` and a single string of LDUR characters representing your desired pattern.\n\n" +
                "For example, to see a crossover to the right arrow, you would call `!svb LDR`\n\n" + 
                "Note: your input string can be at most 16 characters.";

                msg.channel.send(output);
            }



            // TO DO

            // [] get script running on a server

            // [] potentially add DDR version

            else{
                // input is not valid
                msg.channel.send("*Error: Input needs to be in form of LDUR alphabet*\n");
            }

        }
        else{
            // !svb called with multiple inputs
            msg.channel.send("*Error: SV bot must be called with exactly two words, " +
             "\"!svb [your string of LDUR inputs here]\"*");

        }

    }
    
});

client.login(auth.token);