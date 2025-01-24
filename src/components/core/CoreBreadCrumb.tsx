'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import Link from 'next/link';
import { tr } from '@/utils';

function CoreBreadCrumb() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split('/').filter(segment => segment !== '');

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      const label = tr(segment.charAt(0).toUpperCase() + segment.slice(1));

      return {
        label,
        path
      };
    });
  }, [pathname]);

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumbs size='sm' variant='solid'>
      {breadcrumbs.map(breadcrumb => (
        <BreadcrumbItem key={breadcrumb.path}>
          <Link href={breadcrumb.path}>{breadcrumb.label}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

export default CoreBreadCrumb;
