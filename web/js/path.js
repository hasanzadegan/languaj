// const actionUrl = location.protocol + '//' + location.hostname +':3308';
const actionUrl = location.protocol + '//' + location.hostname +'';
// console.log(actionUrl);
function getRand() {
    return Math.random();
}

app.constant('$path',
    {
        url: actionUrl
    }
);
