import { Outlet } from 'react-router-dom'

const UiLayout = () => {
    return (
        <>
            <main className="container mx-auto flex items-center justify-center">
                <Outlet />
            </main>
        </>
    )
}

export default UiLayout