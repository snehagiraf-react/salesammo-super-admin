export const getPageTitle = (pathname) => {
    switch (pathname) {
        case '/':
            return 'Dashboard';
        case '/login':
            return 'Login';
        case '/categories':
            return 'Categories';
        case '/dashboard':
            return 'Dashboard';
        case '/users':
            return 'Users';
        case '/subscriptions':
            return 'Subscription';
        case '/folders':
            return 'Categories';
        case '/products':
            return 'Products';
        case '/industries':
            return 'Industries';
        case '/clients':
            return 'Clients';
        case '/tags':
            return 'Tags';
        case '/application-images':
            return 'Application Images';
        case '/analytics':
            return 'Analytics';
        case '/settings':
            return 'Settings';
        default:
            // Capitalize and prettify the last segment
            const last = pathname.split('/').filter(Boolean).pop();
            return last ? last.charAt(0).toUpperCase() + last.slice(1) : '';
    }
};
