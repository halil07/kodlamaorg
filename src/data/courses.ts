import type { Course } from './types'

export const COURSES: Course[] = [
  {
    id: 'llm-agent-architectures',
    title: 'Büyük Dil Modelleri (LLM) & Ajan Mimarileri Uzmanlığı',
    instructor: 'Yapay Zekâ Ekibi',
    level: 'İleri',
    duration: '14 Hafta',
    studentsCount: 3840,
    rating: 4.9,
    category: 'Yapay Zekâ',
    description: 'Transformer temellerinden RAG pipeline yapısına, LoRA ince ayardan otonom LangChain & LlamaIndex ajanlarına uçtan uca modern LLM mühendisliği.',
    tags: ['LLM', 'RAG', 'LangChain', 'Transformers', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    isNew: true,
    isPopular: true
  },
  {
    id: 'modern-fullstack-typescript',
    title: 'Modern Full-Stack Web Geliştirme (React 19, TanStack & Node.js)',
    instructor: 'kodlama.org Eğitmenleri',
    level: 'Orta',
    duration: '16 Hafta',
    studentsCount: 12450,
    rating: 4.95,
    category: 'Web Geliştirme',
    description: 'TypeScript, React 19, TanStack Start/Router, Tailwind CSS, PostgreSQL ve Docker ile üretim seviyesinde modern SaaS ve kurumsal platformlar inşa edin.',
    tags: ['React', 'TypeScript', 'TanStack', 'Tailwind', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'python-deep-learning-mastery',
    title: 'Sıfırdan İleri Seviye Python ve Derin Öğrenme Kampı',
    instructor: 'Veri Bilimi Ekibi',
    level: 'Başlangıç',
    duration: '12 Hafta',
    studentsCount: 18200,
    rating: 4.88,
    category: 'Yapay Zekâ',
    description: 'Python temelleri, NumPy, Pandas, veri görselleştirme, PyTorch ile Sinir Ağları ve Bilgisayarlı Görü projeleriyle yapay zekâ dünyasına adım atın.',
    tags: ['Python', 'PyTorch', 'Data Science', 'Machine Learning'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    isPopular: true
  },
  {
    id: 'enterprise-dotnet-backend',
    title: 'İleri Seviye .NET 9 & Mikroservis Mimarileri',
    instructor: 'Yazılım Mimarisi Ekibi',
    level: 'İleri',
    duration: '14 Hafta',
    studentsCount: 9150,
    rating: 4.92,
    category: 'Backend',
    description: 'Clean Architecture, CQRS, MediatR, Event-Driven Architecture, Kafka, Redis ve Kubernetes ile yüksek trafikli mikroservis tasarımı.',
    tags: ['.NET 9', 'Microservices', 'Docker', 'Kubernetes', 'CQRS'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'data-structures-system-design',
    title: 'Veri Yapıları, Algoritmalar & Sistem Tasarımı',
    instructor: 'Mühendislik Kurulu',
    level: 'Orta',
    duration: '10 Hafta',
    studentsCount: 7600,
    rating: 4.91,
    category: 'Temel Bilgisayar Bilimi',
    description: 'Teknik mülakatlara hazırlık, zaman & bellek karmaşıklığı analizi, dağıtık sistemler ve ölçeklenebilirlik prensipleri.',
    tags: ['Algorithms', 'System Design', 'Big-O', 'Data Structures'],
    image: 'https://images.unsplash.com/photo-1516116211227-bbc1329c381c?auto=format&fit=crop&w=800&q=80',
    isNew: true
  },
  {
    id: 'devops-cloud-kubernetes',
    title: 'DevOps Mühendisliği, CI/CD ve Cloud Native Uygulamalar',
    instructor: 'DevOps Ekibi',
    level: 'Orta',
    duration: '10 Hafta',
    studentsCount: 6300,
    rating: 4.87,
    category: 'DevOps & Bulut',
    description: 'Linux, Git, GitHub Actions CI/CD, Terraform, AWS/GCP, Docker & Helm ile modern bulut altyapı yönetimi.',
    tags: ['DevOps', 'Docker', 'Kubernetes', 'AWS', 'Terraform'],
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80'
  }
]
