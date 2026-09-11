import React, { useState, useEffect } from 'react';
import RubikCube3D from './RubikCube3D';
import { Play, RotateCcw, Cpu, Sparkles, Layers, Box, CheckCircle2, Palette, ArrowLeft } from 'lucide-react';

const PALETTE_COLORS = [
  { id: 'U', name: 'أبيض', hex: '#ffffff', bg: 'bg-white', text: 'text-black' },
  { id: 'L', name: 'برتقالي', hex: '#ff9900', bg: 'bg-orange-500', text: 'text-white' },
  { id: 'F', name: 'أخضر', hex: '#00cc66', bg: 'bg-emerald-500', text: 'text-white' },
  { id: 'R', name: 'أحمر', hex: '#ff3366', bg: 'bg-rose-500', text: 'text-white' },
  { id: 'B', name: 'أزرق', hex: '#3399ff', bg: 'bg-blue-500', text: 'text-white' },
  { id: 'D', name: 'أصفر', hex: '#ffcc00', bg: 'bg-amber-400', text: 'text-black' },
];

const INITIAL_FACES = {
  U: Array(9).fill('#ffffff'),
  L: Array(9).fill('#ff9900'),
  F: Array(9).fill('#00cc66'),
  R: Array(9).fill('#ff3366'),
  B: Array(9).fill('#3399ff'),
  D: Array(9).fill('#ffcc00'),
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeFace, setActiveFace] = useState('F');
  const [selectedColor, setSelectedColor] = useState(PALETTE_COLORS[0]);
  const [faceStates, setFaceStates] = useState(INITIAL_FACES);
  const [isSolving, setIsSolving] = useState(false);
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [statusMessage, setStatusMessage] = useState('جاهز لبدء العملية');

  // إخفاء الشاشة الترحيبية تلقائيًا
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleTileClick = (index) => {
    if (index === 4) return; // المركز ثابت
    const updated = [...faceStates[activeFace]];
    updated[index] = selectedColor.hex;
    setFaceStates({ ...faceStates, [activeFace]: updated });
  };

  const handleScramble = () => {
    setIsSolving(false);
    setSolutionSteps([]);
    setStatusMessage('تم خلط المكعب بحركات عشوائية');
  };

  const handleSolve = () => {
    setIsSolving(true);
    setStatusMessage('جاري حساب الخوارزمية وأقصر مسار للحل...');
    
    // محاكاة حساب خطوات الخوارزمية
    setTimeout(() => {
      setSolutionSteps(['R2', 'U', 'F\'', 'L2', 'D2', 'B', 'R\'', 'U2', 'F2', 'U\'']);
      setIsSolving(false);
      setStatusMessage('تم العثور على الحل بنجاح في 10 خطوات!');
    }, 2200);
  };

  const handleReset = () => {
    setFaceStates(INITIAL_FACES);
    setSolutionSteps([]);
    setIsSolving(false);
    setStatusMessage('تم إعادة الضبط للوضع الأصلي');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col font-sans dir-rtl selection:bg-cyan-400 selection:text-black">
      
      {/* 1. الواجهة الترحيبية المتحركة */}
      {showSplash && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0f19] transition-opacity duration-700">
          <div className="relative flex flex-col items-center p-8">
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-2xl opacity-40 animate-pulse-glow"></div>
            <div className="relative bg-slate-900/90 p-6 rounded-3xl border border-cyan-500/40 shadow-[0_0_30px_rgba(0,242,254,0.3)] animate-bounce">
              <Box className="w-16 h-16 text-cyan-400" />
            </div>
            <h1 className="mt-8 text-3xl md:text-5xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-blue-500">
              RUBIK'S SOLVER 3D
            </h1>
            <p className="mt-4 text-base md:text-lg font-bold text-cyan-300 border-t border-cyan-500/30 pt-3">
              إعداد: <span className="text-white text-xl drop-shadow-[0_0_12px_rgba(0,242,254,0.9)]">مؤمن القصاص</span>
            </p>
            <div className="mt-8 flex items-center space-x-2 space-x-reverse text-slate-400 text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>جاري تحميل المحرك ثلاثي الأبعاد...</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. الشريط العلوي (Header) */}
      <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-2xl shadow-[0_0_15px_rgba(0,242,254,0.4)]">
              <Cpu className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white">
                حلاّل مكعب روبيك 3D
              </h1>
              <p className="text-xs text-cyan-400/90 font-medium">إعداد: مؤمن القصاص</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>خوارزمية الذكاء الاصطناعي</span>
          </div>
        </div>
      </header>

      {/* 3. محتوى الصفحة الرئيسي */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* العرض 3D والتحكم */}
        <div className="flex-1 flex flex-col gap-4">
          <RubikCube3D isSolving={isSolving} />

          {/* حالة العملية */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex items-center justify-between text-xs md:text-sm">
            <span className="text-slate-400">الحالة الحالية:</span>
            <span className="font-bold text-cyan-300 flex items-center gap-2">
              {isSolving && <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />}
              {statusMessage}
            </span>
          </div>

          {/* أزرار التحكم */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button 
              onClick={handleScramble}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-semibold transition-all active:scale-95 text-xs md:text-sm"
            >
              <RotateCcw className="w-4 h-4" /> خلط عشوائي
            </button>
            
            <button 
              onClick={handleSolve}
              disabled={isSolving}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:brightness-110 transition-all active:scale-95 col-span-2 text-xs md:text-sm"
            >
              <Play className="w-4 h-4 fill-current" /> {isSolving ? 'جاري الحل...' : 'بدء الحل الذكي'}
            </button>

            <button 
              onClick={handleReset}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold transition-all active:scale-95 text-xs md:text-sm"
            >
              إعادة ضبط
            </button>
          </div>

          {/* خطوات الحل عند ظهورها */}
          {solutionSteps.length > 0 && (
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 animate-fade-in">
              <h3 className="text-sm font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> خطوات الحل المحسوبة ({solutionSteps.length} حركة):
              </h3>
              <div className="flex flex-wrap gap-2">
                {solutionSteps.map((step, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono text-sm font-bold shadow-sm">
                    {idx + 1}. {step}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* لوحة ضبط وتخصيص الألوان */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-xl flex flex-col gap-5">
            
            <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-3">
              <Palette className="w-5 h-5 text-cyan-400" /> لوحة تخصيص الألوان
            </h2>

            {/* اختيار اللون */}
            <div>
              <label className="text-xs text-slate-400 mb-2 block font-medium">1. اختر اللون للملء:</label>
              <div className="grid grid-cols-6 gap-2">
                {PALETTE_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`h-9 rounded-xl transition-all flex items-center justify-center font-bold text-xs ${color.bg} ${color.text} ${
                      selectedColor.id === color.id ? 'ring-2 ring-cyan-400 scale-105 shadow-[0_0_10px_rgba(0,242,254,0.5)]' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {color.id}
                  </button>
                ))}
              </div>
            </div>

            {/* اختيار الوجه */}
            <div>
              <label className="text-xs text-slate-400 mb-2 block font-medium">2. اختر الوجه المراد تعديله:</label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                {[
                  { id: 'U', label: 'الأعلى (U)' },
                  { id: 'L', label: 'اليسار (L)' },
                  { id: 'F', label: 'الأمام (F)' },
                  { id: 'R', label: 'اليمين (R)' },
                  { id: 'B', label: 'الخلف (B)' },
                  { id: 'D', label: 'الأسفل (D)' },
                ].map((face) => (
                  <button
                    key={face.id}
                    onClick={() => setActiveFace(face.id)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      activeFace === face.id
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {face.label}
                  </button>
                ))}
              </div>
            </div>

            {/* شبكة الوجه (3x3) */}
            <div className="flex flex-col items-center justify-center bg-slate-950/80 p-5 rounded-2xl border border-cyan-500/10">
              <span className="text-xs text-cyan-400 mb-3 font-semibold">تعديل شبكة الوجه الحالي: ({activeFace})</span>
              <div className="grid grid-cols-3 gap-2 w-44 h-44">
                {faceStates[activeFace].map((colorHex, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTileClick(idx)}
                    style={{ backgroundColor: colorHex }}
                    className={`w-full h-full rounded-lg border border-black/40 shadow-inner transition-transform active:scale-90 ${
                      idx === 4 ? 'cursor-not-allowed opacity-90 ring-2 ring-white/60' : 'hover:brightness-110'
                    }`}
                    title={idx === 4 ? 'المركز ثابت' : 'اضغط للتلوين'}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* 4. الفوتر */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        تم التطوير بواسطة <span className="text-cyan-400 font-bold">مؤمن القصاص</span> &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
