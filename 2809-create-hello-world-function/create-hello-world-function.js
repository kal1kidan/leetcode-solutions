/**
 * @return {Function}
 */
 /*it is about creating a function regardless of the input it return Hello World*/
var createHelloWorld = function() {
    
    return function(...args) {
        return "Hello World";
    }
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */