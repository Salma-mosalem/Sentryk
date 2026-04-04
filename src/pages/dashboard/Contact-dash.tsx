import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Hash,
    Headset,
    Mail,
    MessageSquare,
    User
} from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_pjcokij",
          template_id: "template_c1dnj9m",
          user_id: "EjARs5yaDNybll9Ov",
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: "ahmadmoslem35@gmail.com",
          },
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else { throw new Error(); }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="space-y-8 pb-10 px-2 md:px-0 rtl" dir="rtl">
      
      {/* Header - نفس ستايل الداشبورد */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white tracking-tight">تواصل معنا</h1>
          <p className="text-slate-500 font-bold text-sm">نحن هنا لمساعدتك في أي وقت، أرسل رسالتك الآن.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
          <span className="text-[10px] font-black text-slate-500 dark:text-slate-400">فريق الدعم متصل</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* جهة اليمين: معلومات سريعة بطريقة كروت الداشبورد */}
        <div className="space-y-6 order-2 lg:order-1">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-primary-600 dark:bg-primary-600/20 p-8 rounded-[2.5rem] border border-primary-500/20 shadow-xl shadow-primary-500/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Headset size={100} />
            </div>
            <div className="relative z-10">
              <span className="font-black text-[10px] text-primary-100 uppercase tracking-widest block mb-2">مركز المساعدة</span>
              <h4 className="text-white font-black text-xl mb-4">هل لديك استفسار سريع؟</h4>
              <p className="text-primary-100/70 text-xs font-bold leading-relaxed mb-6">
                فريق "سنتريك" متواجد دائماً لتقديم الدعم التقني والإداري لمنظومتك التعليمية.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white text-xs font-bold bg-white/10 p-3 rounded-2xl">
                  <Mail size={16} /> ahmadmoslem35@gmail.com
                </div>
              </div>
            </div>
          </motion.div>

          {/* كارت إحصائي صغير */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800">
            <h4 className="font-black dark:text-white mb-4 flex items-center gap-3 text-xs">
              <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              سرعة الاستجابة
            </h4>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
               <span className="text-[10px] font-black text-slate-400 uppercase">متوسط الرد</span>
               <span className="text-sm font-black text-emerald-500">أقل من ساعتين</span>
            </div>
          </div>
        </div>

        {/* جهة اليسار: الفورم الأسطوري */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
              <h3 className="text-xl font-black dark:text-white flex items-center gap-3">
                <MessageSquare className="text-primary-600" size={24} />
                أرسل رسالة مباشرة
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* الاسم */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-tighter">الاسم الكامل</label>
                  <div className="relative group">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={16} />
                    <input 
                      required type="text" placeholder="مثلاً: أحمد محمد"
                      className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pr-11 pl-4 outline-none focus:border-primary-600 transition-all font-bold text-sm dark:text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                {/* البريد */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-tighter">البريد الإلكتروني</label>
                  <div className="relative group">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={16} />
                    <input 
                      required type="email" placeholder="example@mail.com"
                      className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pr-11 pl-4 outline-none focus:border-primary-600 transition-all font-bold text-sm dark:text-white text-left"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* الموضوع */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-tighter">موضوع الرسالة</label>
                <div className="relative group">
                  <Hash className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={16} />
                  <input 
                    required type="text" placeholder="ما الذي تريد مناقشته؟"
                    className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pr-11 pl-4 outline-none focus:border-primary-600 transition-all font-bold text-sm dark:text-white"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
              </div>

              {/* الرسالة */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-tighter">تفاصيل الرسالة</label>
                <textarea 
                  required rows={4} placeholder="اكتب استفسارك هنا بكل وضوح..."
                  className="w-full bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl py-4 px-5 outline-none focus:border-primary-600 transition-all font-bold text-sm dark:text-white resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              {/* زر الإرسال */}
              <button 
                disabled={status === 'loading'}
                className="group relative w-full py-4 bg-primary-600 text-white rounded-[1.8rem] font-black text-sm shadow-lg shadow-primary-600/20 hover:bg-primary-700 transition-all flex items-center justify-center gap-3 overflow-hidden disabled:opacity-70"
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.div 
                      key="loading" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}
                      className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"
                    />
                  ) : (
                    <motion.div 
                      key="idle" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }}
                      className="flex items-center gap-2"
                    >
                      <span>إرسال الرسالة الآن</span>
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* الرسائل التوضيحية */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-2xl flex items-center gap-3 font-bold text-xs">
                    <CheckCircle2 size={18} /> تم إرسال رسالتك بنجاح! سنرد عليك في أقرب وقت.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-2xl flex items-center gap-3 font-bold text-xs">
                    <AlertCircle size={18} /> عذراً، حدث خطأ. حاول مجدداً أو تواصل معنا عبر الإيميل.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

      </div>

      {/* Label Footer */}
      <div className="text-center pt-4 opacity-20">
        <p className="text-[10px] font-black dark:text-white tracking-[0.3em] uppercase">Sentryk Support Network • 2026</p>
      </div>
    </div>
  );
}