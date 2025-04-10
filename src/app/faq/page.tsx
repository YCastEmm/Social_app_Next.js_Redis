import { FAQSection } from "@/components/faq/FAQSection";
import faqApi from "@/services/faqs/faq.service";

export default async function FAQPage () {
    
    const faqPages = await faqApi.getFAQPages()

    return (
        <main>
            <FAQSection sections={faqPages.data}></FAQSection>
        </main>
    );
}
