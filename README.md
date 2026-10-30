# kodlama.org — Web Portalı & Yapay Zekâ Sözlüğü

kodlama.org için geliştirilmiş modern, tam donanımlı web uygulaması ve **Yapay Zekâ Sözlüğü** modülü.

Uygulama, **TanStack Start (SSR)**, **TypeScript** ve **Tailwind CSS** kullanılarak inşa edilmiştir.

---

## 🌟 Öne Çıkan Özellikler

### 1. Yapay Zekâ Sözlüğü (`/sozluk`)
`docs/` klasöründeki 16 kategori ve 605 maddenin tamamı parse edilmiş ve web ortamına aktarılmıştır:
- **16 Uzmanlık Kategorisi:** Klasik ML'den AGI'a, Transformer'lardan RAG ve Robotik'e kadar.
- **Anlık Arama:** İngilizce terim adı, Türkçe karşılığı, açılım ve detaylı tanım üzerinde anlık full-text filtreleme.
- **Detaylı Terim Sayfaları (`/sozluk/:slug`):**
  - Terim ve Açılımı
  - Türkçe Karşılığı
  - Ayrıntılı Tanım
  - Ne İşe Yarar / Çözülen Problem 
  - Nasıl Çalışır? (Teknik & Mekanizma, matematiksel gösterimler)
  - Örnek Senaryo & Pratik Uygulama
  - Benzer Terimlerden Farkı
  - İlişkili Terimler (Tıklanabilir bağlantılar)
- **Kategori & Alfabetik Filtreleme:** A-Z harf çubuğu ve 16 kategori rozeti.
- **Kaydedilenler (Bookmarks):** Beğendiğiniz terimleri LocalStorage ile favorilere kaydetme.
- **Rastgele Terim Keşfet:** Tek tıkla rastgele bir kavrama zıplama özelliği.

### 3. Veritabanı Mimarisi (SQLite & Drizzle ORM)
- Tüm terimler ve kategoriler doğrudan **SQLite** veritabanında (`data/kodlama.db`) saklanır.
- Sunucu tarafında **Drizzle ORM** ve **better-sqlite3** ile tip güvenli sorgular işletilir.
- TanStack Start Server Functions (`createServerFn`) ile veriler istemciye sadece ihtiyaç duyulduğunda hızlıca iletilir; istemci paketine gereksiz dosya yükü bindirilmez.
- Bellek içi önbellekleme (in-memory caching) ile mükemmel SSR ve arama performansı sunulur.

---

## 🚀 Çalıştırma

### Geliştirme Sunucusu (Dev Server)
```bash
npm run dev
```
Tarayıcınızda `http://localhost:3000` adresini açın.

### Üretim Derlemesi (Production Build)
```bash
npm run build
npm run preview
```
