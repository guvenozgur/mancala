

module.exports.cookieParser = (cookie, token)=>{
    let value;
    cookie.split(";").forEach((val) => {
            if (val.split('=')[0].includes(token)) value = val.split('=')[1]
        }
    )
    return value;
}