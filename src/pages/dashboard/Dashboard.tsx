import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowRightLeft,
  BookOpen,
  CalendarClock,
  CreditCard,
  Download,
  MessageSquare,
  Smartphone,
  TrendingDown,
  TrendingUp,
  Users,
  UserX,
  X,
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

// --- تعريف الواجهات (Interfaces) لحل أخطاء TypeScript ---
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// --- مكون توست التثبيت الأسطوري ---
const InstallAppToast = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. التحقق مما إذا كان المستخدم يفتح الموقع بالفعل كتطبيق مثبت
    const checkIsInstalled = () => {
      const isPWA = window.matchMedia('(display-mode: standalone)').matches 
                    || (window.navigator as any).standalone 
                    || document.referrer.includes('android-app://');
      setIsStandalone(isPWA);
    };

    checkIsInstalled();

    // 2. الاستماع لحدث التثبيت
    const handler = (e: any) => {
      // إذا كان مثبتاً بالفعل لا تظهر التوست
      if (isStandalone) return;
      
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // إظهار التوست بعد 5 ثوانٍ من دخول لوحة التحكم لضمان الانتباه
      const timer = setTimeout(() => setIsVisible(true), 5000);
      return () => clearTimeout(timer);
    };

    window.addEventListener('beforeinstallprompt' as any, handler);
    return () => window.removeEventListener('beforeinstallprompt' as any, handler);
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {isVisible && !isStandalone && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          className="fixed bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-[450px] z-[200] pointer-events-none"
        >
          <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.4)] rounded-[2.5rem] p-6 flex items-center gap-5 relative overflow-hidden pointer-events-auto border-b-4 border-b-primary-600">
            {/* تأثير ضوئي خلفي */}
            <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-primary-600/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 to-indigo-700 p-4 rounded-[1.5rem] text-white shadow-xl relative border border-white/20">
                <Smartphone size={28} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
              </div>
            </div>

            <div className="flex-1 text-right">
              <h4 className="text-lg font-black dark:text-white leading-tight">نسخة سطح المكتب</h4>
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                ثبت Sentryk كبرنامج مستقل للوصول السريع وتحسين الأداء الإداري.
              </p>
            </div>

            <button
              onClick={handleInstallClick}
              className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-5 py-3.5 rounded-2xl text-xs font-black hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all shadow-lg flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <Download size={16} />
              تثبيت
            </button>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 left-5 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- المكونات الفرعية الحالية (بدون تغيير) ---

