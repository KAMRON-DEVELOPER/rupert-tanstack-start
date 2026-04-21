import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(public)/(apps)/(work)/work/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/messages/"!</div>;
}
