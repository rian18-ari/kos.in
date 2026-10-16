import React, { useState } from 'react';

export default function KamarPenghuni() {
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('A-01');

  // Rooms dataset
  const roomsData = [
    {
      id: 'A-01',
      tipe: 'Deluxe',
      lantai: 'Lantai 1',
      ukuran: '3×4 m',
      status: 'Terisi',
      penghuni: {
        nama: 'Ahmad Fauzi',
        inisial: 'AF',
        avatarBg: 'bg-[#00685f] text-white',
        telepon: '+62 812-3456-7890',
        terverifikasi: true,
        tanggalMasuk: '10 Jan 2025',
        durasi: 'Sudah 8 bulan',
        jatuhTempo: '10 September 2026',
        siklus: 'Siklus Tahunan / Auto',
        hargaSewa: 'Rp1.250.000 / bln',
        fasilitas: 'Termasuk WiFi & Sampah',
      },
      tagihanStatus: {
        tanggal: '10 Sep',
        label: 'Lunas',
        isLunas: true,
      },
      meteran: {
        dicatat: '10 Sep 2025',
        listrik: '1.250',
        air: '32',
      },
      riwayatTagihan: [
        { judul: 'Tagihan Sep 2025', nominal: 'Rp1.250.000', status: 'Lunas 9 Sep' },
        { judul: 'Tagihan Agu 2025', nominal: 'Rp1.230.000 (Incl. kWh)', status: 'Lunas 10 Agu' },
      ],
    },
    {
      id: 'A-02',
      tipe: 'Standard',
      lantai: 'Lantai 1',
      ukuran: '3×3 m',
      status: 'Tunggakan',
      penghuni: {
        nama: 'Budi Santoso',
        inisial: 'BS',
        avatarBg: 'bg-slate-300 text-slate-800',
        telepon: '+62 813-9876-5432',
        terverifikasi: true,
        tanggalMasuk: '05 Mei 2024',
        durasi: 'Sudah 16 bulan',
        jatuhTempo: '05 September 2026',
        siklus: 'Siklus Bulanan',
        hargaSewa: 'Rp850.000 / bln',
        fasilitas: 'Kamar Mandi Dalam',
      },
      tagihanStatus: {
        tanggal: '5 Sep',
        label: 'Lewat 5 hari',
        isLunas: false,
      },
      meteran: {
        dicatat: '05 Sep 2025',
        listrik: '890',
        air: '24',
      },
      riwayatTagihan: [
        { judul: 'Tagihan Sep 2025', nominal: 'Rp850.000', status: 'Belum Lunas' },
        { judul: 'Tagihan Agu 2025', nominal: 'Rp850.000', status: 'Lunas 5 Agu' },
      ],
    },
    {
      id: 'A-03',
      tipe: 'Deluxe',
      lantai: 'Lantai 1',
      ukuran: '3×4 m',
      status: 'Terisi',
      penghuni: {
        nama: 'Dewi Lestari',
        inisial: 'DL',
        avatarBg: 'bg-indigo-100 text-indigo-700',
        telepon: '+62 821-4567-8901',
        terverifikasi: true,
        tanggalMasuk: '15 Feb 2025',
        durasi: 'Sudah 7 bulan',
        jatuhTempo: '15 September 2026',
        siklus: 'Siklus Bulanan',
        hargaSewa: 'Rp1.250.000 / bln',
        fasilitas: 'Termasuk WiFi & AC',
      },
      tagihanStatus: {
        tanggal: '15 Sep',
        label: '4 hari lagi',
        isLunas: true,
      },
      meteran: {
        dicatat: '15 Agu 2025',
        listrik: '1.120',
        air: '28',
      },
      riwayatTagihan: [
        { judul: 'Tagihan Agu 2025', nominal: 'Rp1.250.000', status: 'Lunas 14 Agu' },
      ],
    },
    {
      id: 'A-04',
      tipe: 'Standard',
      lantai: 'Lantai 1',
      ukuran: '3×3 m',
      status: 'Kosong',
      penghuni: null,
      tagihanStatus: {
        tanggal: '—',
        label: '—',
        isLunas: true,
      },
      meteran: {
        dicatat: '01 Sep 2025',
        listrik: '410',
        air: '12',
      },
      riwayatTagihan: [],
    },
    {
      id: 'B-01',
      tipe: 'Suite Balcon',
      lantai: 'Lantai 2',
      ukuran: '4×4 m',
      status: 'Terisi',
      penghuni: {
        nama: 'Citra Rahma',
        inisial: 'CR',
        avatarBg: 'bg-blue-100 text-blue-700',
        telepon: '+62 857-1122-3344',
        terverifikasi: true,
        tanggalMasuk: '12 Nov 2024',
        durasi: 'Sudah 10 bulan',
        jatuhTempo: '12 September 2026',
        siklus: 'Siklus Bulanan',
        hargaSewa: 'Rp1.650.000 / bln',
        fasilitas: 'Balkon Pribadi, AC, Water Heater',
      },
      tagihanStatus: {
        tanggal: '12 Sep',
        label: '1 hari lagi',
        isLunas: true,
      },
      meteran: {
        dicatat: '12 Agu 2025',
        listrik: '1.450',
        air: '36',
      },
      riwayatTagihan: [
        { judul: 'Tagihan Agu 2025', nominal: 'Rp1.650.000', status: 'Lunas 11 Agu' },
      ],
    },
  ];

  // Filtering
  const filteredRooms = roomsData.filter((r) => {
    if (filterStatus === 'Terisi') return r.status === 'Terisi';
    if (filterStatus === 'Kosong') return r.status === 'Kosong';
    if (filterStatus === 'Tunggakan') return r.status === 'Tunggakan';
    return true;
  }).filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const nama = r.penghuni ? r.penghuni.nama.toLowerCase() : '';
    return r.id.toLowerCase().includes(q) || nama.includes(q);
  });

  // Selected room details (fallback to first room)
  const selectedRoom = roomsData.find((r) => r.id === selectedRoomId) || roomsData[0];

  return (
    <div className="space-y-5 pb-8 select-none">
      {/* 1. TOP 4 SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Total Kapasitas */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">
              TOTAL KAPASITAS
            </p>
            <h2 className="text-3xl font-extrabold text-black mt-2 leading-none">
              20 <span className="text-sm font-semibold text-slate-500">Kamar</span>
            </h2>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#ecfeff] border-2 border-black flex items-center justify-center text-teal-800 shadow-[1px_1px_0px_#000] shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="16" height="20" x="4" y="2" rx="2" />
              <path d="M9 22v-4h6v4" />
              <path d="M8 6h.01" />
              <path d="M16 6h.01" />
              <path d="M8 10h.01" />
              <path d="M16 10h.01" />
              <path d="M8 14h.01" />
              <path d="M16 14h.01" />
            </svg>
          </div>
        </div>

        {/* Card 2: Tingkat Huni */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">
              TINGKAT HUNI (90%)
            </p>
            <h2 className="text-3xl font-extrabold text-[#00685f] mt-2 leading-none">
              18 <span className="text-sm font-semibold text-slate-500">Terisi</span>
            </h2>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#ecfeff] border-2 border-black flex items-center justify-center text-teal-700 shadow-[1px_1px_0px_#000] shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Card 3: Kamar Siap Huni */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-none">
              KAMAR SIAP HUNI
            </p>
            <h2 className="text-3xl font-extrabold text-[#b45309] mt-2 leading-none">
              02 <span className="text-sm font-semibold text-slate-500">Kosong</span>
            </h2>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#fef3c7] border-2 border-black flex items-center justify-center text-amber-700 shadow-[1px_1px_0px_#000] shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
              <path d="M2 20h20" />
              <circle cx="14" cy="12" r="1" />
            </svg>
          </div>
        </div>

        {/* Card 4: Tunggakan Aktif */}
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider leading-none">
              TUNGGAKAN AKTIF
            </p>
            <h2 className="text-3xl font-extrabold text-[#dc2626] mt-2 leading-none">
              02 <span className="text-sm font-semibold text-slate-500">Kamar</span>
            </h2>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#fee2e2] border-2 border-black flex items-center justify-center text-red-600 shadow-[1px_1px_0px_#000] shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" x2="12" y1="9" y2="13" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Semua */}
          <button
            onClick={() => setFilterStatus('Semua')}
            className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer transition active:translate-y-0.5 ${
              filterStatus === 'Semua'
                ? 'bg-[#00685f] text-white'
                : 'bg-white hover:bg-slate-100 text-slate-800'
            }`}
          >
            <span>Semua</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              filterStatus === 'Semua' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
            }`}>
              20
            </span>
          </button>

          {/* Terisi */}
          <button
            onClick={() => setFilterStatus('Terisi')}
            className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer transition active:translate-y-0.5 ${
              filterStatus === 'Terisi'
                ? 'bg-[#00685f] text-white'
                : 'bg-white hover:bg-slate-100 text-slate-800'
            }`}
          >
            <span>Terisi</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              filterStatus === 'Terisi' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
            }`}>
              18
            </span>
          </button>

          {/* Kosong */}
          <button
            onClick={() => setFilterStatus('Kosong')}
            className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer transition active:translate-y-0.5 ${
              filterStatus === 'Kosong'
                ? 'bg-[#00685f] text-white'
                : 'bg-white hover:bg-slate-100 text-slate-800'
            }`}
          >
            <span>Kosong</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              filterStatus === 'Kosong' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
            }`}>
              2
            </span>
          </button>

          {/* Tunggakan */}
          <button
            onClick={() => setFilterStatus('Tunggakan')}
            className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer transition active:translate-y-0.5 ${
              filterStatus === 'Tunggakan'
                ? 'bg-[#00685f] text-white'
                : 'bg-white hover:bg-slate-100 text-slate-800'
            }`}
          >
            <span>Tunggakan</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              filterStatus === 'Tunggakan' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'
            }`}>
              2
            </span>
          </button>
        </div>

        {/* Search Input & Sorter/Filter */}
        <div className="flex items-center gap-2 flex-1 max-w-md ml-auto">
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
              placeholder="Cari nama penghuni / no. kamar..."
              className="w-full bg-[#f1f5f9] border-2 border-black rounded-2xl py-2 pl-10 pr-4 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000] transition"
            />
          </div>

          <button
            title="Filter lanjutan"
            className="w-10 h-10 bg-[#f1f5f9] hover:bg-slate-200 border-2 border-black rounded-xl flex items-center justify-center text-slate-700 shadow-[2px_2px_0px_#000] cursor-pointer active:translate-y-0.5 transition shrink-0"
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

      {/* 3. MAIN CONTENT: 2 COLUMNS (TABLE & DETAIL PANEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Daftar Kamar & Notice (7/12 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Table Card */}
          <div className="border-2 border-black rounded-2xl p-5 bg-white shadow-[2px_2px_0px_#000]">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="text-teal-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                  </svg>
                </div>
                <h2 className="font-extrabold text-base text-slate-900 leading-none">Daftar Kamar</h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">Menampilkan 5 dari 20 kamar</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-2">KAMAR</th>
                    <th className="py-3 px-2">TIPE/LANTAI</th>
                    <th className="py-3 px-2">PENGHUNI</th>
                    <th className="py-3 px-2">STATUS</th>
                    <th className="py-3 px-2">JATUH TEMPO</th>
                    <th className="py-3 px-2 text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold">
                  {filteredRooms.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    const isVacant = room.status === 'Kosong';
                    const isOverdue = room.status === 'Tunggakan';

                    return (
                      <tr
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`transition cursor-pointer hover:bg-slate-50 ${
                          isSelected ? 'bg-teal-50/70' : ''
                        }`}
                      >
                        {/* Kamar */}
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                isOverdue
                                  ? 'bg-red-600'
                                  : isVacant
                                  ? 'bg-slate-300'
                                  : 'bg-emerald-600'
                              }`}
                            ></span>
                            <span className="font-extrabold text-sm text-slate-900">{room.id}</span>
                          </div>
                        </td>

                        {/* Tipe / Lantai */}
                        <td className="py-3 px-2">
                          <p className="font-bold text-slate-800 leading-tight">{room.tipe}</p>
                          <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">{room.lantai}</p>
                        </td>

                        {/* Penghuni */}
                        <td className="py-3 px-2">
                          {room.penghuni ? (
                            <div className="flex items-center gap-2">
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${room.penghuni.avatarBg}`}>
                                {room.penghuni.inisial}
                              </span>
                              <span className="font-bold text-slate-900 truncate max-w-[110px]">
                                {room.penghuni.nama}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 font-medium">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-2">
                          {isOverdue ? (
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                              Tunggakan
                            </span>
                          ) : isVacant ? (
                            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-300 px-2 py-0.5 rounded-full text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              Kosong
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              Aktif
                            </span>
                          )}
                        </td>

                        {/* Jatuh Tempo */}
                        <td className="py-3 px-2">
                          {room.tagihanStatus.tanggal !== '—' ? (
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">{room.tagihanStatus.tanggal}</p>
                              <p className={`text-[11px] font-semibold leading-tight mt-0.5 ${
                                isOverdue ? 'text-red-600' : 'text-teal-700'
                              }`}>
                                {room.tagihanStatus.label}
                              </p>
                            </div>
                          ) : (
                            <span className="text-slate-400 font-medium">—</span>
                          )}
                        </td>

                        {/* Aksi Button */}
                        <td className="py-3 px-2 text-right">
                          {isVacant ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`Membuka form penambahan penghuni untuk Kamar ${room.id}`);
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 transition"
                            >
                              + Penghuni
                            </button>
                          ) : isOverdue ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`Kirim pengingat WhatsApp ke ${room.penghuni?.nama} (${room.id})`);
                              }}
                              className="w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-lg inline-flex items-center justify-center transition"
                              title="Kirim Peringatan"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" x2="11" y1="2" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                              </svg>
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRoomId(room.id);
                              }}
                              className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition ${
                                isSelected ? 'bg-[#00685f] text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                              title="Lihat Detail"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-3 text-xs">
              <span className="text-slate-500 font-medium">Halaman 1 dari 4</span>
              <div className="flex items-center gap-1.5">
                <button
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 cursor-not-allowed"
                  disabled
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#00685f] text-white font-bold flex items-center justify-center shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center transition">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-700 font-bold flex items-center justify-center transition">
                  3
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Notice Box below table */}
          <div className="border-2 border-black rounded-2xl p-4 bg-white shadow-[2px_2px_0px_#000] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 leading-none">
                Pemberitahuan Meteran Bulanan
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Pencatatan meteran serentak siklus September dijadwalkan tanggal 10. Pengingat WhatsApp otomatis akan terkirim saat tagihan disinkronkan.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Detail Panel for Selected Room (5/12 cols) */}
        <div className="lg:col-span-5">
          <div className="border-2 border-black rounded-2xl p-5 bg-white shadow-[2px_2px_0px_#000] space-y-4">
            {/* Header: Room Title, Status, Action icons */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-black leading-tight">
                    Kamar {selectedRoom.id}
                  </h2>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    selectedRoom.status === 'Terisi'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : selectedRoom.status === 'Tunggakan'
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-300'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      selectedRoom.status === 'Terisi'
                        ? 'bg-emerald-600'
                        : selectedRoom.status === 'Tunggakan'
                        ? 'bg-red-600'
                        : 'bg-slate-400'
                    }`}></span>
                    {selectedRoom.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-tight">
                  {selectedRoom.lantai} • Tipe {selectedRoom.tipe} ({selectedRoom.ukuran})
                </p>
              </div>

              {/* Action buttons (Edit & Key) */}
              <div className="flex items-center gap-1.5">
                <button
                  title="Edit Kamar"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer transition active:translate-y-0.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                </button>
                <button
                  title="Kunci & Akses"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 cursor-pointer transition active:translate-y-0.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7.5" cy="15.5" r="5.5" />
                    <path d="m21 2-9.6 9.6" />
                    <path d="m15.5 7.5 3 3L22 7l-3-3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tenant Card */}
            {selectedRoom.penghuni ? (
              <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white border-2 border-teal-600 rounded-full flex items-center justify-center font-extrabold text-teal-800 text-sm shadow-sm shrink-0">
                    {selectedRoom.penghuni.inisial}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                      {selectedRoom.penghuni.nama}
                    </h3>
                    <p className="text-[11px] text-teal-700 font-semibold flex items-center gap-1 mt-0.5 leading-tight">
                      <svg className="w-3.5 h-3.5 text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Terverifikasi KTP
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${selectedRoom.penghuni.telepon.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#075e54] hover:bg-[#128c7e] text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition active:translate-y-0.5"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold text-slate-500">Kamar saat ini belum dihuni.</p>
                <button className="mt-2 px-3 py-1.5 bg-[#00685f] text-white rounded-xl text-xs font-bold hover:bg-[#00524b] transition">
                  + Daftarkan Penghuni Baru
                </button>
              </div>
            )}

            {/* Room & Lease Detail Tiles (2x2 Grid) */}
            {selectedRoom.penghuni && (
              <div className="grid grid-cols-2 gap-2.5">
                {/* Tile 1: Nomor Telepon */}
                <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                    NOMOR TELEPON
                  </span>
                  <span className="text-xs font-bold text-slate-900 block mt-1.5 leading-tight">
                    {selectedRoom.penghuni.telepon}
                  </span>
                </div>

                {/* Tile 2: Harga Sewa */}
                <div className="bg-[#f0fdf4] border border-emerald-200 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                    HARGA SEWA
                  </span>
                  <span className="text-xs font-extrabold text-[#00685f] block mt-1.5 leading-tight">
                    {selectedRoom.penghuni.hargaSewa}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5 leading-none">
                    {selectedRoom.penghuni.fasilitas}
                  </span>
                </div>

                {/* Tile 3: Tanggal Masuk */}
                <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                    TANGGAL MASUK
                  </span>
                  <span className="text-xs font-bold text-slate-900 block mt-1.5 leading-tight">
                    {selectedRoom.penghuni.tanggalMasuk}
                  </span>
                  <span className="text-[10px] text-teal-700 font-bold block mt-0.5 leading-none">
                    {selectedRoom.penghuni.durasi}
                  </span>
                </div>

                {/* Tile 4: Jatuh Tempo Berikutnya */}
                <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                    JATUH TEMPO BERIKUTNYA
                  </span>
                  <span className="text-xs font-bold text-slate-900 block mt-1.5 leading-tight">
                    {selectedRoom.penghuni.jatuhTempo}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5 leading-none">
                    {selectedRoom.penghuni.siklus}
                  </span>
                </div>
              </div>
            )}

            {/* Meteran Utilitas Terakhir */}
            <div className="bg-[#f0fdfa] border border-teal-200 rounded-xl p-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-teal-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <svg className="w-4 h-4 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Meteran Utilitas Terakhir</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  Dicatat: {selectedRoom.meteran.dicatat}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                {/* Listrik */}
                <div className="flex items-center justify-between bg-white border border-teal-100 rounded-lg p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 text-sm">⚡</span>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block leading-none">Listrik</span>
                      <span className="text-sm font-extrabold text-black block mt-1 leading-none">
                        {selectedRoom.meteran.listrik} <span className="text-[10px] font-normal text-slate-500">kWh</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-teal-700">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="12" y2="8" />
                    </svg>
                  </div>
                </div>

                {/* Air PAM */}
                <div className="flex items-center justify-between bg-white border border-teal-100 rounded-lg p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-sm">💧</span>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block leading-none">Air PAM</span>
                      <span className="text-sm font-extrabold text-black block mt-1 leading-none">
                        {selectedRoom.meteran.air} <span className="text-[10px] font-normal text-slate-500">m³</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-blue-500">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12h20" />
                      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs: Riwayat Tagihan & Komplain */}
            <div>
              <div className="flex items-center gap-4 border-b border-slate-200 text-xs">
                <button className="font-extrabold text-[#00685f] border-b-2 border-[#00685f] pb-2 cursor-pointer">
                  Riwayat Tagihan
                </button>
                <button className="font-semibold text-slate-500 pb-2 hover:text-black cursor-pointer">
                  Komplain (0)
                </button>
              </div>

              {/* Tagihan list */}
              <div className="space-y-2 mt-3">
                {selectedRoom.riwayatTagihan.length > 0 ? (
                  selectedRoom.riwayatTagihan.map((t, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl p-2.5 flex items-center justify-between bg-white hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="text-teal-700">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M7 7h10" />
                            <path d="M7 12h10" />
                            <path d="M7 17h6" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900 leading-tight">{t.judul}</p>
                          <p className="text-[11px] text-slate-500 font-semibold leading-tight mt-0.5">{t.nominal}</p>
                        </div>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {t.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-2 text-center">Belum ada riwayat tagihan.</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => alert(`Catat meteran untuk Kamar ${selectedRoom.id}`)}
                  className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-black rounded-xl py-2 px-3 font-bold text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer active:translate-y-0.5 transition"
                >
                  <svg className="w-3.5 h-3.5 text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="16" />
                    <line x1="8" x2="16" y1="12" y2="12" />
                  </svg>
                  <span>+ Catat Meteran</span>
                </button>

                <button
                  onClick={() => alert(`Buat tagihan baru untuk Kamar ${selectedRoom.id}`)}
                  className="bg-[#00685f] hover:bg-[#00524b] text-white border-2 border-black rounded-xl py-2 px-3 font-bold text-xs flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer active:translate-y-0.5 transition"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                  <span>+ Buat Tagihan</span>
                </button>
              </div>

              {/* Kirim WhatsApp Pengingat Button */}
              <button
                onClick={() => {
                  if (selectedRoom.penghuni) {
                    alert(`Mengirim pengingat sewa WhatsApp ke ${selectedRoom.penghuni.nama}...`);
                  } else {
                    alert('Kamar ini belum memiliki penghuni.');
                  }
                }}
                className="w-full bg-[#f0fdf4] hover:bg-emerald-100 text-[#075e54] border border-emerald-300 rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition active:translate-y-0.5 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                </svg>
                <span>Kirim WhatsApp Pengingat Sewa / Utilitas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
