import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  BadgePercent,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Download,
  GraduationCap,
  Mail,
  Smartphone,
  Sparkles,
  Sun,
  Moon,
  Users,
  X,
  Code,
  ShieldCheck,
  History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/useThemeStore';
import React, { useState, useEffect } from 'react';

// --- ميزات المنصة الحقيقية والمدققة هندسياً ---
const premiumFeatures = [
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "منظومة صلاحيات الأمان المالي",
    desc: "فصل كامل للصلاحيات تم بناؤه بدقة؛ يمتلك المساعدون (Secretary) واجهة إدخال محددة، بينما تنفرد أنت كمسؤول بالنظام بحق الرقابة المطلقة والتعديل المالي الحصري لضمان صفر أخطاء."
  },
  {
    icon: <Smartphone className="w-7 h-7" />,
    title: "أتمتة رسائل الـ SMS الذكية",
    desc: "نظام إشعارات ذكي مدمج يرسل تلقائياً لأولياء الأمور في 4 حالات: فور تسجيل الطالب، وتنبيه قبل انتهاء الاشتراك بـ 3 أيام، وعند انتهاء الاشتراك، وفور التجديد الفعلي لبناء مصداقية تامة."
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "لوحة تحكم وتحليلات مالية",
    desc: "وداعاً لدفاتر الورق والتشتت. واجهة بيانية متطورة تعرض أعداد الطلاب النشطين، وصافي الأرباح الشهرية، مع مقارنة حية بنمو السنتر ومبيعاته مقارنة بالشهر السابق مباشرة."
  },
  {
    icon: <BadgePercent className="w-7 h-7" />,
    title: "إدارة الاشتراكات بـ كود الألوان",
    desc: "نظام تعقب بصري يمنع اللبس؛ يظهر الطلاب المشتركون باللون الأخضر المستقر، بينما يتحول حساب من أوشك اشتراكه على الانتهاء للون الأحمر التنبيهي لتسهيل عمل فريق الإدارة."
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "هيكلة المجموعات والشهور",
    desc: "نظم حصصك، مراحل عملك ومجموعاتك بمرونة هندسية كاملة، مع مرونة تخصيص قيمة اشتراكات متغيرة وحساب الحضور والغياب بشكل مستقل لكل مرحلة دراسية."
  },
  {
    icon: <History className="w-7 h-7" />,
    title: "سجل النشاط الإداري (Activity Log)",
    desc: "أمان ورقابة صارمة عبر نظام تتبع ذكي يرصد ويسجل كل حركة يقوم بها السكرتارية أو المساعدون داخل السيستم؛ لتعرف 'من فعل ماذا، ومتى بالملي ثانية' لراحة بال مطلقة."
  }
];

// --- مكون توست تثبيت التطبيق الأسطوري (PWA Install Toast) ---
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallAppToast = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setIsVisible(true), 4000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsVisible(false);
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-[420px] z-[100] pointer-events-none"
        >
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-6 flex items-center gap-5 relative overflow-hidden pointer-events-auto backdrop-blur-2xl">
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-primary-600/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 rounded-2xl animate-ping opacity-20"></div>
              <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-4 rounded-2xl text-white shadow-xl relative border border-white/20">
                <Smartphone size={28} />
              </div>
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-black dark:text-white leading-none">تطبيق Sentryk</h4>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                ثبت المنصة الآن على جهازك للوصول السريع وإدارة مركزك التعليمي باحترافية كاملة وثبات برميوم.
              </p>
            </div>

            <button
              onClick={handleInstallClick}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3.5 rounded-2xl text-sm font-black hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all shadow-lg active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <Download size={16} />
              ثبته الآن
            </button>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-5 text-slate-400 hover:text-rose-500 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- المكون الرئيسي لصفحة الهبوط ---
