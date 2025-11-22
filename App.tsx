import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Video, 
  Palette, 
  Layers, 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  Menu, 
  X,
  Download,
  Phone,
  Music,
  BookOpen,
  MessageCircle
} from 'lucide-react';

// --- Types ---

type Category = 'ALL' | 'FASHION' | 'BRAND' | 'PORTRAIT' | 'CINEMA';

interface PortfolioItem {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
  description: string;
}

interface ServiceItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  price: string;
  timeline: string;
}

// --- Data Constants ---

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Neon Dreams", category: "FASHION", imageUrl: "https://picsum.photos/800/1000?random=1", description: "Vogue Magazine 2023 Fall Collection Editorial." },
  { id: 2, title: "Urban Solitude", category: "PORTRAIT", imageUrl: "https://picsum.photos/800/1000?random=2", description: "Personal artistic project exploring loneliness in megacities." },
  { id: 3, title: "Tech Noir", category: "BRAND", imageUrl: "https://picsum.photos/800/600?random=3", description: "Visual identity campaign for CyberWear Ltd." },
  { id: 4, title: "Liquid Light", category: "CINEMA", imageUrl: "https://picsum.photos/800/600?random=4", description: "Experimental short film utilizing fluid dynamics." },
  { id: 5, title: "Ethereal Bridal", category: "FASHION", imageUrl: "https://picsum.photos/800/1000?random=5", description: "Romantic bridal collection shoot in Iceland." },
  { id: 6, title: "CEO Profiles", category: "PORTRAIT", imageUrl: "https://picsum.photos/800/1000?random=6", description: "Corporate executive portraits for Fortune 500 companies." },
];

const SERVICES: ServiceItem[] = [
  { 
    id: 1, 
    icon: <Camera className="w-6 h-6 text-white" />, 
    title: "时尚与广告大片", 
    desc: "为杂志、品牌拍摄极具视觉冲击力的广告大片，包含创意策划与后期精修。", 
    price: "¥15,000 起", 
    timeline: "1-2 周交付" 
  },
  { 
    id: 2, 
    icon: <Layers className="w-6 h-6 text-white" />, 
    title: "品牌视觉全案", 
    desc: "从色彩体系到影像风格，构建完整的品牌视觉识别系统(VI)。", 
    price: "¥30,000 起", 
    timeline: "3-4 周交付" 
  },
  { 
    id: 3, 
    icon: <Palette className="w-6 h-6 text-white" />, 
    title: "艺术人像定制", 
    desc: "不仅仅是照片，而是为您定制的个人艺术作品，挖掘独特气质。", 
    price: "¥5,000 起", 
    timeline: "3-5 天交付" 
  },
  { 
    id: 4, 
    icon: <Video className="w-6 h-6 text-white" />, 
    title: "动态影像/短片", 
    desc: "电影级质感的品牌TVC、时尚短片或纪录片拍摄与剪辑。", 
    price: "¥20,000 起", 
    timeline: "2-3 周交付" 
  },
];

// --- Components ---

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-16 text-center" data-aos="fade-up">
    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 mb-4 tracking-wider">
      {subtitle}
    </span>
    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-creative-gradient">
      {title}
    </h2>
  </div>
);

