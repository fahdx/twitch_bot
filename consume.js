


let url = 'https://api.twitch.tv/helix/users?login=loserfruit'
let test  = document.getElementById("test");


function load()
{
    //get_user_info()
    get_set_chat()
}



window.onload = () =>
{
    load()
}



//function to get user info 
//{No} did I process it ? 
//I can get  [id , login name , display_name , description,
// profile image on/off, view_count, created ]
 get_user_info = () =>
{
    let endpoint_user_info = 'https://api.twitch.tv/helix/users?login=tfblade'
    const option = 
    {
        method: 'GET',
        headers:
        {
            'Authorization': 'Bearer wztm1flys99f2i4rzkxw3lhyuofoph',
            'Client-Id': 'lo5kj9k361gsvfgodd6lweyj7j23me',
            'Content-Type': 'application/json'
        }
        
    }
    console.log(option)
    
    fetch(endpoint_user_info ,option).then(bambo => bambo.json())
    .then(function(data)
     {
         console.log(data.data[0])
         console.log(data.data)

        //  for (var k in data.data[1])
        //  {
        //      console.log(k)
        //  }

        console.log(Object.keys(data.data[0]))
         
        test.innerHTML=typeof(data.data[0])
        
        })
}

function get_set_chat()
{
    let c =0
    user='togglebit'
    var sckt= new WebSocket("wss://irc-ws.chat.twitch.tv:443" , "oauth:yl0sg0db6enrrz86ssgilfs3gq9dxf" , "iifahdx_");
    
    sckt.onopen = function (event) {
        console.log(sckt.readyState)
        
        sckt.send("PASS oauth:yl0sg0db6enrrz86ssgilfs3gq9dxf");
        console.log(sckt.readyState)
        sckt.send("NICK iifahdx_");

        console.log(sckt.readyState)
        sckt.send("CAP LS")
        sckt.send("CAP REQ :twitch.tv/tags twitch.tv/commands")
        sckt.send("JOIN #"+user)
        //sckt.send("PRIVMSG #alvin_science_chipmunk : what u doing ?")
        //sckt.send("GLOBALUSERSTATE") 	
      };

      sckt.onmessage = function (event) {


        console.log(event.data);
         ping =event.data.trim()

        console.log(ping)
        console.log(ping === event.data)


        

        console.log(ping === 'PING :tmi.twitch.tv')
        

        if(ping ==='PING :tmi.twitch.tv')
        {
            console.log('this ping number '+c)
            c=c+1
            console.log('ping sent !!')
            sckt.send("PONG :tmi.twitch.tv")
        }
      }

}

