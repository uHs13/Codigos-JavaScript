class MenuOptions {

    static getMenuOptions() {

        return [
            {
                title: 'Tela Inicial',
                href: '/admin/main',
                icon: 'home',
                id: 'main'
            },
            {
                title: 'Menu',
                href: '/admin/menus',
                icon: 'cutlery',
                id: 'menus'
            },
            {
                title: 'Reservas',
                href: '/admin/reservations',
                icon: 'calendar-check-o',
                id: 'reservations'
            },
            {
                title: 'Contatos',
                href: '/admin/contacts',
                icon: 'comments',
                id: 'contacts'
            },
            {
                title: 'Usuarios',
                href: '/admin/users',
                icon: 'users',
                id: 'users'
            },
            {
                title: 'Emails',
                href: '/admin/emails',
                icon: 'envelope',
                id: 'emails'
            }
        ];

    }
    // .buildMenuOptions

}
// .MenuOptions

module.exports = MenuOptions;