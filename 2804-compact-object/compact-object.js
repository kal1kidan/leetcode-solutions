/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    if(Array.isArray(obj))
     return obj.map(compactObject).filter(Boolean);
     if(obj && typeof obj=='object'){
        const res ={};
        for(const k in obj){
            const v = compactObject(obj[k]);
            if(Boolean(v)) res[k] = v;
        }
        return res;
     }
     return obj;
};