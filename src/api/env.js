var baseUrl = '';

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://127.0.0.1/api'
} else {
    baseUrl = 'https://www.haximeishi.com/api'
}

export {
  baseUrl
}
