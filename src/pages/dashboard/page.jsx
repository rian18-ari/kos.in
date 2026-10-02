export default function Dashboard() {
        return (
                <div className="p-8 items-center flex flex-col overflow-hidden">
                        {/* card section */}
                        <div className='h-70 w-full flex items-center justify-between'>

                                {/* card okupansi */}
                                <div className="w-60 h-60 border-t-2 border-b-4 border-r-4 border-l-2 border-black rounded-xl p-4">
                                        <div className="flex justify-between">
                                                <h1 className='font-bold text-md'>Tingkat Okupansi</h1>
                                                <div className="w-13 h-13 border-black border-t-2 border-l-2 border-r-4 border-b-4 bg-gray-300 rounded-xl">
                                                        kasur
                                                </div>
                                        </div>
                                        <h2 className="text-5xl font-medium">18/<span className="text-3xl">20</span> </h2>
                                </div>
                                <div className="w-60 h-60 border-t-2 border-b-4 border-r-4 border-l-2 border-black rounded-xl p-4">
                                        <div className="flex justify-between">
                                                <h1 className='font-bold text-md'>Total Tagihan</h1>
                                                <div className="w-13 h-13 border-black border-t-2 border-l-2 border-r-4 border-b-4 bg-gray-300 rounded-xl">
                                                        duid
                                                </div>
                                        </div>
                                        <h2 className="text-xl font-medium">Rp 100.000.000</h2>
                                </div>
                                <div className="w-60 h-60 border-t-2 border-b-4 border-r-4 border-l-2 border-black rounded-xl p-4">
                                        <div className="flex justify-between">
                                                <h1 className='font-bold text-md'>Pemakaian Listrik</h1>
                                                <div className="w-13 h-13 border-black border-t-2 border-l-2 border-r-4 border-b-4 bg-gray-300 rounded-xl">
                                                        listrik
                                                </div>
                                        </div>
                                </div>
                                <div className="w-60 h-60 border-t-2 border-b-4 border-r-4 border-l-2 border-black rounded-xl p-4 bg-amber-300">
                                        <div className="flex justify-between">
                                                <h1 className='font-bold text-md'>Komplain & Masalah</h1>
                                                <div className="w-13 h-13 border-black border-t-2 border-l-2 border-r-4 border-b-4 bg-red-300 rounded-xl">
                                                        danger
                                                </div>
                                        </div>
                                </div>
                        </div>

                        {/* graphics */}
                        <div className="w-full h-100 border-black border-t-2 border-l-2 border-b-4 border-r-4 rounded-xl p-4 mt-10">
                                <div className="flex justify-between">
                                        <div>
                                                <h1 className="font-bold text-lg">Grafik Pemakaian Utilitas</h1>
                                                <p>Periode Aktif 1 - 30 September 2026</p>
                                        </div>
                                        <div className="w-70 h-15 border-black border-t-2 border-l-2 border-b-4 border-r-4 rounded-lg p-2 bg-gray-300 flex">
                                                <div className="w-1/2 h-full border-black border-t-2 border-l-2 border-b-4 border-r-4 rounded-lg bg-emerald-600 flex items-center justify-center">
                                                <button className="font-bold">KWh</button>
                                                </div>

                                                <div className="w-1/2 h-full flex items-center justify-center">
                                                <button className="font-bold">Air (m3)</button>
                                                </div>
                                        </div>
                                </div>
                                <hr className='h-0.5 border-black bg-black mt-4'/>

                        </div>
                </div>
        );
}