export default function Landing() {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-500 overflow-hidden text-right font-sans animate-fade-in" dir="rtl">
      
      <InstallAppToast />

      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-[#030712]/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-xl"></div>
              <div className="relative w-11 h-11 bg-primary-600 rounded-xl flex items-center justify-center shadow-xl shadow-primary-600/30 overflow-hidden border border-white/10 transition-transform hover:scale-105">
                <img src="/favicon.svg" alt="Sentryk Logo" className="w-7 h-7 object-contain" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter dark:text-white uppercase font-display">SENTRYK</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>
            <Link to="/login" className="hidden md:block font-bold text-slate-600 dark:text-slate-300 hover:text-primary-600 px-4">دخول المعلمين</Link>
            <Link to="/signup" className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/25">ابدأ فترتك التجريبية</Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-48 pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-600/10 border border-primary-600/20 text-primary-600 mb-8 font-bold text-sm"
          >
            <Sparkles size={18} />
            <span>نظام إدارة سحابي متكامل للمراكز التعليمية من تطوير يوسف أحمد مسلم</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-[5.2rem] font-black leading-[1.15] mb-8 dark:text-white tracking-tight font-display"
          >
            حوّل مركزك التعليمي <br />
            إلى <span className="text-primary-600 italic">منظومة هندسية</span> ذكية
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
          >
            منصة **سنتريك (Sentryk)** هي نظام SaaS تم بناؤه بفلسفة "الهندسة أولاً" بواسطة المطور الفول ستاك **يوسف أحمد مسلم**. صُمم النظام بدقة برمجية متناهية لتخليصك تماماً من عشوائية الورق، تلاعب البيانات، وفقدان الاشتراكات، مع ربط أولياء الأمور فوريًا بحالة الطلاب الإدارية والمالية.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="flex flex-wrap justify-center gap-5"
          >
             <Link to="/signup" className="px-14 py-6 bg-primary-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-primary-600/40 hover:bg-primary-700 hover:-translate-y-2 transition-all flex items-center gap-4 group">
               انضم لنخبة المعلمين الآن
               <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
             </Link>
          </motion.div>

          <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 dark:text-slate-500 font-bold">
            <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> فترة تجريبية 14 يوماً</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> أتمتة الرسائل بالكامل</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> حماية وسجلات نشاط مدمجة</div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[120px] -z-10"></div>
      </section>

      {/* --- Value Proposition Section --- */}
      <section className="py-24 px-6 bg-white/40 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 dark:text-white font-display">لماذا يختار أصحاب السناتر نظام "سنتريك"؟</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold italic text-xl max-w-3xl mx-auto">
              حلول تقنية رصينة صممها وابتكرها المهندس والمطور يوسف مسلم لإنهاء الأزمات الإدارية والمالية اليومية للمدرسين والسناتر بنجاح.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -12 }}
                className="p-10 rounded-[3.5rem] bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 dark:text-white">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- High Prestige Section --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-primary-950 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-white/5">
            <div className="relative z-10">
                <Code size={70} className="mx-auto mb-8 text-primary-400" />
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-display">تحكم مطلق في الإدارة والمالية <br/> بدقة برمجية متكاملة</h2>
                <p className="text-xl md:text-2xl text-slate-300 font-medium mb-12 max-w-2xl mx-auto italic">
                  "النظام البرمجي القوي هو عماد أي مشروع ناجح. سنتريك يضمن لمركزك استقراراً تاماً وسيطرة مطلقة على أدق التفاصيل اليومية."
                </p>
                <Link to="/signup" className="inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-900 rounded-2xl font-black text-2xl hover:bg-primary-50 hover:scale-105 transition-all shadow-xl">
                    ابدأ فترة التجربة المجانية
                    <ArrowLeft size={24} />
                </Link>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-right">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <img src="/favicon.svg" alt="Sentryk Logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="text-2xl font-black dark:text-white tracking-tighter font-display">SENTRYK</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
              منصة سنترك برو لإدارة السناتر والمراكز التعليمية سحابياً. حلول تقنية ذكية تم بناؤها لتأمين الحسابات ومتابعة الاشتراكات بدقة متناهية وبساطة كاملة.
            </p>
          </div>
          
          <div>
            <h4 className="font-black mb-6 dark:text-white text-xl">الشركة والمنصة</h4>
            <ul className="space-y-4 font-bold text-slate-500 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-primary-600">من نحن (عن سنتريك)</Link></li>
              <li><Link to="/contact" className="hover:text-primary-600">طلب استشارة فنية</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 dark:text-white text-xl">الملكية والشركاء</h4>
            <ul className="space-y-4 font-bold text-slate-500 dark:text-slate-400">
              <li><span className="dark:text-slate-300">المطور: يوسف أحمد مسلم</span></li>
              <li><Link to="/policy" className="hover:text-primary-600">شروط الاستخدام والأمان</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 dark:text-white text-xl">تواصل رقمي</h4>
            <div className="flex gap-4 mb-6">
              <Link to="/contact" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-600 hover:text-white transition-all shadow-sm">
                <Mail size={22} />
              </Link>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">دعم فني واستشارات متكاملة تحت إشراف المطور.</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 dark:border-slate-800/50 text-center">
          <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em] font-display">
            © {new Date().getFullYear()} SENTRYK PRO. DESIGNED & DEVELOPED BY YOUSSEF AHMED MOSSALLEM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
