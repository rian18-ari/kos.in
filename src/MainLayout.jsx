import { NavLink, Outlet } from "react-router";
import { supabase } from "./lib/SupabaseClient";
import { useEffect, useState } from "react";

export default function MainLayout() {
    const [selectedKos, setSelectedKos] = useState(null);

    useEffect(() => {
        async function dataKos() {
            const { data, error } = await supabase
                .from('properties')
                .select('name')

            if (error) {
                alert(error.message)
            }
            if (data) {
                console.log('data berhasil di dapat : ', data)
                setSelectedKos(data[0])
            }
        }

        dataKos();
    }, [])
    const [activeTab, setActiveTab] = useState('complaints');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white text-slate-900 border-4 border-black select-none">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r-2 border-black flex flex-col justify-between shrink-0 h-full">
                <div className="flex flex-col">
                    {/* Top Header / Logo */}
                    <div className="h-20 border-b-2 border-black flex items-center px-4 gap-3 bg-white">
                        <div className="w-9 h-9 rounded-xl bg-[#00685f] border-2 border-black flex items-center justify-center text-white shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="font-extrabold text-[15px] tracking-wider text-black leading-tight">KOSTRACK</h1>
                            <p className="text-[11px] font-semibold text-slate-500 leading-tight">Utility Tracker</p>
                        </div>
                    </div>

                    {/* Active Property Dropdown Card */}
                    <div className="p-4 relative">
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="border-2 border-black rounded-xl p-2.5 bg-white flex items-center justify-between shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-slate-50 transition active:translate-y-0.5"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className="text-teal-800">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-500 leading-none">Properti Aktif</p>
                                    <p className="text-xs font-bold text-black mt-1 leading-none">{selectedKos?.name}</p>
                                </div>
                            </div>
                            <div className="text-slate-700">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m7 15 5 5 5-5" />
                                    <path d="m7 9 5-5 5 5" />
                                </svg>
                            </div>
                        </div>

                        {/* Dropdown Options */}
                        {isDropdownOpen && (
                            <div className="absolute left-4 right-4 top-18 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] z-30 py-1.5 overflow-hidden">
                                {['Kos Putri A', 'Kos Putra B', 'Kos Paviliun C'].map((kos) => (
                                    <button
                                        key={kos}
                                        onClick={() => {
                                            setSelectedKos(kos);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-xs font-bold transition flex items-center justify-between ${selectedKos === kos ? 'bg-teal-50 text-teal-800' : 'hover:bg-slate-100 text-slate-800'
                                            }`}
                                    >
                                        <span>{kos}</span>
                                        {selectedKos === kos && (
                                            <span className="w-2 h-2 rounded-full bg-[#00685f]"></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="px-3 space-y-1.5">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${ isActive ? 'bg-[#00685f] text-white border-2 border-black shadow-[2px_2px_0px_#000]' : 'text-slate-700 hover:bg-slate-100 font-semibold'
                                }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/kamar-penghuni"
                            className={({ isActive }) => `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${isActive
                                ? 'bg-[#00685f] text-white border-2 border-black shadow-[2px_2px_0px_#000]'
                                : 'text-slate-700 hover:bg-slate-100 font-semibold'
                                }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 4v16" />
                                <path d="M2 8h18a2 2 0 0 1 2 2v10" />
                                <path d="M2 17h20" />
                                <path d="M6 8v9" />
                            </svg>
                            <span>Kamar & Penghuni</span>
                        </NavLink>

                        <NavLink
                            to="/tagihan-meteran"
                            className={({ isActive }) => `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${isActive
                                ? 'bg-[#00685f] text-white border-2 border-black shadow-[2px_2px_0px_#000]'
                                : 'text-slate-700 hover:bg-slate-100 font-semibold'
                                }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                            <span>Tagihan & Meteran</span>
                        </NavLink>

                        <NavLink
                            to="/komplain"
                            className={({ isActive }) => `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${isActive
                                ? 'bg-[#00685f] text-white border-2 border-black shadow-[2px_2px_0px_#000]'
                                : 'text-slate-700 hover:bg-slate-100 font-semibold'
                                }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                            </svg>
                            <span>Komplain</span>
                        </NavLink>

                        <NavLink
                            to="/laporan"
                            className={({ isActive }) => `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${isActive
                                ? 'bg-[#00685f] text-white border-2 border-black shadow-[2px_2px_0px_#000]'
                                : 'text-slate-700 hover:bg-slate-100 font-semibold'
                                }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" x2="18" y1="20" y2="10" />
                                <line x1="12" x2="12" y1="20" y2="4" />
                                <line x1="6" x2="6" y1="20" y2="14" />
                            </svg>
                            <span>Laporan</span>
                        </NavLink>
                    </nav>
                </div>

                {/* Operational Cycle Box at bottom */}
                <div className="p-4 border-t-2 border-black bg-white">
                    <div className="border-2 border-black rounded-xl p-3 bg-white flex items-center justify-between shadow-[2px_2px_0px_#000]">
                        <div>
                            <p className="text-[11px] font-semibold text-slate-500 leading-tight">Siklus Operasional</p>
                            <p className="text-sm font-extrabold text-[#00685f] mt-0.5 leading-tight">Maret 2025</p>
                        </div>
                        <div className="text-slate-800">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                            </svg>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
                {/* Top Navbar */}
                <header className="h-20 border-b-2 border-black px-6 flex items-center justify-between bg-white shrink-0">
                    {/* Left status & period pills */}
                    <div className="flex items-center gap-3">
                        {/* Sistem Online pill */}
                        <div className="border-2 border-black rounded-full px-3.5 py-1.5 bg-white flex items-center gap-2 text-xs font-bold text-slate-800 shadow-[1px_1px_0px_#000]">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                            <span>SISTEM ONLINE</span>
                        </div>

                        {/* Periode pill */}
                        <div className="border-2 border-black rounded-xl px-3.5 py-1.5 bg-white flex items-center gap-2 text-xs font-bold text-slate-800 shadow-[1px_1px_0px_#000]">
                            <svg className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                            </svg>
                            <span>Periode: 1 – 31 Mar 2025</span>
                        </div>
                    </div>

                    {/* Right controls: search, notification, profile */}
                    <div className="flex items-center gap-3">
                        {/* Search Button */}
                        <button
                            title="Cari"
                            className="w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center bg-white hover:bg-slate-50 shadow-[2px_2px_0px_#000] cursor-pointer active:translate-y-0.5 transition"
                        >
                            <svg className="w-4 h-4 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </button>

                        {/* Notification Button */}
                        <button
                            title="Notifikasi"
                            className="w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center bg-white hover:bg-slate-50 shadow-[2px_2px_0px_#000] cursor-pointer relative active:translate-y-0.5 transition"
                        >
                            <svg className="w-4 h-4 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                            </svg>
                            {/* Red dot badge */}
                            <span className="w-2.5 h-2.5 bg-red-600 rounded-full absolute top-1.5 right-1.5 border border-black"></span>
                        </button>

                        {/* Vertical Divider */}
                        <div className="h-8 w-[2px] bg-black mx-1"></div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-1">
                            <div className="text-right">
                                <h2 className="text-xs font-bold text-black leading-tight">Pak Agung</h2>
                                <p className="text-[11px] text-slate-500 font-medium leading-tight">Pengelola Kos</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-slate-100 shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                                    alt="Pak Agung"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '<div class="w-full h-full bg-[#00685f] text-white flex items-center justify-center font-bold text-xs">PA</div>';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Main View */}
                <main className="flex-1 overflow-y-auto p-6 bg-white">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

