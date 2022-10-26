function handleData()
{
    var form_data = new FormData(document.querySelector("form"));
    console.log("form data: ");
    for(var pair of form_data.entries()) 
    {
        console.log(pair[0]+ ' : '+ pair[1]);
    }
    return true;
}