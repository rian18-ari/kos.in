import React, { useState } from 'react';

export default function TagihanMeteran() {
  const [activeMode, setActiveMode] = useState('tagihan'); // 'tagihan' or 'meteran'
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('September 2026');

  // Bills dataset matching screenshot
  const billsData = [
    {
      id: 'INV-2609-01',
      periode: 'Sep 2026',
      kamar: 'A-01',
      lantaiTipe: 'Lt. 1 • Deluxe',
      penghuni: {
        nama: 'Ahmad',
        inisial: 'AH',
        avatarBg: 'bg-teal-100 text-teal-800',
        telepon: '+62 812-3490-881',
      },
      rincian: {
        sewaPokok: 'Rp 1.100.000',
        listrik: { kwh: 50, tarif: 'Rp2.000', total: 'Rp 100.000' },
        air: { m3: 4, tarif: 'Rp12.500', total: 'Rp 50.000' },
      },
      total: 'Rp 1.250.000',
      status: 'Lunas',
      keteranganStatus: 'Dibayar 08 Sep',
      isOverdue: false,
      jatuhTempoText: null,
    },
    {
      id: 'INV-2609-02',
      periode: 'Sep 2026',
      kamar: 'A-02',
      lantaiTipe: 'Lt. 1 • Standar',
      penghuni: {
        nama: 'Budi',
        inisial: 'BD',
        avatarBg: 'bg-red-100 text-red-700',
        telepon: '+62 821-7740-192',
      },
      rincian: {
        sewaPokok: 'Rp 1.000.000',
        listrik: { kwh: 45, tarif: 'Rp2.000', total: 'Rp 90.000' },
        air: { m3: 3, tarif: 'Rp13.333', total: 'Rp 40.000' },
      },
      total: 'Rp 1.130.000',
      status: 'Terlambat',
      keteranganStatus: 'Telat 5 hari',
      isOverdue: true,
      jatuhTempoText: 'Jatuh tempo: 05 Sep',
    },
    {
      id: 'INV-2609-03',
      periode: 'Sep 2026',
      kamar: 'A-03',
      lantaiTipe: 'Lt. 1 • Deluxe',
      penghuni: {
        nama: 'Dewi',
        inisial: 'DW',
        avatarBg: 'bg-amber-100 text-amber-800',
        telepon: '+62 856-1120-093',
      },
      rincian: {
        sewaPokok: 'Rp 1.100.000',
        listrik: { kwh: 40, tarif: 'Rp2.000', total: 'Rp 80.000' },
        air: { m3: 4, tarif: 'Rp12.500', total: 'Rp 50.000' },
      },
      total: 'Rp 1.230.000',
      status: 'Belum Bayar',
      keteranganStatus: 'Sisa 5 hari',
      isOverdue: false,
      jatuhTempoText: 'Jatuh tempo: 15 Sep',
    },
  ];

  // Filter logic
  const filteredBills = billsData.filter((b) => {
    if (filterStatus === 'Belum Bayar') return b.status === 'Belum Bayar';
    if (filterStatus === 'Lunas') return b.status === 'Lunas';
    if (filterStatus === 'Terlambat') return b.status === 'Terlambat';
    return true;
  }).filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return b.kamar.toLowerCase().includes(q) || b.penghuni.nama.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-5 pb-8 select-none">
      {/* 1. TOP 4 SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Total Tagihan Periode */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">
              TOTAL TAGIHAN PERIODE
            </span>
            <div className="text-teal-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h10" />
                <path d="M7 12h10" />
                <path d="M7 17h6" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs font-semibold text-slate-500 leading-none">Rp</p>
            <h2 className="text-3xl font-extrabold text-black tracking-tight leading-none mt-1">
              22.450.000
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>18 Kamar Terbit Tagihan</span>
          </div>
        </div>

        {/* Card 2: Status Pembayaran */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">
              STATUS PEMBAYARAN
            </span>
            <div className="text-teal-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-[#00685f] leading-none">16</span>
            <span className="text-xs font-semibold text-slate-600">/ 18 Lunas (88%)</span>
          </div>
          <div className="mt-3">
            <div className="w-full h-2.5 bg-slate-100 rounded-full border border-black overflow-hidden flex">
              <div className="h-full bg-[#00685f] rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: Tunggakan Berjalan */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider leading-none">
              TUNGGAKAN BERJALAN
            </span>
            <div className="text-red-600">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-2xl xl:text-3xl font-extrabold text-[#dc2626] tracking-tight leading-none">
              Rp 2.360.000
            </h2>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="border border-red-300 bg-red-100 text-red-600 px-2 py-0.5 rounded-lg text-xs font-bold leading-tight">
              2 Tertunggak
            </span>
            <span className="text-[11px] text-slate-600 font-medium leading-tight">
              1 Perlu Follow-up
            </span>
          </div>
        </div>

        {/* Card 4: Konsumsi Listrik & Air */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">
              KONSUMSI LISTRIK & AIR
            </span>
            <div className="text-blue-600">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 12-4-4-4 4" />
                <path d="M12 16V8" />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-2xl font-extrabold text-black tracking-tight leading-none">
              845 <span className="text-xs font-medium text-slate-600">kWh</span> • 68 <span className="text-xs font-medium text-slate-600">m³</span>
            </h2>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Catat Terakhir: 10 Sep 2026</span>
            <div className="text-right leading-none">
              <span className="text-slate-500 font-medium block">Lengkap</span>
              <span className="text-emerald-600 font-bold block mt-0.5">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MODE TABS & ACTION BUTTONS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode Toggle (Tagihan vs Meteran Utilitas) */}
        <div className="border-2 border-black rounded-xl p-1 bg-[#eef2f6] flex gap-1 shadow-[1px_1px_0px_#000]">
          <button
            onClick={() => setActiveMode('tagihan')}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              activeMode === 'tagihan'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            <svg className="w-4 h-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h10" />
              <path d="M7 12h10" />
              <path d="M7 17h6" />
            </svg>
            <span>Tagihan (18)</span>
          </button>
          <button
            onClick={() => setActiveMode('meteran')}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              activeMode === 'meteran'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-black'
            }`}
          >
            <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Meteran Utilitas</span>
          </button>
        </div>

        {/* Right: Period Dropdown, + Input Meteran Cepat, Export Excel */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Periode Dropdown */}
          <div className="border-2 border-black rounded-xl px-3.5 py-1.5 bg-white flex items-center gap-2 text-xs font-bold text-slate-900 shadow-[1px_1px_0px_#000] cursor-pointer hover:bg-slate-50 transition">
            <svg className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span>Periode: <span className="font-extrabold">{selectedPeriod}</span></span>
            <svg className="w-3.5 h-3.5 text-slate-700 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* + Input Meteran Cepat */}
          <button
            onClick={() => alert('Membuka modal Input Meteran Cepat serentak')}
            className="bg-[#00685f] hover:bg-[#00524b] text-white border-2 border-black rounded-xl px-4 py-1.5 font-bold text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer active:translate-y-0.5 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="16" />
              <line x1="8" x2="16" y1="12" y2="12" />
            </svg>
            <span>+ Input Meteran Cepat</span>
          </button>

          {/* Export Excel */}
          <button
            onClick={() => alert('Mengekspor data tagihan ke format Excel (.xlsx)...')}
            className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-black rounded-xl px-4 py-1.5 font-bold text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer active:translate-y-0.5 transition"
          >
            <svg className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* 3. FILTER STATUS PILLS & SEARCH INPUT */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['Semua (18)', 'Belum Bayar (2)', 'Lunas (16)', 'Terlambat (2)'].map((st) => {
            const rawStatus = st.split(' ')[0];
            const isActive = filterStatus === rawStatus || (st.startsWith('Semua') && filterStatus === 'Semua');

            return (
              <button
                key={st}
                onClick={() => setFilterStatus(rawStatus)}
                className={`px-4 py-1.5 rounded-full font-bold text-xs border-2 border-black shadow-[1px_1px_0px_#000] cursor-pointer transition active:translate-y-0.5 ${
                  isActive
                    ? 'bg-[#00685f] text-white'
                    : 'bg-[#eef2f6] hover:bg-slate-200 text-slate-800'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kamar atau penghuni..."
            className="w-full bg-[#eef2f6] border-2 border-black rounded-xl py-1.5 pl-9 pr-4 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white shadow-[1px_1px_0px_#000] transition"
          />
        </div>
      </div>

      {/* 4. MAIN BILLS TABLE (DAFTAR TAGIHAN) */}
      <div className="border-2 border-black rounded-2xl bg-white shadow-[2px_2px_0px_#000] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#f8fafc] text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-5">PERIODE</th>
                <th className="py-3 px-4">KAMAR</th>
                <th className="py-3 px-4">PENGHUNI</th>
                <th className="py-3 px-6">KOMPONEN RINCIAN TAGIHAN</th>
                <th className="py-3 px-6 text-right">TOTAL TAGIHAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50 transition">
                  {/* Periode & ID / Jatuh Tempo */}
                  <td className="py-4 px-5 align-top">
                    <p className="font-extrabold text-xs text-slate-900 leading-tight">{bill.periode}</p>
                    {bill.jatuhTempoText ? (
                      <p className={`text-[11px] font-bold mt-1 leading-tight ${
                        bill.isOverdue ? 'text-red-600' : 'text-slate-500'
                      }`}>
                        {bill.jatuhTempoText}
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-500 font-medium mt-1 leading-tight">
                        ID: #{bill.id}
                      </p>
                    )}
                  </td>

                  {/* Kamar Box */}
                  <td className="py-4 px-4 align-top">
                    <div className="border border-slate-300 rounded-xl px-3 py-1.5 bg-[#f0f9ff] text-center inline-block shadow-sm">
                      <span className="font-extrabold text-sm text-slate-900 block leading-tight">
                        {bill.kamar}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block leading-tight mt-0.5">
                        {bill.lantaiTipe}
                      </span>
                    </div>
                  </td>

                  {/* Penghuni */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${bill.penghuni.avatarBg}`}>
                        {bill.penghuni.inisial}
                      </span>
                      <div>
                        <p className="font-bold text-xs text-slate-900 leading-tight">
                          {bill.penghuni.nama}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                          {bill.penghuni.telepon}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Komponen Rincian Tagihan */}
                  <td className="py-4 px-6 align-top">
                    <div className="space-y-1 max-w-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block"></span>
                          Sewa Pokok:
                        </span>
                        <span className="font-bold text-slate-900">{bill.rincian.sewaPokok}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block"></span>
                          Listrik ({bill.rincian.listrik.kwh} kWh @ {bill.rincian.listrik.tarif}):
                        </span>
                        <span className="font-bold text-slate-900">{bill.rincian.listrik.total}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-700 flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>
                          Air PAM ({bill.rincian.air.m3} m³ @ {bill.rincian.air.tarif}):
                        </span>
                        <span className="font-bold text-slate-900">{bill.rincian.air.total}</span>
                      </div>
                    </div>
                  </td>

                  {/* Total Tagihan & Status */}
                  <td className="py-4 px-6 align-top text-right">
                    <p className={`text-base font-extrabold leading-tight ${
                      bill.isOverdue ? 'text-[#dc2626]' : 'text-slate-900'
                    }`}>
                      {bill.total}
                    </p>
                    <p className={`text-xs font-semibold leading-tight mt-1 ${
                      bill.isOverdue
                        ? 'text-red-600 font-bold'
                        : bill.status === 'Lunas'
                        ? 'text-emerald-600'
                        : 'text-slate-600'
                    }`}>
                      {bill.keteranganStatus}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="bg-[#f8fafc] px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Menampilkan 3 dari 18 total tagihan unit aktif
          </span>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 text-slate-400 bg-white border border-slate-200 rounded-lg font-medium cursor-not-allowed"
              disabled
            >
              Sebelumnya
            </button>
            <span className="px-2 font-bold text-slate-900">1</span>
            <button
              onClick={() => alert('Halaman 2')}
              className="px-3 py-1 text-slate-700 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-100 cursor-pointer shadow-sm transition"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
