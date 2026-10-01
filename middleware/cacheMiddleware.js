const cache = new Map();

const TTL = 60 * 1000; // 1 minute

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl;

    const cachedData = cache.get(key);

    // No cache entry
    if (!cachedData) {
        res.set("X-Cache", "MISS");

        return next();
    }

    const age = Date.now() - cachedData.createdAt;

    // Cache expired
    if (age >= TTL) {
        cache.delete(key);

        res.set("X-Cache", "MISS");

        return next();
    }

    // Cache still valid
    res.set("X-Cache", "HIT");

    return res.json(cachedData.value);
}

function setCache(key, value) {
    cache.set(key, {
        value: value,
        createdAt: Date.now()
    });
}

function clearCache() {
    cache.clear();
}

module.exports = {
    cacheMiddleware,
    setCache,
    clearCache
};