import Navbar from '@/pages/home/Navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(apps)')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Navbar />
      <main className='pt-12 md:pt-14'>
        <Outlet />
      </main>
    </div>
  );
}
