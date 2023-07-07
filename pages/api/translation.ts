import type { NextApiRequest, NextApiResponse } from "next";

const translations = {
  en: {
    account: { account_details_button: "Account details" },
    blog: { blog_label: "Blog" },
    cart: { cart_label: "Cart" },
    sort_labels: { by_date: "newest first" },
  },
  fr: {
    account: { account_details_button: "Détails du compte" },
    blog: { blog_label: "Blogue" },
    cart: { cart_label: "Panier" },
    sort_labels: { by_date: "plus récent en premier" },
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [key: string]: any }>
) {
  const { lang } = req.query;

  if (!lang || (lang !== "en" && lang !== "fr"))
    return res.status(400).json({ error: "Missing lang query parameter" });

  res.status(200).json(translations[lang]);
}
