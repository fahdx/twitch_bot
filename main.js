


let marked = new Map()
var boradcaster_name;





const colors = ['#db4424' , '#f7de27', '#2786f7' , '#f727cb','#56f727','#eaf727','#f7279c','#27f1f7']
let  span_start="<span style='color: #db4424;'>"
const span_end= "</span>"

let gl_mp = ''


const chat = document.getElementById("twtch_chat");
const btn_clean = document.getElementById("clean")
const btn_change = document.getElementById("change_user")
const input_user = document.getElementById("user")
const btn_stop = document.getElementById("stop")
const img = document.getElementById("profile");
const chatting = document.getElementById("chatting")
const table = document.getElementById("table2")



console.log('table exist? '+table)


function insert_id(txt,ids)
{
    token_1="<span"
    token_2=txt.split("<span")[1]
    //console.log(token_2)
    //console.log(token_1 +' class="'+ids+'" onClick="test("this.'+ids+'")"' +token_2)
    return token_1 +' id="'+ids+'" class="'+ids+'1" onClick="set_mark(this.id)"' +token_2
    
}


function insert_id_for_text(txt,ids)
{
    token_1="<span"
    token_2=txt.split("<span")[1]
    //console.log(token_2)
    //console.log(token_1 +' class="'+ids+'" onClick="test("this.'+ids+'")"' +token_2)
    return '<span id="'+ids+'" class="'+ids+'_t" onClick="set_mark(this.id)">' +txt+'</span>'
    
}

function select_color()
{

    color = Math.floor(Math.random() * colors.length); 
    toke_1 = "<span style='color:"

    token_2=";'>"

    span_start=toke_1+colors[color]+token_2

    return span_start
}




function change_user()
{
    new_user = input_user.value.trim()
    //this.boradcaster_name=temp


    console.log(new_user)


    if (new_user !== "")
    {
        

        close();
        console.log("sucessed")
       
        connect("wss://irc-ws.chat.twitch.tv:443", "yl0sg0db6enrrz86ssgilfs3gq9dxf" ,"iifahdx_", new_user )
        get_user_info(new_user)

        
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





function connect(url , oauth , ur_name,boradcaster_name)
{
        this.url =url ;
        this.oauth=oauth;
        this.ur_name=ur_name;
        this.boradcaster_name=boradcaster_name;
        
        this.sckt= new WebSocket(this.url);

        let ping =""
        let str = ""
        let c=0
        let output_chat ="test"
        //let sckt= new WebSocket("wss://irc-ws.chat.twitch.tv:443" , "oauth:yl0sg0db6enrrz86ssgilfs3gq9dxf" , "iifahdx_");
        
        console.log("inside connect oauth: "+this.oauth)


        this.sckt.onopen =  (event) =>
        {
            console.log('-------on open function-----------')

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

          this.sckt.onmessage =  (event) =>
          {


            //console.log('----------on meesage function--------------');


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

                //console.log(output_chat.keys().next().value+": "+output_chat.values().next().value)

                span_start=select_color();
                span_start=insert_id(span_start,output_chat.keys().next().value);
                new_txt=insert_id_for_text(output_chat.values().next().value,output_chat.keys().next().value)


                let temp = chat.innerHTML+span_start+output_chat.keys().next().value+": "+span_end+new_txt+"<br>"

                chat.innerHTML= temp

                if(marked.has(output_chat.keys().next().value))
                {
                    force_mark(output_chat.keys().next().value)
                }
                
                limit_chat(temp);

            
            }

            
          }
        

}

function close()
    {
        console.log('--------close---------------')
        //console.log(this.boradcaster_name)
        //console.log((this.sckt))
        this.sckt.send('PART #'+boradcaster_name)
    }
function process_msg(str , b_name)
    {
        //console.log('-----------------process msg-------------')
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


        return u_t;
    }


    function send_msg(e)
    {
        console.log('-------------send msg-------------')
         if(e.key === 'Enter') 
        {
            console.log('inside if ')
            console.log("PRIVMSG #"+boradcaster_name+" : "+chatting.value.trim())
            sckt.send("PRIVMSG #"+boradcaster_name+" : "+chatting.value.trim())
            chatting.value=""

        }
    }


    function send_user(e)
    {
        
        if(e.key=='Enter')
        {
            change_user()
        }
    }





    get_user_info = (user) =>
    {
        console.log('------get_user_info------')
        let endpoint_user_info = 'https://api.twitch.tv/helix/users?login='+user
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
        //console.log(option)
        
        fetch(endpoint_user_info ,option).then(bambo => bambo.json())
        .then(function(data)
         {
             console.log(data.data[0])
             

            let  mp = new Map(Object.entries(data.data[0]))

            gl_mp = new Map(Object.entries(data.data[0]))



            console.log(mp.get("profile_image_url"))

            img.src=""+mp.get("profile_image_url")

            add_table_content(mp)

             
            
            
            })
    }


 function set_mark(id)
{
    
    console.log(id)
    console.log(document.getElementsByClassName(id+'_t')[0].innerHTML)

    var list = document.getElementsByClassName(id+'_t');

    if(list[0].innerHTML.includes('<mark>'))
    {
        for (var i = 0; i < list.length; i++) {
            console.log(list[i])
            
            list[i].innerHTML=list[i].innerHTML.replace("<mark>","");
            list[i].innerHTML=list[i].innerHTML.replace("</mark>","")

           }
           marked.delete(id)
    }
    else
    {
        for (var i = 0; i < list.length; i++) {
            console.log(list[i])
            
            list[i].innerHTML="<mark>"+list[i].innerHTML+"</mark>"

           
           }
           marked.set(id , true)
    }

    
}

function force_mark(id)
{
    console.log("-------force mark--------------")
    
    console.log(id)
    console.log(document.getElementsByClassName(id+'_t')[0].innerHTML)

    var list = document.getElementsByClassName(id+'_t');

    
    
        for (var i = 0; i < list.length; i++) 
        {
            
            console.log(list[i].innerHTML)

            if(!(list[i].innerHTML.includes('<mark>')))
            {
                console.log(" inside if")
                list[i].innerHTML="<mark>"+list[i].innerHTML+"</mark>"
            }
            
        }

        if(!(marked.has(id )))
        {
            console.log("inside with id: "+id)
            marked.set(id , true)
        }
           
    

    
}

add_table_content =(mp) =>
{
    console.log('----------------------------add_table_content function----------------------')
    console.log(mp)
    
    
    let txt=''//'<table>'
    console.log(table)

    for(let [key , value] of mp)
    {

        if(value!=='')
        {
            console.log(key+' = '+value)

            txt += '<tr>'
            txt+= '<th>'
            txt+= key
            txt+='</th>'
            txt+='<td>'
            txt+=value
            txt+='</td>'
            txt+='</tr>'
        }
        else{
            console.log('skip')
        }
        // console.log(key)
        // console.log(value)
    }

    //txt+='</table>'

    table.innerHTML=txt 
}

connect("wss://irc-ws.chat.twitch.tv:443", "yl0sg0db6enrrz86ssgilfs3gq9dxf" ,"iifahdx_", "teej_dv" )
btn_stop.addEventListener('click',() => {close()})
btn_clean.addEventListener('click',() =>{chat.innerHTML=""})
btn_change.addEventListener('click',change_user)
chatting.addEventListener('keypress' , send_msg)
input_user.addEventListener('keypress',send_user)




