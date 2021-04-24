const fetch = require("node-fetch");




test_request= (user) =>
{
    console.log('------get_user_info------ demo!!!!')
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



            console.log(mp.get("profile_image_url"))
            console.log(mp.get('id'))

            //img.src=""+mp.get("profile_image_url")
             
            
            
            })
}



//shows cheersemote
test_request_cheer= (user) =>
{
    console.log('------get_user_info------ demo!!!!')
        let endpoint_user_info = 'https://api.twitch.tv/helix/bits/cheermotes?broadcaster_id=57131280'
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
             console.log(data)
             

            let  mp = new Map(Object.entries(data.data[0]))



            console.log(mp.get("profile_image_url"))
            console.log(mp.get('id'))

            //img.src=""+mp.get("profile_image_url")
             
            
            
            })
}

//get game id and name 
// also stream title
test_request_channel= (user) =>
{
    console.log('------get_user_info------ demo!!!!')
        let endpoint_user_info = 'https://api.twitch.tv/helix/channels?broadcaster_id=57131280'
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
             console.log(data)
             

            let  mp = new Map(Object.entries(data.data[0]))



            console.log(mp.get("profile_image_url"))
            console.log(mp.get('id'))

            //img.src=""+mp.get("profile_image_url")
             
            
            
            })
}


// 401 , ofc u cant control others ch. :)
test_request_channels_patch= (user) =>
{
    console.log('------get_user_info------ demo!!!!')
    
    let d={'game_id':'33214', 'title':'there are helicopters in the game? REASON TO PLAY FORTNITE found'}
    d=JSON.stringify(d)
        let endpoint_user_info = 'https://api.twitch.tv/helix/channels?broadcaster_id=57131280'
        const option = 
        {
            method: 'PATCH',
            headers:
            {
                'Authorization': 'Bearer 9pfmyhpoh039a83sbaulsf4qemgbsg',
                'Client-Id': 'lo5kj9k361gsvfgodd6lweyj7j23me',
                'Content-Type': 'application/json'
            },
            
            body:
            
                JSON.stringify({
                    'game_id':'33214',
                     'title':'there are helicopters in the game? REASON TO PLAY FORTNITE found'
                    })
            
            
        }
        //console.log(option)
        
        fetch(endpoint_user_info ,option).then(bambo => bambo.json())
        .then(function(data)
         {
             console.log(data)
             

            let  mp = new Map(Object.entries(data.data[0]))



            console.log(mp.get("profile_image_url"))
            console.log(mp.get('id'))

            //img.src=""+mp.get("profile_image_url")
             
            
            
            })
}


// only for app access not user
test_request_editors= (user) =>
{
    console.log('------get_user_info------ demo!!!!')
        let endpoint_user_info = 'https://api.twitch.tv/helix/channels/editors?broadcaster_id=57131280'
        const option = 
        {
            method: 'GET',
            headers:
            {
                'Authorization': 'Bearer vxeegti6iyyrkgjye4ipurqlh1uh5j',
                'Client-Id': 'lo5kj9k361gsvfgodd6lweyj7j23me',
                'Content-Type': 'application/json'
            }
            
        }
        //console.log(option)
        
        fetch(endpoint_user_info ,option).then(bambo => bambo.json())
        .then(function(data)
         {
             console.log(data)
             

            let  mp = new Map(Object.entries(data.data[0]))



            console.log(mp.get("profile_image_url"))
            console.log(mp.get('id'))

            //img.src=""+mp.get("profile_image_url")
             
            
            
            })
}


test_get_live= (user) =>
{
    console.log('------get_user_info------ demo!!!!')
        let endpoint_user_info = 'https://api.twitch.tv/helix/search/channels?query="'+user+'"&live_only=True'
        const option = 
        {
            method: 'GET',
            headers:
            {
                'Authorization': 'Bearer vxeegti6iyyrkgjye4ipurqlh1uh5j',
                'Client-Id': 'lo5kj9k361gsvfgodd6lweyj7j23me',
                'Content-Type': 'application/json'
            }
            
        }
        //console.log(option)
        
        fetch(endpoint_user_info ,option).then(bambo => bambo.json())
        .then(function(data)
         {
             console.log(data)
             

            let  mp = new Map(Object.entries(data.data[0]))



            console.log(mp.get("profile_image_url"))
            console.log(mp.get('id'))

            //img.src=""+mp.get("profile_image_url")
             
            
            
            })
}
test_get_live('riste')
//test_request_cheer()