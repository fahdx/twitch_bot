function insert_id(txt,ids)
{
    token_1="<span"
    token_2=txt.split("<span")[1]
    return token_1 +' id="'+ids+'"' +token_2
}


