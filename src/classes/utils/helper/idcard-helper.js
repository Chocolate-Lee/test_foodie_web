
export function parseIdcardAge(identityCard) {
    var len = (identityCard + "").length;
    if (len == 0) {
        return '';
    } else {
        if ((len != 15) && (len != 18)) //身份证号码只能为15位或18位其它不合法
        {
            return '';
        }
    }
    var strBirthday = "";
    if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}



export function getAgeFromBirthDay(birthYear, birthMonth, birthDay) {
    let date = new Date();

    let year = date.getFullYear();
 
    let month = date.getMonth() + 1;
    
    let day = date.getDate();

    let age = parseInt(year) - parseInt(birthYear);
    if (month < birthMonth || (month === birthMonth && day < birthDay)) {
        age--;
    } 
   
    return age;
}