import { NextDrupal } from "next-drupal"

const drupal = new NextDrupal(
    process.env.NEXT_PUBLIC_DRUPAL_BASE_URL as string,
    {
        // auth: {
        //     username: process.env.DRUPAL_USERNAME as string,
        //     password: process.env.DRUPAL_PASSWORD as string,
        // },
        // debug: true,
        withAuth: false
        //withAuth: true
    }
)

export default drupal