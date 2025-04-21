import { StrapiResultType } from "@/types/strapi.types";
import { FAQPageType } from "@/types/faq.types";
import { strapiGet } from "../common/strapi.service";



class FAQApi {

    // Devuelve una promesa con una página de hashtags (content: TrendingHashtagType[])
    getFAQPages = async () : Promise<StrapiResultType<FAQPageType >> => {
        return strapiGet(`/faq-pages`)
    }  
}


const faqApi = new FAQApi();

export default faqApi