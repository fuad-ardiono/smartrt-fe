export const navUser =  [
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
        name: 'Perkawinan',
        to: '/perkawinan',
        icon: 'cil-people'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Ajukan Perkawinan',
        to: '/perkawinan/ajukan',
        icon: 'cil-file'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Perceraian',
        to: '/perceraian',
        icon: 'cil-people'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Ajukan Perceraian',
        to: '/perceraian/ajukan',
        icon: 'cil-file'
      }
    ]
  }
]

export default navUser