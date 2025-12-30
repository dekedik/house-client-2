import { Link, useLocation, useParams } from 'react-router-dom';
import { packages } from '../data/packages';
import { projects } from '../data/projects';

function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  const pathname = location.pathname;

  // Не показываем на главной странице
  if (pathname === '/') {
    return null;
  }

  const getBreadcrumbs = () => {
    const crumbs = [
      { path: '/', label: 'Главная' }
    ];

    if (pathname.startsWith('/package/')) {
      const packageId = params.id;
      const pkg = packages.find(p => p.id === packageId);
      if (pkg) {
        crumbs.push({ path: `/package/${packageId}`, label: pkg.title, active: true });
      }
    } else if (pathname.startsWith('/project/')) {
      const projectId = parseInt(params.id);
      const project = projects.find(p => p.id === projectId);
      if (project) {
        crumbs.push({ path: `/project/${projectId}`, label: project.name, active: true });
      }
    } else if (pathname === '/contacts') {
      crumbs.push({ path: '/contacts', label: 'Контакты', active: true });
    } else if (pathname === '/about') {
      crumbs.push({ path: '/about', label: 'О компании', active: true });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4" aria-label="Хлебные крошки">
      <ol className="flex items-center text-sm sm:text-base">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">-</span>
            )}
            {crumb.active ? (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            ) : (
              <Link 
                to={crumb.path} 
                className="text-[#2C1F14] hover:text-[#3D2817] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;

