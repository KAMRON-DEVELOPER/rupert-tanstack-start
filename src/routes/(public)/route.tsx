import Navbar from '@/pages/home/Navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Navbar />
      <main className='pt-12 md:pt-16'>
        <Outlet />
      </main>
    </div>
  );
}
