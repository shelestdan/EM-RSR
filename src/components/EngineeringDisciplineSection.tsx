import ScrollReveal from '@/components/ScrollReveal'
import { workflow } from '@/lib/site-data'

export default function EngineeringDisciplineSection() {
  return (
    <section className="section section-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <ScrollReveal>
            <h2 className="section-title leading-[1]">Инженерная дисциплина вместо подрядного шума</h2>
          </ScrollReveal>
          <ScrollReveal className="reveal-delay-1">
            <p className="body-large max-w-[560px]">
              Мы не продаём «от». Стоимость, сроки и состав работ определяются после анализа объекта, исходных данных и требуемого результата.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-px bg-[#d9d6cb] lg:grid-cols-3">
          {workflow.map((step, index) => (
            <ScrollReveal key={step.title} className={`reveal-delay-${index + 1}`}>
              <div className="group flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-[#f6f5f1] sm:p-10">
                <h3 className="font-brand text-[26px] font-black leading-tight text-[#23273F]">
                  {step.title}
                </h3>
                <p className="mt-5 text-[15px] leading-[1.78] text-[#626675]">
                  {step.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
