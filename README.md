# Rupert Frontend (Tanstack Start)

Follow the [Build a Project from Scratch](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch) instruction.

Setup new Project

```bash
mkdir rupert-tanstack-start && cd rupert-tanstack-start
npm init -y
```

Update configuration files

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "node .output/server/index.mjs",
  },
  "type": "module",
}
```

Install dependencies

```bash
npm i react react-dom nitro @tanstack/react-start @tanstack/react-router @tanstack/react-query @tanstack/react-router-devtools @tanstack/react-query-devtools

npm i -D vite @vitejs/plugin-react typescript @types/react @types/react-dom @types/node
```

Setup TypeScript

```bash
npx tsc --init
````

For Tailwind follow [Install Tailwind CSS with TanStack Start](https://tailwindcss.com/docs/installation/framework-guides/tanstack-start)

```bash
npm install tailwindcss @tailwindcss/vite
touch src/styles.css
echo "@import 'tailwindcss';" >> src/styles.css
```

For Shadcn follow [Install and configure shadcn/ui for TanStack Start](https://ui.shadcn.com/docs/installation/tanstack)

Run the shadcn init command to set up shadcn/ui in your project.

```bash
npx shadcn@latest init
# or
npx shadcn@latest init -t start --base radix

npx shadcn@latest add card sidebar button input textarea separator label slider select switch dialog alert-dialog chart progress tooltip collapsible badge popover calendar dropdown-menu tabs alert accordion avatar
```

Additional packages

```bash
npm i axios axios-cookiejar-support tough-cookie
npm install zod
npm install react-hook-form
npm i next-themes
npm i sonner
npm i motion
npm i jwt-decode
npm i react-icons
npm i @icons-pack/react-simple-icons
```
