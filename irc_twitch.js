class irc_twitch
{

    


    constructor(url , oauth , ur_name , boradcaster_name)
    { 
        this.url =url ;
        this.oauth=oauth;
        this.ur_name=ur_name;
        this.boradcaster_name=boradcaster_name;
        //this.sckt=null;
        this.sckt= new WebSocket(this.url ,this.oauth , this.ur_name);
    }


    print_all()
    {
        console.log(this.oauth)
    }



    connect()
    {
        let ping =""
        let str = ""
        let c=0
        let output_chat ="test"
        //let sckt= new WebSocket("wss://irc-ws.chat.twitch.tv:443" , "oauth:yl0sg0db6enrrz86ssgilfs3gq9dxf" , "iifahdx_");
        
        console.log("inside connect oauth: "+this.oauth)


        this.sckt.onopen =  (event) =>{

            console.log("oauth: "+this.oauth)
            console.log(this.sckt.readyState)
            
            this.sckt.send("PASS oauth:"+this.oauth);
            console.log(this.sckt.readyState)
            this.sckt.send("NICK "+this.ur_name);
    
            console.log(this.sckt.readyState)
            this.sckt.send("CAP LS")
            this.sckt.send("CAP REQ :twitch.tv/tags twitch.tv/commands")
            this.sckt.send("JOIN #"+this.boradcaster_name)
            //sckt.send("PRIVMSG #alvin_science_chipmunk : what u doing ?")
            //sckt.send("GLOBALUSERSTATE") 	
          };

          this.sckt.onmessage =  (event) =>{


            //console.log(event.data);


             ping =event.data.trim()
             str = event.data.trim()
            
             if(ping ==='PING :tmi.twitch.tv')
            {
               console.log(ping);
                console.log('ping sent !!')
                this.sckt.send("PONG :tmi.twitch.tv")
            }
            else
            {
                 output_chat =this.process_msg(str, this.boradcaster_name);

                console.log(output_chat.keys().next().value+": "+output_chat.values().next().value)

            
            }

            
          }
        
    
    }

    close()
    {
        console.log(this.boradcaster_name)
        console.log((this.sckt))
        this.sckt.send('PART #'+this.boradcaster_name)
    }
    process_msg(str , b_name)
    {
        let sender_info = new Map();
        let temp  = str.split(";");


        for ( let i =0 ; i<temp.length;i++)
        {
            let key = temp[i].split("=")[0]
            let value = temp[i].split("=")[1]

            //console.log("key:"+key+"- value: "+value);
            sender_info.set(key,value );
        }


        //get username
        let  username=sender_info.get('display-name')


        //get txt
        let txt = sender_info.get('user-type').split("PRIVMSG #"+b_name+" :");
        txt = txt[txt.length-1]

        let u_t = new Map();

        u_t.set(username,txt);


        //console.log(username+": "+txt)
        return u_t
    }



}