const Modal = ({ item, onClose }: { item: PortfolioItem; onClose: () => void }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-slate-900 rounded-2xl overflow-hidden max-w-4xl w-full border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors z-10">
          <X size={24} />
        </button>
        <div className="grid md:grid-cols-2 h-full">
          <div className="h-64 md:h-full">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="text-purple-400 font-medium text-sm mb-2 tracking-widest">{item.category}</div>
            <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">{item.description}</p>
            <button className="w-fit px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-creative-gradient hover:text-white transition-all duration-300">
              查看完整项目
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Category>('ALL');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [formStatus, setFormStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

  // Handle scroll for navbar glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPortfolio = activeTab === 'ALL' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('SUBMITTING');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('SUCCESS');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans relative overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">
            SAM <span className="text-transparent bg-clip-text bg-creative-gradient">LIN.</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-300">
            <a href="#home" className="hover:text-white transition-colors">首页</a>
            <a href="#portfolio" className="hover:text-white transition-colors">作品</a>
            <a href="#services" className="hover:text-white transition-colors">服务</a>
            <a href="#about" className="hover:text-white transition-colors">关于</a>
            <a href="#contact" className="px-5 py-2 rounded-full bg-white/10 hover:bg-creative-gradient text-white transition-all duration-300 border border-white/10">
              联系我
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl">
            <a href="#home" className="text-lg" onClick={() => setIsMenuOpen(false)}>首页</a>
            <a href="#portfolio" className="text-lg" onClick={() => setIsMenuOpen(false)}>作品</a>
            <a href="#services" className="text-lg" onClick={() => setIsMenuOpen(false)}>服务</a>
            <a href="#about" className="text-lg" onClick={() => setIsMenuOpen(false)}>关于</a>
            <a href="#contact" className="text-lg text-purple-400" onClick={() => setIsMenuOpen(false)}>联系我</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Open for Commissions 2024
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              光影所至<br />
              <span className="text-transparent bg-clip-text bg-creative-gradient">皆为传奇</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-lg leading-relaxed border-l-4 border-purple-500 pl-4">
              用镜头重塑你的视觉想象。不仅是记录者，更是光影的造梦师。
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#portfolio" className="group px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-creative-gradient hover:text-white transition-all duration-300 flex items-center gap-2">
                探索作品 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </a>
              <a href="#contact" className="px-8 py-4 rounded-full bg-transparent border border-white/20 hover:bg-white/10 transition-all duration-300 font-medium">
                开启合作
              </a>
            </div>
          </div>
          
          {/* Abstract Visual Element */}
          <div className="relative hidden md:block h-[600px]">
             <div className="absolute inset-0 flex items-center justify-center animate-float">
               <div className="relative w-80 h-[500px] rounded-2xl overflow-hidden shadow-2xl rotate-3 border border-white/10">
                  <img src="https://picsum.photos/600/800?random=10" alt="Hero Work" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               </div>
               <div className="absolute top-10 right-10 w-64 h-80 rounded-2xl overflow-hidden shadow-xl -rotate-6 border border-white/10 -z-10 opacity-70">
                  <img src="https://picsum.photos/600/800?random=11" alt="Hero Work 2" className="w-full h-full object-cover grayscale" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="精选作品集" subtitle="PORTFOLIO" />
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'ALL', label: '全部作品' },
              { id: 'FASHION', label: '时尚杂志' },
              { id: 'BRAND', label: '品牌全案' },
              { id: 'PORTRAIT', label: '艺术人像' },
              { id: 'CINEMA', label: '动态影像' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-creative-gradient text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((item) => (
              <div 
                key={item.id} 
                className="group relative rounded-xl overflow-hidden aspect-[4/5] cursor-pointer border border-white/5 bg-slate-900"
                onClick={() => setSelectedItem(item)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-300 line-clamp-1">{item.description}</p>
                  </div>
                </div>
                {/* Hover Border Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="核心服务" subtitle="SERVICES" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 group hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 h-20">
                  {service.desc}
                </p>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white font-semibold">{service.price}</span>
                    <span className="text-slate-500">{service.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative z-10 shadow-2xl">
                   <img src="./sam-profile.png" alt="Sam Lin" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-creative-gradient rounded-full blur-3xl opacity-50 -z-0"></div>
              </div>
              <div className="md:col-span-7 space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">关于 Sam Lin</h2>
                  <h3 className="text-xl text-transparent bg-clip-text bg-creative-gradient font-medium mb-6">
                    视觉艺术家 / 创意商业摄影师
                  </h3>
                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    <p>
                      10年跨界拍摄经验，曾与多家时尚杂志及潮流品牌合作。我擅长运用大胆的色彩与构图，打破常规视觉界限，致力于为每一个瞬间注入电影般的质感与灵魂。
                    </p>
                    <p>
                      我的创作哲学很简单：在现实与幻想的边缘游走，捕捉那些稍纵即逝的光影奇迹。无论是商业项目还是个人创作，我都坚持“独特的叙事性”——让每一张照片都会讲故事。
                    </p>
                  </div>
                </div>
                
                {/* Social & Contact Information */}
                <div className="flex flex-col gap-6 pt-2 border-t border-white/5">
                  <h4 className="text-sm font-bold text-slate-400 tracking-wider uppercase">Connect with me</h4>
                  
                  <div className="flex flex-wrap gap-6">
                    {/* Social Buttons */}
                    <div className="flex gap-4">
                      <a 
                        href="https://www.xiaohongshu.com/user/profile/6415f7980000000011021eec?xsec_token=ABuquCFbjrleQ37hXD1LkN0l4hd7HOxCwcIPG8xT7Glro%3D&xsec_source=pc_search" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#ff2442] hover:text-white hover:border-transparent transition-all duration-300 group relative"
                        title="小红书 / RED Note"
                      >
                        <BookOpen size={20} />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">小红书</span>
                      </a>
                      <a 
                        href="https://www.douyin.com/user/MS4wLjABAAAADJRFRv4B7rfURzILmFUbdSuCe3p41LJyVMdpEeMM2G5mJJ_hsIOvzB_ooOCwNYf7?from_tab_name=main" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-black hover:text-white hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:border-transparent transition-all duration-300 group relative"
                        title="抖音 / Douyin"
                      >
                        <Music size={20} />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">抖音</span>
                      </a>
                    </div>

                    {/* Contact Details */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-center">
                      <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors cursor-default">
                        <div className="w-8 h-8 rounded-full bg-green-600/20 text-green-500 flex items-center justify-center">
                          <MessageCircle size={16} />
                        </div>
                        <span className="tracking-wide font-mono text-sm">WeChat: <span className="text-white font-bold">hhkjh</span></span>
                      </div>
                      
                      <a href="tel:18818181818" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                           <Phone size={16} />
                        </div>
                        <span className="tracking-wide font-mono text-sm">TEL: <span className="text-white font-bold">188 1818 1818</span></span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-medium transition-all shadow-lg shadow-purple-900/40">
                    <Download size={18} />
                    下载个人简历 (PDF)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionTitle title="开始你的视觉项目" subtitle="CONTACT" />
          
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            {formStatus === 'SUCCESS' ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">需求已发送！</h3>
                <p className="text-slate-400">感谢您的信任，我会在24小时内通过邮件回复您。</p>
                <button 
                  onClick={() => setFormStatus('IDLE')}
                  className="mt-8 px-6 py-2 text-sm text-slate-400 hover:text-white underline"
                >
                  发送新的需求
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 ml-1">姓名</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 ml-1">邮箱</label>
                    <input 
                      required
                      type="email" 
                      placeholder="hello@example.com" 
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 ml-1">项目类型</label>
                    <select className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-slate-300">
                      <option>时尚大片拍摄</option>
                      <option>品牌视觉全案</option>
                      <option>个人艺术写真</option>
                      <option>商业产品摄影</option>
                      <option>视频短片制作</option>
                      <option>其他</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 ml-1">预算范围</label>
                    <select className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-slate-300">
                      <option>¥5k - ¥10k</option>
                      <option>¥10k - ¥30k</option>
                      <option>¥30k - ¥50k</option>
                      <option>¥50k+</option>
                      <option>待定</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-slate-400 ml-1">项目描述</label>
                  <textarea 
                    rows={4} 
                    placeholder="请简要描述您的项目需求、风格偏好及预期时间..."
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === 'SUBMITTING'}
                  className="w-full py-4 rounded-xl bg-creative-gradient font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                  {formStatus === 'SUBMITTING' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      发送中...
                    </>
                  ) : (
                    <>
                      发送合作请求 <Mail size={20} />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-500 mt-4">
                  亦可直接发送邮件至 <a href="mailto:hello@samlin-visuals.com" className="text-purple-400 hover:underline">hello@samlin-visuals.com</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold tracking-tighter mb-2">SAM LIN.</h4>
            <p className="text-slate-500 text-sm">© 2024 Sam Lin Visuals. All rights reserved.</p>
          </div>
          <div className="text-slate-600 text-xs">
             京ICP备00000000号-1
          </div>
        </div>
      </footer>

      {/* Portfolio Detail Modal */}
      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      
    </div>
  );
}