const StudentsModal = ({ isOpen, onClose, title, students, type }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[80vh] rounded-[3rem] shadow-2xl relative z-10 overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col"
          dir="rtl"
        >
          <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${type === 'expiry' ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-500/10 text-slate-600'}`}>
                {type === 'expiry' ? <CalendarClock size={24} /> : <UserX size={24} />}
              </div>
              <div>
                <h3 className="text-xl font-black dark:text-white">{title}</h3>
                <p className="text-xs font-bold text-slate-500">إجمالي العدد: {students?.length || 0}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
            {students && students.length > 0 ? (
              students.map((student: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-5 rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-600/10 text-primary-600 flex items-center justify-center font-black text-lg">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black dark:text-white text-sm">{student.name}</p>
                      <p className="text-xs font-bold text-slate-400">{student.phone}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${type === 'expiry' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'}`}>
                      {type === 'expiry' ? 'تنتهي قريباً' : 'منتهي'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-400 font-bold">لا يوجد طلاب في هذه القائمة حالياً</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const DashboardCard = ({ title, value, icon, color, footerText, trend, subtitle }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color}-500/5 rounded-full blur-2xl group-hover:bg-${color}-500/10 transition-colors`} />
    <div className="flex justify-between items-start relative z-10">
      <div className={`p-4 rounded-2xl bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 shadow-inner`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend === 'up' ? 'صعود' : 'هبوط'}
        </div>
      )}
    </div>
    <div className="mt-6 relative z-10">
      <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black dark:text-white tracking-tight">{value ?? 0}</h3>
        {subtitle && <span className="text-xs font-bold text-slate-400">{subtitle}</span>}
      </div>
      {footerText && (
        <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
          <Activity size={12} className={`text-${color}-500`} />
          {footerText}
        </div>
      )}
    </div>
  </motion.div>
);

// --- المكون الرئيسي ---

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isExpiryModalOpen, setIsExpiryModalOpen] = useState(false);
  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState<{ expiry: any[], expired: any[] }>({ expiry: [], expired: [] });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard');
        if (res.data.success) {
          setStats(res.data.stats);
          
          const studentsRes = await api.get('/students?limit=1000'); 
          if (studentsRes.data.success) {
            const allStudents = studentsRes.data.data;
            const now = new Date();
            const threeDaysFromNow = new Date();
            threeDaysFromNow.setDate(now.getDate() + 3);

            const expiry = allStudents.filter((s: any) => {
              const activeSub = s.subscriptions.find((sub: any) => sub.status === "ACTIVE");
              if (!activeSub) return false;
              const endDate = new Date(activeSub.endDate);
              return endDate > now && endDate <= threeDaysFromNow;
            });

            const expired = allStudents.filter((s: any) => s.computedStatus === "EXPIRED");
            setFilteredStudents({ expiry, expired });
          }
        }
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
      <Zap className="text-primary-600 animate-bounce" size={48} />
      <p className="font-black text-slate-400 text-sm animate-pulse">جاري تحضير البيانات...</p>
    </div>
  );

  const { students, revenue, sms, content, recentActivity } = stats || {};

  return (
    <div className="space-y-8 pb-10 px-2 md:px-0">
      
      {/* توست التثبيت الذكي */}
      <InstallAppToast />

      {/* Modals */}
      <StudentsModal 
        isOpen={isExpiryModalOpen} 
        onClose={() => setIsExpiryModalOpen(false)} 
        title="طلاب تنتهي اشتراكاتهم خلال 72 ساعة"
        students={filteredStudents.expiry}
        type="expiry"
      />
      <StudentsModal 
        isOpen={isExpiredModalOpen} 
        onClose={() => setIsExpiredModalOpen(false)} 
        title="طلاب انتهت اشتراكاتهم تماماً"
        students={filteredStudents.expired}
        type="expired"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white tracking-tight">لوحة التحكم</h1>
          <p className="text-slate-500 font-bold text-sm">أهلاً بك، إليك ملخص أداء السنتر اليوم.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400">النظام يعمل بكفاءة</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="إجمالي الطلاب" value={students?.total} icon={<Users size={24} />} color="blue" footerText={`${students?.active ?? 0} طالب نشط`} />
        <DashboardCard title="إيرادات الشهر" value={revenue?.thisMonth?.toLocaleString()} subtitle="ج.م" icon={<CreditCard size={24} />} color="emerald" trend={revenue?.trend} footerText={`الفرق: ${revenue?.difference} ج.م`} />
        <DashboardCard title="رصيد الرسائل" value={sms?.messages} subtitle="رسالة" icon={<MessageSquare size={24} />} color="amber" footerText={`القيمة: ${sms?.balanceInMoney} ج.م`} />
        <DashboardCard title="المحتوى الدراسي" value={content?.subjects} subtitle="مادة" icon={<BookOpen size={24} />} color="purple" footerText={`${content?.groups ?? 0} مجموعة`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm h-full">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="text-xl font-black dark:text-white flex items-center gap-3">
                <ArrowRightLeft className="text-primary-600" size={24} />
                آخر العمليات
              </h3>
            </div>
            <div className="p-8 space-y-6">
              {recentActivity?.map((log: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-primary-600">{idx + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:justify-between gap-1">
                      <p className="text-sm font-bold dark:text-white truncate">
                        <span className="text-primary-600 ml-2">{log.user}</span> 
                        {log.action}
                      </p>
                      <span className="text-[10px] font-black text-slate-400">{log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Alerts */}
        <div className="space-y-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-rose-600 dark:bg-rose-600/20 p-8 rounded-[3.5rem] border border-rose-500/20 shadow-2xl shadow-rose-500/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertCircle size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-rose-100 dark:text-rose-400 mb-4">
                <Zap size={20} fill="currentColor" />
                <span className="font-black text-xs uppercase tracking-widest">تنبيه انتهاء الاشتراك</span>
              </div>
              <h4 className="text-white font-black text-2xl mb-1">{students?.nearExpiry ?? 0} طالب</h4>
              <p className="text-rose-100/70 text-xs font-bold mb-8 italic">تنتهي اشتراكاتهم خلال الـ 72 ساعة القادمة</p>
              
              <button 
                onClick={() => setIsExpiryModalOpen(true)}
                className="w-full py-4 bg-white dark:bg-rose-600 text-rose-600 dark:text-white rounded-[2rem] font-black text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                عرض القائمة كاملة
                <ArrowRightLeft size={14} className="rotate-180" />
              </button>
            </div>
          </motion.div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-black dark:text-white mb-6 flex items-center gap-3 text-sm">
              <div className="w-2 h-6 bg-primary-500 rounded-full" />
              إحصائيات إضافية
            </h4>
            <div className="space-y-4">
               <div className="flex justify-between items-center p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 group">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">اشتراكات</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">منتهية تماماً</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-rose-500">{students?.expired ?? 0}</span>
                    <button 
                      onClick={() => setIsExpiredModalOpen(true)}
                      className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:text-primary-600 transition-colors"
                    >
                      <ArrowRightLeft size={14} className="rotate-180" />
                    </button>
                  </div>
               </div>
               
               <div className="flex justify-between items-center p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">نشاط الرسائل</span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">مرسلة هذا الشهر</span>
                  </div>
                  <span className="text-2xl font-black text-primary-500">{sms?.sentThisMonth ?? 0}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
