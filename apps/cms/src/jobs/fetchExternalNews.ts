import { fetchAndStoreExternalNews } from './runFetchExternalNews.js'

fetchAndStoreExternalNews()
  .then((results) => {
    console.log(JSON.stringify(results, null, 2))
    process.exit(0)
  })
  .catch((error: unknown) => {
    console.error('External news fetch failed:', error)
    process.exit(1)
  })
