import { FAQSection } from "@/components/faq/FAQSection";
import faqApi from "@/services/faqs/faq.service";



const FAQPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    
    const faqPages = await faqApi.getFAQPages()

    const {slug} = await params

    const faqPage = faqPages.data.find(page => page.slug === `/${slug}`)

    return (
        <main>
            <FAQSection sections={faqPages.data}></FAQSection>
            <section className="flex flex-col">
                <h2>{faqPage?.title}</h2>
                <p>{faqPage?.body[0].children[0].text}</p>
            </section>
        </main>
    );
}


export default FAQPage

