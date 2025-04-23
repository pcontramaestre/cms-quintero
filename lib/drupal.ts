import { NextDrupal } from "next-drupal"

const drupal = new NextDrupal(
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string,
    {
        debug: true,
        withAuth: false
    }
)

export default drupal