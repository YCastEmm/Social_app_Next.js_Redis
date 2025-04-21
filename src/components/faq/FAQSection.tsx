import { FAQPageType } from "@/types/faq.types";
import { FAQCard } from "./FAQCard";

type FAQSectionProps = {
    sections: FAQPageType[]
}


export const FAQSection = ({sections}: FAQSectionProps) => {
    return <section>
                    <h1>Preguntas frecuentes</h1>
                    <div className="grid grid-cols-12 mb-8 gap-4">
                        {sections.map((section, index) =>
                            <FAQCard key={section.slug} label={section.title} href={`/faq${section.slug}`}></FAQCard>
                        )}
                </div>
            </section>
};
