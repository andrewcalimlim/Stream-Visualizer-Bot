const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var matches = msg.content.match(/(!|\w|\]|\[)+/g); 
    // matching a words allowing "!", "[", and "]" in the alphabet too
    
    if (matches != null && matches[0] == "!svb"){
    // if there even is a match and if !svb is called 

        if (matches.length == 2){
        // if one word is matched next to it
            
            var input_string = matches[1];

            var matches_in = input_string.match(/[\[\]LDUR]+/g);

            if (/[\[\]LDUR]+/.test(input_string) && input_string.length == matches_in[0].length){
            // if square bracket notation is in string & the second word is a whole word in the LDUR[] alphabet

                var matches_br = input_string.match(/\[[LDUR]+\]/g);
                //storing multi-arrow rows in a list

                var arrow_input;

                if(matches_br != null){
                // if there are brackets even matched in the string

                    for (i = 0; i < matches_br.length; i++){
                        input_string = input_string.replace(matches_br[i], ".")
                    }
                    // marking each multi-arrow row in input string with a single char
                    // this preserves the row color order (R,G,B,G,R)

                    arrow_input = input_string;
                }
                else{
                    arrow_input = matches[1];
                }

                if(/\[/.test(arrow_input) || /\]/.test(arrow_input)){
                    // if square bracket notation isn't used correctly
                    msg.channel.send("*Error: square bracket notation used incorrectly. Check your input string" + 
                    " to ensure that there are no extra/missing square brackets.*");
                }
                else{
                    // if word matched as valid input
                    // valid input = non-blank word in LDUR alphabet 
                    // and is whole word (first match of regexp is same length as string itself)
                
                    /* MAIN FUNCTIONALITY */

                    var limit = 16;

                    if(arrow_input.length <= limit){
                        output = "";
                        bracket_counter = 0;
                        //keeps track of which multi-arrow row we are looking at

                        for(i = 0; i < arrow_input.length; i++){
                            var current_letter = arrow_input.charAt(i);
                            var current_arrow;

                            var blank_space = "<:bg:582418972700311572>";
                            var output_list = new Array(4).fill(blank_space);
                            //for each bracket row, each column is essentially blank_space
                            // unless specified by an arrow

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
                                        case ".":
                                            if(/L/.test(matches_br[bracket_counter])){
                                                output_list[0] = "<:red_L:582418268321480723>";
                                            }
                                            if(/D/.test(matches_br[bracket_counter])){
                                                output_list[1] = "<:red_D:582418268191457290>";
                                            }
                                            if(/U/.test(matches_br[bracket_counter])){
                                                output_list[2] = "<:red_U:582418268472475658>";
                                            }
                                            if(/R/.test(matches_br[bracket_counter])){
                                                output_list[3] = "<:red_R:582418268468412416>";
                                            }
                                            bracket_counter++;
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
                                        case ".":
                                            if(/L/.test(matches_br[bracket_counter])){
                                                output_list[0] = "<:green_L:582418268074016768>";
                                            }
                                            if(/D/.test(matches_br[bracket_counter])){
                                                output_list[1] = "<:green_D:582418267680014368>";
                                            }
                                            if(/U/.test(matches_br[bracket_counter])){
                                                output_list[2] = "<:green_U:582418268241920035>";
                                            }
                                            if(/R/.test(matches_br[bracket_counter])){
                                                output_list[3] = "<:green_R:582418268141256724>";
                                            }
                                            bracket_counter++;
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
                                        case ".":
                                            if(/L/.test(matches_br[bracket_counter])){
                                                output_list[0] = "<:blue_L:582418267419836417>";
                                            }
                                            if(/D/.test(matches_br[bracket_counter])){
                                                output_list[1] = "<:blue_D:582418267562573854>";
                                            }
                                            if(/U/.test(matches_br[bracket_counter])){
                                                output_list[2] = "<:blue_U:582418267671494669>";
                                            }
                                            if(/R/.test(matches_br[bracket_counter])){
                                                output_list[3] = "<:blue_R:582418267499528204>";
                                            }
                                            bracket_counter++;
                                        break;
                                        default:
                                            current_arrow = "idk";
                                    }
                                break;
        
                                default:
                                    current_arrow = "idk";
                            }
                            
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

                            else if (current_letter == "."){
                                current_line = output_list[0] + " " + output_list[1] +
                                " " + output_list[2] + " " + output_list[3];
                            }
                            //console.log(current_line);
                            output += current_line + "\n";
                            
                        } 
                        msg.channel.send("`Input: " + matches[1] + "`\n");
                        msg.channel.send(output);
                        msg.channel.send("-----------\n*Confused? Type* `!svb help`");
        
                    }
                    else{
                        // word is valid input but longer than the limit
                        msg.channel.send("*Error: Input string cannot represent more than " + limit + " rows\n" + 
                        "(Your output would've been " + arrow_input.length + " rows*)");
                    }
                }


            }

            else if(matches[1] == "help"){
                //help text

                var output = "*~Stream Visualizer Bot - Version 1.1~*\n\n"+
                "This bot visualizes any given 16th stream pattern you give it!\n\n" + 
                "To use this bot, use the command `!svb` and a single string of LDUR characters representing your desired pattern.\n\n" +
                "For example, to see a crossover to the right arrow, you would call `!svb LDR`\n\n" + 
                "**New in V1.1!\n**" +
                "Use [square brackets] to represent jumps/brackets in your string. For example, to see left, down, into a left-right jump" +
                " inside your pattern, call `!svb LD[LR]` \n\n" +
                "NOTE: Your input string can be of any size as long as the output is 16 rows of arrows or less.";

                msg.channel.send(output);
            }

            else if(matches[1] == "opinion"){
                var possible_ops = ["strongly disagree", "disagree", "am neutral towards it", "agree", "strongly agree"];

                var min = 0;
                var max = possible_ops.length;

                var rand_index = Math.floor(Math.random() * (max - min)) + min;
                
                var output = "I " + possible_ops[rand_index] + ".";
                
                msg.channel.send(output);

            }

            else{
                // input is not valid
                msg.channel.send("*Error: Input needs to be in form of LDUR alphabet*\n");
            }

        }
        else{
            // !svb called with multiple inputs
            msg.channel.send("*Error: SV bot must be called with exactly two words, " +
             "\"!svb -your string of LDUR inputs here-\"*");

        }

    }
    
});

client.on('error', console.error);

client.login(auth.token);