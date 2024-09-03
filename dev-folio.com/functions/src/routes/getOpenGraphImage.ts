import { HttpsError, onCall } from 'firebase-functions/v2/https'
import openGraphScraper from 'open-graph-scraper'

import { getUserFromCallableRequest } from '../authentication/getUser'

const getOpenGraphImage = onCall(
  { enforceAppCheck: true },
  async request => {
    const { user } = await getUserFromCallableRequest(request)

    if (!user) throw new HttpsError('permission-denied', 'You are not authenticated')

    const { url } = request.data

    if (!url) throw new HttpsError('invalid-argument', 'You must provide a URL')

    const openGraphData = await openGraphScraper({ url, onlyGetOpenGraphInfo: true })

    return {
      imageUrl: openGraphData.result.ogImage?.[0].url ?? '',
    }
  }
)

export default getOpenGraphImage
