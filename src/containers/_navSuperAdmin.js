export const navSuperAdmin = [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Home',
        to: '/home',
        icon: 'cil-home'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Data Administrator',
        to: '/administrator',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Tambah Administrator',
        to: '/administrator/tambah',
        icon: 'cil-user'
      }
    ]
  }
]

export default navSuperAdmin