

export function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

export function menuToUri(menu) {
    let finalUri = menu;
    if (menu.indexOf('_') !== -1) {
        let tmpArr = menu.split('_');
        finalUri = tmpArr.join('-');
    }

    return finalUri.toLowerCase();
    
}