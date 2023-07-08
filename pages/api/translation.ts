import type { NextApiRequest, NextApiResponse } from "next";
import enAccount from './locales/en/account.json'
import enBlog from './locales/en/blog.json'
import enCart from './locales/en/cart.json'
import enSortLabels from './locales/en/sort_labels.json'
import frAccount from './locales/fr/account.json'
import frBlog from './locales/fr/blog.json'
import frCart from './locales/fr/cart.json'
import frSortLabels from './locales/fr/sort_labels.json'

const translations = {
  en: {
    account: enAccount,
    blog: enBlog,
    cart: enCart,
    sort_labels: enSortLabels
  },
  fr: {
    account: frAccount,
    blog: frBlog,
    cart: frCart,
    sort_labels: frSortLabels
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [key: string]: any }>
) {
  const lngs = (req.query.lng as string).split(' ')
  const nss = (req.query.ns as string).split(' ')
  const ret = new Map()
  for (const lng of lngs) {
    if (!ret.get(lng)) ret.set(lng, {})
    const lngMap = ret.get(lng)
    for (const ns of nss) {
      const lngNs = translations[lng as keyof typeof translations]
      lngMap[ns as keyof typeof lngNs] = lngNs
    }
  }
  res.status(200).json(Object.fromEntries(ret))
}
