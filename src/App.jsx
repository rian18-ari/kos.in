import { Outlet } from 'react-router';
import Dashboard from './pages/dashboard/page';

function App() {
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* sidebar */}
      <aside className='w-1/6 h-screen bg-gray-100 border-r-4 border-black overflow-y-auto'>

        {/* top box */}
        <div className='h-25 border-b-4 border-gray-800 bg-gray-300 flex items-center p-2'>
          <h1 className='w-1/2'>
            logo
          </h1>
          <div className='flex flex-col item-start w-1/2'>
            <h1 className='text-2xl font-bold ml-2'>kos-in</h1>
            <h4 className='text-sm'>kos management</h4>
          </div>
        </div>

        {/* jenis kos */}
        <div className='border-t-2 border-l-2 border-b-4 border-r-4 bg-gray-300 border-gray-800 m-4 p-2 rounded-md'>
          <div className='flex justify-between items-center'>
            <h3>
              Kos Aktif
            </h3>
            <button className='text-2xl font-bold'>+</button>
          </div>
          <div>
            <h1>
              Kos tipe A1
            </h1>
          </div>
        </div>

        {/* menu */}
        <div className='mx-6 mt-6 h-120'>
          <h1 className='my-4 text-sm'>
            <a href='#' className='text-xl font-semibold'>
              Dashboard
            </a>
          </h1>
          <h1 className='my-4 text-sm'>
            <a href="#" className='text-xl font-semibold'>
              Kamar & Penghuni
            </a>
          </h1>
          <h1 className='my-4 text-sm'>
            <a href="" className='text-xl font-semibold'>
              Meteran & Penggunaan
            </a>
          </h1>
          <h1 className='my-4 text-sm'>
            <a href="" className='text-xl font-semibold'>
              Komplain
            </a>
          </h1>
          <h1 className='my-4 text-sm'>
            <a href="" className='text-xl font-semibold'>
              Laporan
            </a>
          </h1>
        </div>

        {/* bulan operasional */}
        <div className='border-t-2 border-black bg-gray-300 h-25 p-4'>
          <div className='border-t-2 border-l-2 border-r-4 border-b-4 border-black bg-white rounded-md p-2 flex'>
            <div className='w-5/6'>
              <h3>Bulan Operasional</h3>
              <p className='font-bold text-md'>Oktober 2026</p>
            </div>
            <div className='w-1/6 flex items-center justify-center ml-2'>
              <i class="fa-solid fa-calendar-days text-3xl"></i>
            </div>
          </div>
        </div>
      </aside>

      <main className='w-5/6 h-screen flex flex-col'>

        {/* top bar */}
        <nav className='h-25 border-b-4 border-black w-full bg-gray-100 flex flex-row items-center justify-end'>
          <div className='w-15 h-15 bg-gray-500 rounded-lg border-black border-t-2 border-l-2 border-b-4 border-r-4 m-4 flex justify-center items-center'>
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className='w-15 h-15 bg-gray-500 rounded-lg border-black border-t-2 border-l-2 border-b-4 border-r-4 m-4 flex justify-center items-center'>
            <i class="fa-regular fa-bell"></i>
          </div>
          <div className='h-14 w-4 border-black border-l-4'>
          </div>

          <div className='flex flex-row items-center p-4'>
            <div className='mr-4'>
              <h1 className='font-semibold text-xl'>Nama Pengelola</h1>
              <h3 className='text-sm'>Owner Kos</h3>
            </div>
            <div className='w-15 h-15 bg-gray-500 rounded-full border-black border-2 '></div>
          </div>
        </nav>

        {/* main content */}
        <div className='flex-1 overflow-y-auto'>
          <Dashboard/>
        </div>
      </main>
    </div>
  );
}

export default App;
