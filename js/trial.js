function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&}' + name + '(=([^&#]*)|&#|$)'),
        resuls = regex.exec(url);
        if (!resuls) return null;
        if (!resuls[2]) return '';
        return decodeURIComponent(resuls[2].replace(/\+/g, ' '));
}

var TestName = getParameterByName('namer');
console.log(TestName);