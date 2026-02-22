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

  // Используем единую ширину для всех страниц
  const containerWidth = 'max-w-7xl';

  return (
    <nav className="w-full py-4 sm:py-5" aria-label="Хлебные крошки">
      <div className={`${containerWidth} mx-auto px-4 sm:px-6 md:px-8 w-full`}>
        <ol className="flex items-center flex-wrap gap-2">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {crumb.active ? (
                <span className="text-[#2C1F14] font-semibold text-sm sm:text-base">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="group flex items-center gap-1.5 text-gray-600 hover:text-[#2C1F14] transition-colors text-sm sm:text-base font-medium"
                >
                  {index === 0 && (
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )}
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumbs;
