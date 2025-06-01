interface HeaderProps {
  sidebarCollapsed?: boolean
}

export function Header({ sidebarCollapsed = false }: HeaderProps) {
  return (
    <header
      className={`bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-30 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <div>Header</div>
        <div>User</div>
      </div>
    </header>
  )
}
