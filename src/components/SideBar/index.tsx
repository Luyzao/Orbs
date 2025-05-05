// src/components/Sidebar.tsx
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { label: "Dashboard", icon: "pi pi-th-large", path: "/dashboard" },
    { label: "Educação", icon: "pi pi-book", path: "/educacao" },
    { label: "Metas", icon: "pi pi-wallet", path: "/" },
    { label: "Análises", icon: "pi pi-chart-bar", path: "/analises" },
  ];

  return (
    <aside className="w-60 h-screen bg-gray shadow-md flex flex-col p-6 justify-between">
      <div>
      <div className="flex items-center justify-center mb-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Orbs</h1>
      </div>
        <ul className="space-y-6">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${
                router.pathname === item.path
                  ? "bg-[#f0f0ff] font-semibold" // fundo suave opcional
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              style={router.pathname === item.path ? { color: "#1E195B" } : {}}
              onClick={() => router.push(item.path)}
            >

              <i className={item.icon}></i>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="flex items-center text-red-500 mt-10">
        <i className="pi pi-sign-out mr-2"></i>
        Sair
      </button>
    </aside>
  );
};

export default Sidebar;
