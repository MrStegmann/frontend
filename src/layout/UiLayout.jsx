import { Outlet } from 'react-router-dom'

const UiLayout = () => {
    return (
        <div className='w-full h-[100vh] bg-indigo-950'>
            <p className='text-white'>Menú</p>
            <main className="flex w-full h-full max-h-full overflow-auto container mx-auto items-start justify-center align-middle ">
                <Outlet />
            </main>
        </div>
    )
}

export default UiLayout