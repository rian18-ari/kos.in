import React, { useState } from 'react';

export default function Komplain() {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState('TK-2026-0901');
  const [noteContent, setNoteContent] = useState(
    'Sudah kontak teknisi Pak Slamet service AC langganan, estimasi datang sore ini jam 16:00 WIB membawa pompa pembersih dan freon R32.'
  );

  // Tickets dataset
  const ticketsData = [
    {
      id: 'TK-2026-0901',
      judul: 'AC Rusak / Tidak Dingin',
      kamar: 'A-03',
      lantai: 'Lt. 1',
      penghuni: 'Dewi Lestari',
      telepon: '+62 813-8899-7766',
      kategori: 'Pendingin Ruangan (AC)',
      waktu: '10 September 2026, 08:30 WIB',
      waktuRelatif: '2 jam lalu',
      status: 'Belum Ditangani',
      statusBadge: 'Belum ditangani (Baru)',
      prioritas: 'Prioritas Normal',
      tingkatDarurat: 'Sedang',
      deskripsi:
        'Sejak tadi malam AC kamar A-03 berisik dan cuma keluar angin hawa panas, tidak dingin sama sekali. Ada tetesan air di bawah casing AC mengenai meja belajar.',
      ringkasan: 'AC hanya keluar angin saja dan netes air di dinding.',
      buktiFoto: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=700&auto=format&fit=crop&q=80',
      fotoLabel: 'Tetesan di casing bawah',
      unitKamar: {
        model: 'Daikin 0.5 PK',
        pembersihanTerakhir: '12 Juni 2026 (3 bln lalu)',
        servisStatus: 'Servis Rutin Aktif',
      },
    },
    {
      id: 'TK-2026-0902',
      judul: 'Keran Air Kamar Mandi Bocor',
      kamar: 'B-02',
      lantai: 'Lt. 2',
      penghuni: 'Rian',
      telepon: '+62 812-7788-9900',
      kategori: 'Plumbing & Sanitasi',
      waktu: '09 September 2026, 11:15 WIB',
      waktuRelatif: '9 Sep 2026',
      status: 'Diproses',
      statusBadge: 'Diproses',
      prioritas: 'Prioritas Tinggi',
      tingkatDarurat: 'Tinggi',
      deskripsi: 'Rempesan pipa wastafel terus mengalir ke lantai dan membuat licin.',
      ringkasan: 'Teknisi dipanggil • Jadwal 14:00 WIB',
      subRingkasan: 'Rempesan pipa wastafel terus mengalir ke lantai.',
      buktiFoto: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&auto=format&fit=crop&q=80',
      fotoLabel: 'Bocoran di leher keran',
      unitKamar: {
        model: 'Wastafel Toto Standard',
        pembersihanTerakhir: '10 Mei 2026 (4 bln lalu)',
        servisStatus: 'Perlu Penggantian Seal',
      },
    },
    {
      id: 'TK-2026-0903',
      judul: 'Lampu Utama Kamar Mati',
      kamar: 'A-05',
      lantai: 'Lt. 1',
      penghuni: 'Rizal',
      telepon: '+62 856-3344-5566',
      kategori: 'Kelistrikan',
      waktu: '08 September 2026, 19:40 WIB',
      waktuRelatif: '8 Sep 2026',
      status: 'Selesai',
      statusBadge: 'Selesai Ditangani',
      prioritas: 'Prioritas Rendah',
      tingkatDarurat: 'Rendah',
      deskripsi: 'Lampu LED utama kamar tiba-tiba redup dan mati saat dinyalakan.',
      ringkasan: 'Selesai diganti LED Philips 12W baru',
      subRingkasan: 'Teknisi internal kos sudah mengganti bohlam baru.',
      buktiFoto: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=700&auto=format&fit=crop&q=80',
      fotoLabel: 'Lampu terpasang normal',
      unitKamar: {
        model: 'Fitting E27 Plafon',
        pembersihanTerakhir: '08 Sep 2026',
        servisStatus: 'Selesai Diperbaiki',
      },
    },
  ];

  // Filtering
  const filteredTickets = ticketsData.filter((t) => {
    if (filterStatus === 'Baru') return t.status === 'Belum Ditangani';
    if (filterStatus === 'Diproses') return t.status === 'Diproses';
    if (filterStatus === 'Selesai') return t.status === 'Selesai';
    return true;
  }).filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.kamar.toLowerCase().includes(q) ||
      t.judul.toLowerCase().includes(q) ||
      t.penghuni.toLowerCase().includes(q)
    );
  });

  const selectedTicket = ticketsData.find((t) => t.id === selectedTicketId) || ticketsData[0];

  return (
    <div className="space-y-5 pb-8 select-none">
      {/* 1. TOP HEADER & OVERVIEW */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-extrabold text-teal-800 uppercase tracking-wider">
            <span>HELPDESK & MAINTENANCE</span>
            <span>•</span>
            <span>ID Unit Kos Putri A</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
            Manajemen Komplain & Tiket
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5 leading-tight">
            Pantau respon perbaikan fasilitas kamar secara real-time dan kelola riwayat teknisi.
          </p>
        </div>

        {/* Right Status Card & Button */}
        <div className="flex items-center gap-3">
          {/* Rata-rata Respon Card */}
          <div className="bg-[#ecfeff] border border-teal-200 rounded-xl px-3.5 py-1.5 flex items-center gap-2.5 shadow-sm">
            <div className="text-teal-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block leading-none">Rata-rata Respon</span>
              <span className="text-xs font-black text-teal-900 block mt-1 leading-none">1.8 Jam</span>
            </div>
          </div>

          {/* + Catat Tiket Manual */}
          <button
            onClick={() => alert('Membuka modal Form Catat Tiket Komplain Manual')}
            className="bg-[#00685f] hover:bg-[#00524b] text-white border-2 border-black rounded-xl px-4 py-2 font-bold text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer active:translate-y-0.5 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="16" />
              <line x1="8" x2="16" y1="12" y2="12" />
            </svg>
            <span>Catat Tiket Manual</span>
          </button>
        </div>
      </div>

      {/* 2. FILTER TABS & SEARCH INPUT */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Semua */}
          <button
            onClick={() => setFilterStatus('Semua')}
            className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              filterStatus === 'Semua'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Semua</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              filterStatus === 'Semua' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              7
            </span>
          </button>

          {/* Baru */}
          <button
            onClick={() => setFilterStatus('Baru')}
            className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              filterStatus === 'Baru'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-[#fee2e2] text-red-700 hover:bg-red-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block"></span>
            <span>Baru</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              filterStatus === 'Baru' ? 'bg-white/30 text-white' : 'bg-red-200 text-red-800'
            }`}>
              1
            </span>
          </button>

          {/* Diproses */}
          <button
            onClick={() => setFilterStatus('Diproses')}
            className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              filterStatus === 'Diproses'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-[#fef3c7] text-amber-900 hover:bg-amber-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>
            <span>Diproses</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              filterStatus === 'Diproses' ? 'bg-white/30 text-white' : 'bg-amber-200 text-amber-900'
            }`}>
              2
            </span>
          </button>

          {/* Selesai */}
          <button
            onClick={() => setFilterStatus('Selesai')}
            className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
              filterStatus === 'Selesai'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-[#e0e7ff] text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block"></span>
            <span>Selesai</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              filterStatus === 'Selesai' ? 'bg-white/30 text-white' : 'bg-indigo-200 text-indigo-800'
            }`}>
              4
            </span>
          </button>
        </div>

        {/* Search Input & Sorter */}
        <div className="flex items-center gap-2">
          <div className="relative min-w-[260px]">
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
              placeholder="Cari nomor kamar / keluhan..."
              className="w-full bg-[#f1f5f9] border border-slate-300 rounded-xl py-1.5 pl-9 pr-4 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white transition"
            />
          </div>

          <button
            title="Filter Lanjutan"
            className="w-9 h-9 bg-[#f1f5f9] hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center justify-center text-slate-700 cursor-pointer transition active:translate-y-0.5 shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="4" y1="21" y2="14" />
              <line x1="4" x2="4" y1="10" y2="3" />
              <line x1="12" x2="12" y1="21" y2="12" />
              <line x1="12" x2="12" y1="8" y2="3" />
              <line x1="20" x2="20" y1="21" y2="16" />
              <line x1="20" x2="20" y1="12" y2="3" />
              <line x1="1" x2="7" y1="14" y2="14" />
              <line x1="9" x2="15" y1="8" y2="8" />
              <line x1="17" x2="23" y1="16" y2="16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 3. MAIN SPLIT VIEW (LEFT: LIST OF REPORTS, RIGHT: DETAIL PANEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Daftar Laporan Terkini (5/12 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
              DAFTAR LAPORAN TERKINI
            </span>
            <span className="text-xs text-teal-700 font-bold">3 Ditampilkan</span>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {filteredTickets.map((t) => {
              const isSelected = selectedTicketId === t.id;
              const isNew = t.status === 'Belum Ditangani';
              const isProgress = t.status === 'Diproses';

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`rounded-2xl p-4 bg-white transition cursor-pointer shadow-sm hover:shadow border ${
                    isSelected
                      ? 'border-l-4 border-l-red-500 border-slate-300'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Top row status & timestamp */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isNew
                          ? 'bg-red-50 text-red-600'
                          : isProgress
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      • {t.statusBadge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {t.waktuRelatif}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-sm text-slate-900 mt-2 leading-tight">
                    {t.judul}
                  </h3>

                  {/* Room & Tenant */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium mt-1">
                    <svg className="w-3.5 h-3.5 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M9 3v18" />
                    </svg>
                    <span className="font-bold text-slate-900">Kamar {t.kamar}</span>
                    <span>•</span>
                    <span>{t.penghuni}</span>
                  </div>

                  {/* Preview / Schedule box */}
                  <div className="bg-[#f8fafc] rounded-xl p-2.5 mt-2.5 text-xs text-slate-700 leading-relaxed">
                    {isProgress ? (
                      <div>
                        <div className="flex items-center gap-1.5 text-amber-800 font-semibold mb-0.5">
                          <svg className="w-3.5 h-3.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                          </svg>
                          <span>{t.ringkasan}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 italic mt-0.5">"{t.subRingkasan}"</p>
                      </div>
                    ) : t.status === 'Selesai' ? (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>{t.ringkasan}</span>
                      </div>
                    ) : (
                      <p className="italic text-slate-600">"{t.ringkasan}"</p>
                    )}
                  </div>

                  {/* Bottom row: Emergency & Link */}
                  {isNew && (
                    <div className="flex items-center justify-between pt-2.5 mt-1">
                      <span className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                        <span>!</span>
                        <span>Tingkat Darurat: {t.tingkatDarurat}</span>
                      </span>
                      <span className="text-[11px] font-bold text-teal-700 flex items-center gap-0.5 hover:underline">
                        Buka Rincian
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Inventory Card: Stok Cadangan Rutin */}
          <div className="border border-slate-200 rounded-2xl p-3.5 bg-[#f0fdfa] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00685f] text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m7.5 4.27 9 5.15" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 leading-tight">
                  Stok Cadangan Rutin
                </h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                  Lampu, seal kran & sekring ready
                </p>
              </div>
            </div>

            <button
              onClick={() => alert('Membuka inventaris gudang perlengkapan')}
              className="text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Gudang</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Ticket Detail Panel (7/12 cols) */}
        <div className="lg:col-span-7">
          <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-4">
            {/* Header: Red Icon Box, Ticket Number, Title, Status */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#dc2626] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <line x1="9" x2="15" y1="9" y2="15" />
                    <line x1="15" x2="9" y1="9" y2="15" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-red-700 bg-red-100 px-2 py-0.5 rounded leading-none">
                      TIKET #{selectedTicket.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium leading-none">
                      • {selectedTicket.prioritas}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mt-1 leading-tight">
                    {selectedTicket.judul}
                  </h2>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                selectedTicket.status === 'Belum Ditangani'
                  ? 'bg-[#fee2e2] text-red-600'
                  : selectedTicket.status === 'Diproses'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                • {selectedTicket.status}
              </span>
            </div>

            {/* 2 Information Cards: Kamar & Kategori */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Card 1: Kamar & Penghuni */}
              <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                  KAMAR & PENGHUNI
                </span>
                <div className="flex items-center gap-2 mt-1.5 leading-none">
                  <span className="text-sm font-extrabold text-slate-900">
                    Kamar {selectedTicket.kamar}
                  </span>
                  <span className="bg-[#00685f] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                    {selectedTicket.lantai}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mt-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="font-bold text-slate-900">{selectedTicket.penghuni}</span>
                  <span className="text-[11px] text-slate-500">({selectedTicket.telepon})</span>
                </div>
              </div>

              {/* Card 2: Kategori & Waktu Pengajuan */}
              <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                  KATEGORI & WAKTU PENGAJUAN
                </span>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 mt-1.5 leading-tight">
                  <span className="text-teal-700">❄️</span>
                  <span>{selectedTicket.kategori}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mt-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{selectedTicket.waktu}</span>
                </div>
              </div>
            </div>

            {/* Deskripsi Keluhan Penghuni */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 mb-1.5">
                <svg className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="21" x2="3" y1="6" y2="6" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                  <line x1="17" x2="3" y1="18" y2="18" />
                </svg>
                <span>Deskripsi Keluhan Penghuni</span>
              </div>
              <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed font-medium">
                "{selectedTicket.deskripsi}"
              </div>
            </div>

            {/* Bukti Foto dari Penghuni & Data Unit */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                  <svg className="w-4 h-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span>Bukti Foto dari Penghuni</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">1 Lampiran Terverifikasi</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Photo Thumbnail */}
                <div className="md:col-span-8 relative rounded-xl overflow-hidden border border-slate-200 h-44 bg-slate-100">
                  <img
                    src={selectedTicket.buktiFoto}
                    alt="Bukti Kerusakan AC"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1">
                    <span>💧</span>
                    <span>{selectedTicket.fotoLabel}</span>
                  </div>
                </div>

                {/* Data Unit Kamar Box */}
                <div className="md:col-span-4 bg-[#f8fafc] border border-slate-200 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                      DATA UNIT KAMAR
                    </span>
                    <span className="text-xs font-extrabold text-slate-900 block mt-1.5 leading-tight">
                      {selectedTicket.unitKamar.model}
                    </span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-1">
                      Pembersihan terakhir:
                      <br />
                      <strong className="text-slate-700 font-semibold">{selectedTicket.unitKamar.pembersihanTerakhir}</strong>
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-teal-700 flex items-center gap-1 pt-2">
                    <svg className="w-3.5 h-3.5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>{selectedTicket.unitKamar.servisStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Catatan Penanganan (Internal Pengelola) */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 font-extrabold text-slate-900">
                  <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <span>Catatan Penanganan (Internal Pengelola)</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Tersimpan otomatis</span>
              </div>

              <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3">
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={3}
                  className="w-full bg-transparent text-xs text-slate-700 leading-relaxed font-medium focus:outline-none resize-none"
                />
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2 text-[11px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    Ditulis oleh: Pak Agung (08:45 WIB)
                  </span>
                  <button
                    onClick={() => alert('Catatan penanganan berhasil diperbarui!')}
                    className="font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
                  >
                    Perbarui Catatan
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* Hubungi via WA */}
              <a
                href={`https://wa.me/${selectedTicket.telepon.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#eef2f6] hover:bg-slate-200 text-slate-800 rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition active:translate-y-0.5"
              >
                <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>Hubungi Penghuni via WA</span>
              </a>

              {/* Ubah ke Diproses */}
              <button
                onClick={() => alert(`Tiket #${selectedTicket.id} diubah status menjadi Diproses!`)}
                className="bg-[#fef3c7] hover:bg-amber-200 text-amber-900 rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition active:translate-y-0.5"
              >
                <svg className="w-4 h-4 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span>Ubah ke Diproses</span>
              </button>

              {/* Tandai Selesai */}
              <button
                onClick={() => alert(`Tiket #${selectedTicket.id} ditandai Selesai!`)}
                className="bg-[#00685f] hover:bg-[#00524b] text-white rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition active:translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Tandai Selesai</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM TIPS CARD */}
      <div className="border border-teal-200 bg-[#f0fdfa] rounded-2xl p-4 flex items-start gap-3 shadow-sm">
        <div className="text-teal-700 shrink-0 mt-0.5">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        </div>
        <div>
          <h4 className="font-extrabold text-xs text-slate-900 leading-tight">
            Tips Pengelolaan Kos: Komplain Air & Listrik
          </h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Segera tangani keluhan AC dalam jangka waktu 1x24 jam untuk menjaga reputasi kos dan mempertahankan masa sewa penghuni jangka panjang.
          </p>
        </div>
      </div>
    </div>
  );
}
