import React, { useEffect, useState } from 'react';
import { testConnection } from '../../lib/TestSupabase';
import { supabase } from '../../lib/SupabaseClient';

export default function Dashboard() {
  const [okupansi, setOkupansi] = useState(0);
  const [okupansiKamardiHuni, setOkupansiKamardiHuni] = useState(0);
  useEffect(() => {
    testConnection();

    async function okupansi() {
      const { count, error } = await supabase
        .from('rooms')
        .select('*', {count: 'exact', head: true})

        if(error){
          setOkupansi(0)
        } else {
          console.log('total data : ', count);      
          setOkupansi(count)
        }
    }
    
    async function okupansiKamardiHuni(){
            const {count, error} = await supabase
            .from('rooms')
            .select('*', {count: 'exact', head: true})
            .eq('status', 'occupied')
            
            if(error){
                    setOkupansiKamardiHuni(0)
                } else {
                        console.log('total data : ', count);      
                        setOkupansiKamardiHuni(count)
                }
        }
        
        
        okupansi();
        okupansiKamardiHuni();
  }, []);

  function persentaseOkupansi() {
    const total = okupansi;
    const kamardiHuni = okupansiKamardiHuni;

    const persentase = (kamardiHuni / total) * 100;
    return persentase;
  }

  const [activeUtility, setActiveUtility] = useState('electricity');
  const [hoveredDay, setHoveredDay] = useState(null);

  // Daily electricity usage for September 2026 (30 days)
  const dailyData = [
    { day: 1, kwh: 28 },
    { day: 2, kwh: 32 },
    { day: 3, kwh: 27 },
    { day: 4, kwh: 44 },
    { day: 5, kwh: 38 },
    { day: 6, kwh: 48 },
    { day: 7, kwh: 45 },
    { day: 8, kwh: 52 },
    { day: 9, kwh: 56 },
    { day: 10, kwh: 54 },
    { day: 11, kwh: 59 },
    { day: 12, kwh: 64 }, // Exceeds threshold (Red)
    { day: 13, kwh: 60 },
    { day: 14, kwh: 68 }, // Exceeds threshold (Red)
    { day: 15, kwh: 63 }, // Exceeds threshold (Red)
    { day: 16, kwh: 51 },
    { day: 17, kwh: 66 }, // Exceeds threshold (Red)
    { day: 18, kwh: 56 },
    { day: 19, kwh: 53 },
    { day: 20, kwh: 58 },
    { day: 21, kwh: 62 }, // Exceeds threshold (Red)
    { day: 22, kwh: 52 },
    { day: 23, kwh: 69 }, // Exceeds threshold (Red)
    { day: 24, kwh: 74 }, // Exceeds threshold (Red)
    { day: 25, kwh: 58 },
    { day: 26, kwh: 66 }, // Exceeds threshold (Red)
    { day: 27, kwh: 64 }, // Exceeds threshold (Red)
    { day: 28, kwh: 55 },
    { day: 29, kwh: 62 }, // Exceeds threshold (Red)
    { day: 30, kwh: 65 }, // Exceeds threshold (Red)
  ];

  const threshold = 60; // 60 kWh/kamar limit
  const chartHeight = 160;
  const maxKwh = 80;

  return (
    <div className="space-y-5 pb-8">
      {/* 1. Subheader Filter Bar */}
      <div className="border-2 border-black rounded-2xl p-2.5 px-4 bg-white flex flex-wrap items-center justify-between gap-3 shadow-[2px_2px_0px_#000]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Properti Terpilih Dropdown */}
          <div className="border-2 border-black rounded-xl px-3 py-1.5 bg-white flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 transition shadow-[1px_1px_0px_#000]">
            <div className="text-teal-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" />
                <path d="M9 22v-4h6v4" />
                <path d="M8 6h.01" />
                <path d="M16 6h.01" />
                <path d="M8 10h.01" />
                <path d="M16 10h.01" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block leading-none">Properti Terpilih</span>
              <span className="text-xs font-bold text-black flex items-center gap-1 mt-0.5 leading-none">
                Kos Putri A
                <svg className="w-3 h-3 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          {/* Total Kamar Pill */}
          <div className="border-2 border-black rounded-full px-3.5 py-1.5 bg-white text-xs font-bold text-slate-800 shadow-[1px_1px_0px_#000]">
            {okupansi} Total Kamar
          </div>

          {/* Periode Laporan Dropdown */}
          <div className="border-2 border-black rounded-xl px-3 py-1.5 bg-white flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 transition shadow-[1px_1px_0px_#000]">
            <div className="text-blue-600">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block leading-none">Periode Laporan</span>
              <span className="text-xs font-bold text-black flex items-center gap-1 mt-0.5 leading-none">
                September 2026
                <svg className="w-3 h-3 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Right Status & Action */}
        <div className="flex items-center gap-3">
          {/* Status Normal Pill */}
          <div className="border-2 border-black rounded-full px-4 py-1.5 bg-[#10b981] text-white flex items-center gap-2 text-xs font-black tracking-wide shadow-[1px_1px_0px_#000]">
            <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
            <span>SIKLUS BERJALAN NORMAL</span>
          </div>

          {/* Sinkronisasi Button */}
          <button className="border-2 border-black rounded-full px-4 py-1.5 bg-white hover:bg-slate-50 text-slate-900 flex items-center gap-2 text-xs font-bold cursor-pointer shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition">
            <svg className="w-3.5 h-3.5 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            <span>Sinkronisasi</span>
          </button>
        </div>
      </div>

      {/* 2. Summary Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Okupansi */}
        <div className="border-2 border-black rounded-2xl p-4 bg-white flex flex-col justify-between shadow-[2px_2px_0px_#000]">
          <div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold text-slate-600 tracking-wider uppercase">TINGKAT OKUPANSI</span>
              <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#ecfeff] flex items-center justify-center text-teal-800 shadow-[1px_1px_0px_#000]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4v16" />
                  <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                  <path d="M2 17h20" />
                  <path d="M6 8v9" />
                </svg>
              </div>
            </div>
            <div className="mt-1">
              <h2 className="text-4xl font-extrabold text-black tracking-tight leading-none">
                {okupansiKamardiHuni}<span className="text-2xl font-normal text-slate-500">/ {okupansi}</span>
              </h2>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-teal-800 font-bold">{persentaseOkupansi()}% Okupansi</span>
              <span className="text-slate-500 font-medium">2 Kamar Kosong</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full border-2 border-black overflow-hidden flex">
              <div className="h-full bg-[#14b8a6] rounded-full" style={{ width: `${persentaseOkupansi()}%` }}></div>
            </div>
          </div>
        </div>

        {/* Card 2: Tagihan Bulan Ini */}
        <div className="border-2 border-black rounded-2xl p-4 bg-white flex flex-col justify-between shadow-[2px_2px_0px_#000]">
          <div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold text-slate-600 tracking-wider uppercase">TAGIHAN BULAN INI</span>
              <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#eff6ff] flex items-center justify-center text-blue-600 shadow-[1px_1px_0px_#000]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
            </div>
            <div className="mt-1">
              <h2 className="text-2xl xl:text-3xl font-extrabold text-black tracking-tight leading-none">
                Rp3.250.000
              </h2>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-slate-700 font-medium">Rp2.800.000 Tertagih</span>
              </div>
              <span className="font-bold text-emerald-600">86%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                <span className="text-slate-700 font-medium">Rp450.000 Pending</span>
              </div>
              <span className="font-bold text-red-500">14%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pemakaian Listrik */}
        <div className="border-2 border-black rounded-2xl p-4 bg-white flex flex-col justify-between shadow-[2px_2px_0px_#000]">
          <div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold text-slate-600 tracking-wider uppercase">PEMAKAIAN LISTRIK</span>
              <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#fef3c7] flex items-center justify-center text-amber-700 shadow-[1px_1px_0px_#000]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
            </div>
            <div className="mt-1">
              <h2 className="text-3xl xl:text-4xl font-extrabold text-black tracking-tight leading-none">
                1.240 <span className="text-base font-bold text-slate-600">kWh</span>
              </h2>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="border-2 border-black rounded-xl px-2 py-0.5 bg-[#fee2e2] text-red-600 font-bold text-xs flex items-center gap-1 shadow-[1px_1px_0px_#000]">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span>+15% vs bln lalu</span>
            </div>
            <span className="text-xs font-medium text-slate-600">~68 kWh/kamar</span>
          </div>
        </div>

        {/* Card 4: Komplain Aktif */}
        <div className="border-2 border-black rounded-2xl p-4 bg-white flex flex-col justify-between shadow-[2px_2px_0px_#000]">
          <div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold text-slate-600 tracking-wider uppercase">KOMPLAIN AKTIF</span>
              <div className="w-10 h-10 border-2 border-black rounded-xl bg-[#fee2e2] flex items-center justify-center text-red-600 shadow-[1px_1px_0px_#000]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" x2="12" y1="9" y2="13" />
                  <line x1="12" x2="12.01" y1="17" y2="17" />
                </svg>
              </div>
            </div>
            <div className="mt-1">
              <h2 className="text-3xl xl:text-4xl font-extrabold text-black tracking-tight leading-none">
                3 <span className="text-base font-bold text-slate-600">tiket</span>
              </h2>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1.5 items-center">
            <div className="border-2 border-black bg-[#991b1b] text-white rounded-lg py-1 text-center font-bold text-xs shadow-[1px_1px_0px_#000]">
              <span className="block text-xs leading-none">1</span>
              <span className="text-[9px] font-medium leading-none">Baru</span>
            </div>
            <div className="border-2 border-black bg-[#fef3c7] text-amber-900 rounded-lg py-1 text-center font-bold text-xs shadow-[1px_1px_0px_#000]">
              <span className="block text-xs leading-none">2</span>
              <span className="text-[9px] font-medium leading-none">Diproses</span>
            </div>
            <div className="text-slate-500 rounded-lg py-1 text-center text-xs font-medium">
              <span className="block text-xs leading-none">0</span>
              <span className="text-[9px] leading-none">Selesai</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Grafik Pemakaian Utilitas Harian */}
      <div className="border-2 border-black rounded-2xl p-5 bg-white shadow-[2px_2px_0px_#000]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-teal-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" x2="18" y1="20" y2="10" />
                <line x1="12" x2="12" y1="20" y2="4" />
                <line x1="6" x2="6" y1="20" y2="14" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-black leading-none">
                GRAFIK PEMAKAIAN UTILITAS HARIAN
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-none">
                Periode aktif 1 – 30 September 2026
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <div className="border-2 border-black rounded-xl p-1 bg-white flex gap-1 shadow-[1px_1px_0px_#000]">
            <button
              onClick={() => setActiveUtility('electricity')}
              className={`rounded-lg px-3.5 py-1 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeUtility === 'electricity'
                  ? 'bg-[#00685f] text-white'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Listrik (kWh)</span>
            </button>
            <button
              onClick={() => setActiveUtility('water')}
              className={`rounded-lg px-3.5 py-1 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeUtility === 'water'
                  ? 'bg-[#00685f] text-white'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <span>Air (m³)</span>
            </button>
          </div>
        </div>

        {/* Legend strip */}
        <div className="border-t border-b border-slate-200 py-2.5 my-4 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-[#00685f] border-2 border-black rounded-sm inline-block"></span>
              <span className="font-semibold text-slate-800">September 2026 (1.240 kWh)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-dashed border-slate-600 bg-slate-50 rounded-sm inline-block"></span>
              <span className="font-medium text-slate-600">Bulan Lalu: 1.078 kWh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-0.5 bg-red-600 inline-block"></span>
              <span className="font-medium text-slate-600">Batas Rata-rata: 60 kWh/kamar</span>
            </div>
          </div>
          <div>
            <span className="text-slate-600 font-medium">Rata-rata Harian: </span>
            <span className="font-bold text-black">41.3 kWh/hari</span>
          </div>
        </div>

        {/* Interactive SVG Bar Chart */}
        <div className="relative pt-4 pb-2">
          {/* Tooltip on hover */}
          {hoveredDay && (
            <div
              className="absolute z-10 -top-2 bg-black text-white text-[11px] font-bold px-2 py-1 rounded shadow-md pointer-events-none transform -translate-x-1/2"
              style={{
                left: `${((hoveredDay.day - 0.5) / 30) * 100}%`,
              }}
            >
              Tgl {hoveredDay.day} Sep: {hoveredDay.kwh} kWh
            </div>
          )}

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 900 200"
              className="w-full h-48 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Threshold line at 60 kWh (chartHeight: 160, 60/80 = 75% -> y = 200 - 40 - (60/80)*140) */}
              {/* Y scale: 0 is at y=165, max 80 is at y=25. Height range = 140 */}
              {/* 60 kWh is at y = 165 - (60/80) * 140 = 165 - 105 = 60 */}
              <line
                x1="10"
                y1="60"
                x2="890"
                y2="60"
                stroke="#dc2626"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Bars */}
              {dailyData.map((d, index) => {
                const barWidth = 18;
                const gap = (900 - 20) / 30;
                const x = 15 + index * gap;
                const barHeight = (d.kwh / maxKwh) * 140;
                const y = 165 - barHeight;
                const isOver = d.kwh > threshold;

                return (
                  <g
                    key={d.day}
                    onMouseEnter={() => setHoveredDay(d)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className="cursor-pointer group"
                  >
                    {/* Shadow / outline bar */}
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="3"
                      ry="3"
                      fill={isOver ? '#dc2626' : '#0d9488'}
                      stroke="#000000"
                      strokeWidth="1.5"
                      className="transition-all duration-150 group-hover:opacity-85"
                    />
                  </g>
                );
              })}

              {/* Threshold badge at y=60 on the right */}
              <g transform="translate(730, 48)">
                <rect
                  x="0"
                  y="0"
                  width="155"
                  height="22"
                  rx="4"
                  fill="#fee2e2"
                  stroke="#dc2626"
                  strokeWidth="1"
                />
                <text
                  x="77.5"
                  y="15"
                  textAnchor="middle"
                  fill="#b91c1c"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="inherit"
                >
                  Ambang Batas (60 kWh/kmr)
                </text>
              </g>

              {/* Baseline */}
              <line x1="10" y1="165" x2="890" y2="165" stroke="#000000" strokeWidth="1.5" />
            </svg>
          </div>

          {/* X-axis date labels */}
          <div className="flex justify-between px-3 text-xs font-semibold text-slate-700 mt-1">
            <span>01 Sep</span>
            <span>05 Sep</span>
            <span>10 Sep</span>
            <span>15 Sep</span>
            <span>20 Sep</span>
            <span>25 Sep</span>
            <span>30 Sep</span>
          </div>
        </div>
      </div>

      {/* 4. Action / Urgent Attention Card (PERLU PERHATIAN SEGERA) */}
      <div className="border-2 border-black rounded-2xl p-5 bg-white shadow-[2px_2px_0px_#000]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border-2 border-black rounded-xl bg-amber-200 flex items-center justify-center text-amber-900 shadow-[1px_1px_0px_#000]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" x2="12" y1="9" y2="13" />
                <line x1="12" x2="12.01" y1="17" y2="17" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-black leading-none">
                PERLU PERHATIAN SEGERA
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1 leading-none">
                Prioritas operasional hari ini untuk Kos Putri A
              </p>
            </div>
          </div>

          {/* 3 Isu Kritis Badge */}
          <div className="border-2 border-black rounded-full px-3.5 py-1 bg-white text-xs font-bold text-slate-900 shadow-[1px_1px_0px_#000]">
            3 Isu Kritis
          </div>
        </div>

        {/* 3 Action Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
          {/* Column 1: 2 Kamar Menunggak */}
          <div className="border-2 border-black rounded-2xl p-4 bg-white flex flex-col justify-between shadow-[2px_2px_0px_#000]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
                  <h3 className="font-bold text-sm text-black">2 Kamar Menunggak</h3>
                </div>
                <span className="bg-[#b91c1c] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                  Penting
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Total tagihan tertahan: <span className="font-bold text-red-600">Rp1.600.000</span>
              </p>

              {/* Items */}
              <div className="space-y-2.5 mt-4">
                {/* Kamar A-02 */}
                <div className="border-2 border-black rounded-xl p-3 bg-white flex items-center justify-between shadow-[1px_1px_0px_#000]">
                  <div>
                    <h4 className="font-bold text-xs text-black">Kamar A-02</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Budi Santoso • Terlambat 5 hari
                    </p>
                  </div>
                  <span className="font-bold text-xs text-red-600">Rp850.000</span>
                </div>

                {/* Kamar B-04 */}
                <div className="border-2 border-black rounded-xl p-3 bg-white flex items-center justify-between shadow-[1px_1px_0px_#000]">
                  <div>
                    <h4 className="font-bold text-xs text-black">Kamar B-04</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Siti Rahma • Jatuh tempo hari ini
                    </p>
                  </div>
                  <span className="font-bold text-xs text-red-600">Rp750.000</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="mt-5 w-full bg-[#00685f] hover:bg-[#00534c] text-white border-2 border-black rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              <span>Kirim Pengingat WA Sekaligus</span>
            </button>
          </div>

          {/* Column 2: 3 Komplain Pemeliharaan */}
          <div className="border-2 border-black rounded-2xl p-4 bg-white flex flex-col justify-between shadow-[2px_2px_0px_#000]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-700 inline-block"></span>
                  <h3 className="font-bold text-sm text-black">3 Komplain Pemeliharaan</h3>
                </div>
                <span className="bg-[#78350f] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                  Tindakan
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Fasilitas operasional memerlukan teknisi:
              </p>

              {/* Items */}
              <div className="space-y-2 mt-4">
                {/* Kamar A-03 */}
                <div className="border-2 border-black rounded-xl p-2.5 bg-white flex items-center justify-between shadow-[1px_1px_0px_#000]">
                  <div className="flex items-center gap-2.5">
                    <div className="text-red-500">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-black">Kamar A-03</h4>
                      <p className="text-[11px] text-slate-500">AC tidak dingin / mati</p>
                    </div>
                  </div>
                  <span className="border border-red-500 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    Baru
                  </span>
                </div>

                {/* Kamar B-02 */}
                <div className="border-2 border-black rounded-xl p-2.5 bg-white flex items-center justify-between shadow-[1px_1px_0px_#000]">
                  <div className="flex items-center gap-2.5">
                    <div className="text-blue-500">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v6" />
                        <path d="m4.93 10.93 4.24-4.24" />
                        <path d="M2 18h20" />
                        <path d="M20 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-black">Kamar B-02</h4>
                      <p className="text-[11px] text-slate-500">Keran wastafel bocor</p>
                    </div>
                  </div>
                  <span className="border border-blue-400 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    Proses
                  </span>
                </div>

                {/* Kamar A-05 */}
                <div className="border-2 border-black rounded-xl p-2.5 bg-white flex items-center justify-between shadow-[1px_1px_0px_#000]">
                  <div className="flex items-center gap-2.5">
                    <div className="text-amber-500">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-black">Kamar A-05</h4>
                      <p className="text-[11px] text-slate-500">Lampu balkon putus</p>
                    </div>
                  </div>
                  <span className="border border-blue-400 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    Proses
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="mt-5 w-full bg-white hover:bg-slate-50 text-slate-900 border-2 border-black rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span>Jadwalkan Petugas</span>
            </button>
          </div>

          {/* Column 3: Lonjakan Beban Listrik */}
          <div className="border-2 border-black rounded-2xl p-4 bg-white flex flex-col justify-between shadow-[2px_2px_0px_#000]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                  <h3 className="font-bold text-sm text-black">Lonjakan Beban Listrik</h3>
                </div>
                <span className="bg-[#2563eb] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                  Anomali
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Pemakaian agregat melonjak +15% melebihi toleransi normal.
              </p>

              {/* Items */}
              <div className="space-y-2 mt-4">
                {/* Kamar A-01 */}
                <div className="border-2 border-black rounded-xl p-2.5 bg-white flex items-center justify-between shadow-[1px_1px_0px_#000]">
                  <div>
                    <h4 className="font-bold text-xs text-black">Kamar A-01</h4>
                    <p className="text-[11px] text-slate-500">124 kWh • 2.1× rata-rata</p>
                  </div>
                  <span className="border border-red-400 bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded">
                    +42%
                  </span>
                </div>

                {/* Kamar B-03 */}
                <div className="border-2 border-black rounded-xl p-2.5 bg-white flex items-center justify-between shadow-[1px_1px_0px_#000]">
                  <div>
                    <h4 className="font-bold text-xs text-black">Kamar B-03</h4>
                    <p className="text-[11px] text-slate-500">108 kWh • Indikasi pemanas/oven</p>
                  </div>
                  <span className="border border-red-400 bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded">
                    +35%
                  </span>
                </div>

                {/* Saran / Note Box */}
                <div className="border border-emerald-400 bg-emerald-50/70 rounded-xl p-2.5 flex items-start gap-2 text-slate-700">
                  <svg className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="16" y2="12" />
                    <line x1="12" x2="12.01" y1="8" y2="8" />
                  </svg>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    <span className="font-bold">Saran:</span> Hubungi penghuni untuk cek meteran individual atau beban alat elektronik tambahan.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="mt-4 w-full bg-white hover:bg-slate-50 text-slate-900 border-2 border-black rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="21" y2="21" />
                <path d="m4 14 4-4 3 3 5-5 4 4" />
              </svg>
              <span>Periksa Detail Meteran</span>
            </button>
          </div>
        </div>
      </div>


      <div>
        
      </div>
    </div>
  );
}