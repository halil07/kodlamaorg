import { createFileRoute, Link } from '@tanstack/react-router'
import { Code2, Sparkles, Heart, Globe, Cpu, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="page-wrap py-10 max-w-4xl mx-auto space-y-12">
      <section className="glass-panel relative rounded-3xl p-8 sm:p-12 overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
          <Code2 className="h-3.5 w-3.5" />
          <span>kodlama.org Vizyonu</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--sea-ink)] tracking-tight">
          Yazılım ve Yapay Zekâyı Herkes İçin Erişilebilir Kılmak
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--sea-ink-soft)] leading-relaxed">
          kodlama.org, Türkiye'deki yazılımcı ve mühendis ekosistemini güçlendirmek, Türkçe nitelikli teknik içeriği artırmak ve yapay zekâ devrimine liderlik edecek nesiller yetiştirmek için kurulmuş bağımsız ve açık bir platformdur.
        </p>
      </section>

      {/* Dictionary Story */}
      <section className="modern-card rounded-2xl p-8 space-y-4">
        <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm">
          <Sparkles className="h-4 w-4" />
          <span>Yapay Zekâ Sözlüğü Projesi Hakkında</span>
        </div>
        <h2 className="text-2xl font-bold text-[var(--sea-ink)]">
          605 Terim, 16 Kategori ve Kapsamlı Teknik Bilgi Bankası
        </h2>
        <p className="text-sm sm:text-base text-[var(--sea-ink-soft)] leading-relaxed">
          Bu sözlük; salt kuru sözlük tanımları yerine, her bir yapay zekâ kavramının ardındaki sezgisel mantığı, matematiksel mekanizmayı, problem çözümlerini ve gerçek dünyadaki kullanım senaryolarını eksiksiz ele alır.
        </p>
        <p className="text-sm sm:text-base text-[var(--sea-ink-soft)] leading-relaxed">
          Klasik Makine Öğrenmesinden başlayarak, Doğal Dil İşleme, Transformer mimarileri, LLM ince ayar yaşam döngüsü, Seyrek mimariler (MoE, SSM/Mamba), Çok modlu modeller, RAG pipeline'ları, Ajan sistemleri, Model sıkıştırma, Donanım mimarileri ve nihayet AGI vizyonuna uzanan 16 kategorilik devasa bir bilgi ağacıdır.
        </p>
        <div className="pt-2">
          <Link
            to="/sozluk"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition shadow-sm"
          >
            <span>Yapay Zekâ Sözlüğü'nü Keşfet</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="modern-card rounded-2xl p-6">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-3">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--sea-ink)]">Nitelikli Türkçe İçerik</h3>
          <p className="text-xs text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
            Terimlerin hem uluslararası orijinal isimlerini hem de Türkçe teknik karşılıklarını sentezleyerek terminoloji birliği sağlıyoruz.
          </p>
        </div>

        <div className="modern-card rounded-2xl p-6">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--sea-ink)]">Derin Teknik Doğruluk</h3>
          <p className="text-xs text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
            Yüzeysel özetler yerine, formüller, algoritmik adımlar ve mimari diyagramlarla konunun özüne odaklanıyoruz.
          </p>
        </div>

        <div className="modern-card rounded-2xl p-6">
          <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-[var(--sea-ink)]">Açık Kaynak Ruhu</h3>
          <p className="text-xs text-[var(--sea-ink-soft)] mt-2 leading-relaxed">
            Topluluğun katkılarıyla büyüyen, sürekli güncellenen ve herkesin ücretsiz faydalanabileceği bir kütüphane.
          </p>
        </div>
      </section>
    </main>
  )
}
