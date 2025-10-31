/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    if(n === 0) return arr;
    const res =[];
    for(const el of arr){
        if (Array.isArray(el)) res.push(...flat(el, n-1));
        else res.push(el);
    }
    return res;
};