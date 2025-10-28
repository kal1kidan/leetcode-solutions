var TimeLimitedCache = function() {
    this.cache = new Map();
    this.timers = new Map(); // key -> { id: TimeoutID, expiry: timestamp(ms) }
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const now = Date.now();
    const existing = this.timers.get(key);
    const existed = existing && existing.expiry > now;

    // clear previous timeout if any
    if (existing) {
        clearTimeout(existing.id);
    }

    const expiry = now + duration;
    const timerId = setTimeout(() => {
        this.cache.delete(key);
        this.timers.delete(key);
    }, duration);

    this.cache.set(key, value);
    this.timers.set(key, { id: timerId, expiry });

    return !!existed;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    const now = Date.now();
    const timer = this.timers.get(key);
    if (timer && timer.expiry > now && this.cache.has(key)) {
        return this.cache.get(key);
    }
    return -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    const now = Date.now();
    let count = 0;
    for (const [key, timer] of this.timers) {
        if (timer.expiry > now && this.cache.has(key)) count++;
    }
    return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
