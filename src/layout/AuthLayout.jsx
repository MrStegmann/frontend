import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className='w-full h-[100vh] bg-indigo-950'>
            <main className="flex w-full h-full container mx-auto items-center justify-center align-middle">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout