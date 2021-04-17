
const delay = ms => new Promise(res => setTimeout(res, ms));
let clnt  = new irc_twitch("wss://irc-ws.chat.twitch.tv:443", "yl0sg0db6enrrz86ssgilfs3gq9dxf" ,"iifahdx_", "loltyler1" )
//clnt.print_all();
clnt.connect() 

//("wss://irc-ws.chat.twitch.tv:443" , "oauth:yl0sg0db6enrrz86ssgilfs3gq9dxf" , "iifahdx_");







const chat = document.getElementById("twtch_chat");


const colors = ['#db4424' , '#f7de27', '#2786f7' , '#f727cb','#56f727','#eaf727','#f7279c','#27f1f7']
let  span_start="<span style='color: #db4424;'>"
const span_end= "</span>"

const btn_clean = document.getElementById("clean")
const btn_change = document.getElementById("change_user")
const input_user = document.getElementById("user")
const btn_stop = document.getElementById("stop")




// let client = new tmi.Client({
// 	connection: { reconnect: true },
// 	channels: [ 'mewtru' ]
// });


console.log(client)

function select_color()
{

    color = Math.floor(Math.random() * colors.length); 
    toke_1 = "<span style='color:"

    token_2=";'>"

    span_start=toke_1+colors[color]+token_2

    return span_start
}

console.log(client.connect())

// client.on('message', (channel, tags, message, self) => {
// 	// "Alca: Hello, World!"

    

    
// 	//console.log(`${tags['display-name']}: ${message}`);
// });





function change_user()
{
    temp = input_user.value.trim()

    console.log(temp)


    if (temp !== "")
    {
        console.log("sucessed")

        client.disconnect()

        client = new tmi.Client({
            connection: { reconnect: true },
            channels: [ temp ]
        });

        

        console.log('disconnect')


       

        client.connect()


        console.log(client)

        // client.on('message', (channel, tags, message, self) => {
        //     // "Alca: Hello, World!"
        
        //     span_start=select_color();
        //     let temp = chat.innerHTML+span_start+tags['display-name']+": "+span_end+ message +"<br>"
        //     //temp = tags['display-name']
        //     //console.log(typeof(tags))

        //     //console.log(tags)


        //     chat.innerHTML= temp

            
        //     limit_chat(temp);
        
        //     //console.log(`${tags['display-name']}: ${message}`);
        // });

        
    }
    else
    {
        console.log("not sucessed")
    }
}


let limit_chat = (str)=>
{

    
    ary = str.split("<br>");
    //console.log(str.split("<br>").length)
    l= str.split("<br>").length ;
    if(l> 35)
    {
        
       chat.innerHTML=ary.slice(l-35,l).join("<br>");

    }



    //console.log(str);
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

btn_stop.addEventListener('click',() => {clnt.close()})
btn_clean.addEventListener('click',() =>{chat.innerHTML=""})

btn_change.addEventListener('click',change_user)







// span_start=select_color();
//     let temp = chat.innerHTML+span_start+tags['display-name']+": "+span_end+ message +"<br>"
//     //temp = tags['display-name']
    
//     chat.innerHTML= temp

//     limit_chat(temp);