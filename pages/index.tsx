import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="p-8 bg-white rounded shadow space-y-4">
        <h1 className="text-2xl font-bold">Sistema de Finanzas Actualizado</h1>
        <Button>Botón Shadcn</Button>
      </div>
    </main>
  );
}