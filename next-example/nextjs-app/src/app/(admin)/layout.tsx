const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-green-300 p-4">
      <div>管理者Layout</div>
      {children}
    </div>
  )
}

export default AdminLayout