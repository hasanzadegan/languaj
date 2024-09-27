app.service('StorageService', function ($path,$q){
    return {
        getData: function () {
            var storage = {};
            try{
               storage = JSON.parse(localStorage.getItem("__current"));
               if(storage==null)
                   storage={};
            }catch (e) {}
            return storage;
        },
        getConfig: function () {
            var storage = {};
            try{
               storage = JSON.parse(localStorage.getItem("__config"));
               if(storage==null)
                   storage={};
            }catch (e) {}
            return storage;
        },
        setData: function (data) {
            // console.log(JSON.stringify(data));
            localStorage.setItem("__current",JSON.stringify(data));
        },
        setPath: function (data) {
            // console.log(JSON.stringify(data));
            localStorage.setItem("__path",data);
        },
        setConfig: function (data) {
            localStorage.setItem("__config",JSON.stringify(data));
        },
        clear:function () {
            localStorage.removeItem("__current");
            localStorage.removeItem("__config");
            localStorage.removeItem("__path");
        }
    }
});
