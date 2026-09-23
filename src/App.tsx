import React, { useState, useMemo } from 'react';
import { 
  Search, ExternalLink, Github, Award, Briefcase, User, Calendar, Tag, FileText, X, Check, Filter,
  ChevronDown, Moon, Sun, ArrowUpRight, Layers, Eye, Download, Code, Sparkles, FolderGit2, Menu
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
  projectDate: string;
  problem: string;
  objective: string;
  features: string[];
  
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  fileUrl: string;
  fileType: 'pdf' | 'image';
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Review Authenticity Analyzer',
    description: 'Review Authenticity Analyzer adalah projek pemrosesan bahasa alami (NLP) yang bertujuan untuk mendeteksi dan menganalisis keaslian sebuah ulasan (review) teks, yaitu membedakan mana ulasan yang asli (authentic) dan mana ulasan buatan/palsu (fake/computer-generated/spam).',
    category: 'Web Dev',
    technologies: ['Python', 'NLTK', 'Scikit-Learn', 'Gradio', 'Hugging Face Spaces'],
    imageUrl: 'images/projectnlp.png',
    githubUrl: 'https://github.com/Christian2802/NLP-Review-Authenticity-Analyzer',
    demoUrl: 'https://huggingface.co/spaces/MichLoverz/review-authenticity-analyzer',
    projectDate: '2026',
    problem: 'maraknya ulasan palsu (fake/spam reviews) pada platform online yang memanipulasi penilaian produk atau layanan, sehingga menyesatkan calon pembeli dan merugikan bisnis yang jujur.',
    objective: 'Membantu platform e-commerce atau konsumen mengidentifikasi ulasan palsu atau manipulatif yang dapat menyesatkan keputusan pembelian.',
    features: [
      'Input teks ulasan',
      'Memprediksi status ulasan (Authentic atau Fake/Spam)',
      'Skor Probabilitas/Kepercayaan',
      'Pemilihan model antara LSTM + Word2Vec atau indoBERT'
    ],
    
  },
  {
    id: 'proj-2',
    title: 'Drought Prediction',
    description: 'Drought Prediction adalah proyek pemodelan Machine Learning yang bertujuan untuk memprediksi tingkat kekeringan suatu wilayah berdasarkan data meteorologi, tanah, dan iklim untuk membantu mitigasi bencana alam.',
    category: 'AI/ML',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/Christian2802/Drought_Prediction',
    demoUrl: 'https://example.com',
    projectDate: '2026',
    problem: 'Sulitnya memprediksi potensi dan tingkat keparahan kekeringan secara akurat dan lebih awal, yang berisiko menyebabkan gagal panen, krisis air bersih, dan kerugian ekonomi sektor pertanian.',
    objective: 'Deteksi kekeringan dini untuk mengantisipasi terjadinya kekeringan sebelum dampak memburuk',
    features: [
      'Pengolahan Data Iklim: Pembersihan dan analisis data meteorologi (seperti suhu, curah hujan, kelembapan, dan kondisi tanah).',
      'Prediksi Tingkat Kekeringan: Klasifikasi atau regresi tingkat keparahan kekeringan (drought severity level).',
    ],
    
  },
  {
    id: 'proj-3',
    title: 'Fruit Freshness Detector',
    description: 'Aplikasi untuk mendeteksi kesegaran buah.',
    category: 'Mobile',
    technologies: ['Python', 'OpenCV', 'Scikit-Learn'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    projectDate: '2024',
    problem: 'Kurangnya kesadaran finansial karena pencatatan transaksi manual yang rumit dan tidak konsisten.',
    objective: 'Menyediakan aplikasi keuangan yang cepat, terintegrasi OCR resi belanjaan, serta visualisasi grafik anggaran.',
    features: [
      'Scan Struk Otomatis dengan OCR',
      'Pengingat Pembayaran Tagihan Rutin',
      'Ekspor Laporan Keuangan CSV/Excel',
      'Offline-First Local Database Sync'
    ],
  
  }
];

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2025-01-15',
    credentialId: 'AWS-ASA-8923019',
    fileUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1000&q=80',
    fileType: 'image'
  },
  {
    id: 'cert-2',
    title: 'Drought Prediciton',
    issuer: 'Google Cloud & DeepLearning.AI',
    issueDate: '2024-11-20',
    credentialId: 'TF-DEV-902182',
    fileUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1000&q=80',
    fileType: 'image'
  },
  {
    id: 'cert-3',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Coursera & Meta',
    issueDate: '2024-06-10',
    credentialId: 'META-FE-772910',
    fileUrl: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1000&q=80',
    fileType: 'image'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'projects' | 'certificates'>('home');
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    INITIAL_PROJECTS.forEach(p => p.technologies.forEach(t => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredProjects = useMemo(() => {
    return INITIAL_PROJECTS.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTech]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* HEADER / NAVIGATION */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className={`font-bold text-lg tracking-tight block leading-tight ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>Fransiscus Owen Ladjuardi</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'home', label: 'Home / Profile', icon: User },
              { id: 'projects', label: 'Projects Showcase', icon: Briefcase },
              { id: 'certificates', label: 'Certificates Gallery', icon: Award }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? (darkMode ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border border-indigo-200')
                      : (darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg border transition-colors ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden border-b px-4 py-3 space-y-1 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            {[
              { id: 'home', label: 'Home', icon: User },
              { id: 'projects', label: 'Projects', icon: Briefcase },
              { id: 'certificates', label: 'Certificates', icon: Award }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 1. HOME / LANDING PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            <section className="relative pt-6 pb-12 overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Sparkles className="w-3.5 h-3.5" /> Open for New Opportunities
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    Hi, I'm <span className={darkMode ? 'text-indigo-300' : 'text-indigo-700'}>Fransiscus Owen Ladjuardi</span>
                  </h1>
                  
                  <p className="text-xl font-medium text-slate-400">
                    Computer Science Student
                  </p>

                  <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Computer Science student interested in Artificial Intelligence, Machine Learning, Computer Vision, and Software Development. I have experience working on academic and personal projects involving deep learning, data analysis, computer vision, and web applications. I enjoy building practical solutions to real-world problems while continuously learning and improving my technical skills.

                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab('projects')}
                      className={`px-6 py-3 rounded-xl bg-gradient-to-r text-white font-semibold text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02] ${darkMode ? 'from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/25' : 'from-indigo-700 to-blue-700 hover:from-indigo-600 hover:to-blue-600 shadow-indigo-700/20'}`}
                    >
                      <Briefcase className="w-4 h-4" /> View Projects
                    </button>
                    <button
                      onClick={() => setActiveTab('certificates')}
                      className={`px-6 py-3 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-all hover:scale-[1.02] ${
                        darkMode ? 'border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200' : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Award className="w-4 h-4 text-amber-500" /> View Certificates
                    </button>
                  </div>

                  <div className="flex items-center gap-4 pt-4 text-slate-400">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-slate-800 hover:border-slate-600 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg border border-slate-800 hover:border-slate-600 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <div className={`w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 p-2 shadow-2xl ${darkMode ? 'border-indigo-500/30 bg-gradient-to-b from-indigo-500/20 to-purple-500/20' : 'border-indigo-200 bg-gradient-to-b from-indigo-100 to-sky-100 shadow-indigo-200/50'}`}>
                    <img
                      src="/images/profile.png"
                      alt="Fransiscus Owen's Profile"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. PROJECTS SECTION */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Jelajahi portfolio project, analisis studi kasus, dan demo live aplikasi yang telah saya kembangkan.
              </p>
            </div>

            {/* Filter Bar */}
            <div className={`p-4 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, kata kunci, atau teknologi..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    darkMode 
                      ? 'bg-slate-950 border-slate-800 text-slate-100 focus:border-indigo-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                  }`}
                />
              </div>

            </div>

            {/* Grid Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <div 
                  key={project.id}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                    darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-indigo-400 backdrop-blur-md border border-indigo-500/30">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {project.projectDate}</span>
                      </div>
                      <h3 className="font-bold text-lg leading-snug">{project.title}</h3>
                      <p className={`text-xs line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CERTIFICATES SECTION */}
        {activeTab === 'certificates' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold">Certificates & Credentials</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Daftar sertifikasi profesional, lisensi, dan pelatihan resmi yang telah diselesaikan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_CERTIFICATES.map(cert => (
                <div 
                  key={cert.id} 
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition-all hover:-translate-y-1 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="h-40 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative group cursor-pointer" onClick={() => setSelectedCertificate(cert)}>
                      <img src={cert.fileUrl} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> Preview Certificate
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-amber-500">{cert.issuer}</span>
                      <h3 className="font-bold text-base mt-1">{cert.title}</h3>
                      <p className="text-xs text-slate-400 mt-2">Issued: {cert.issueDate}</p>
                      {cert.credentialId && (
                        <p className="text-[11px] text-slate-500 font-mono mt-1">ID: {cert.credentialId}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCertificate(cert)}
                    className="w-full mt-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" /> View Credential
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`w-full max-w-3xl rounded-2xl border p-6 my-8 space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold mt-2">{selectedProject.title}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-1 rounded-lg hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-64 rounded-xl overflow-hidden bg-slate-800">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-indigo-400 uppercase tracking-wider">Problem Statement</h4>
                <p className="text-slate-300">{selectedProject.problem}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-indigo-400 uppercase tracking-wider">Project Objective</h4>
                <p className="text-slate-300">{selectedProject.objective}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-indigo-400 uppercase tracking-wider">Key Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <div className="flex gap-3">
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub Repo
                </a>
                <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE PREVIEW MODAL */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-2xl border p-6 space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base">{selectedCertificate.title}</h3>
                <p className="text-xs text-slate-400">{selectedCertificate.issuer}</p>
              </div>
              <button onClick={() => setSelectedCertificate(null)} className="p-1 rounded-lg hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center p-2 border border-slate-800">
              <img src={selectedCertificate.fileUrl} alt={selectedCertificate.title} className="max-h-full max-w-full object-contain rounded" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">ID: {selectedCertificate.credentialId || 'N/A'}</span>
              <a href={selectedCertificate.fileUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2">
                <Download className="w-4 h-4" /> Open Full Image
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
