import logo from "../assets/Orbs.png"

export default function Sidebar({children}) {
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-betrween items-center">
                        <img src={logo} className="w-32" />
                    </div>

                </nav>

            </aside>
        </>
    )
}