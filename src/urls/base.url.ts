export default function getBaseUrl() {
  const urls = {
    production: 'https://jsonplaceholder.typicode.com',
    development: 'https://jsonplaceholder.typicode.com',
    test: 'https://jsonplaceholder.typicode.com',
  }
  return urls[process.env.NODE_ENV]
}
