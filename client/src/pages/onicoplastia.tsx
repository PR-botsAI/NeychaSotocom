import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Case } from "@db/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Onicoplastia() {
  const [selectedImage, setSelectedImage] = useState<"before" | "after" | "collage">("before");

  const { data: cases = [] } = useQuery<Case[]>({
    queryKey: ["/api/cases", { category: "onicoplastia" }],
  });

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Onicoplastia Profesional
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Transformamos uñas dañadas en uñas saludables y hermosas. 
          Explora nuestros casos reales y descubre el poder de la Onicoplastia.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Galería de Transformaciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((case_) => (
            <Card key={case_.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{case_.title}</CardTitle>
                <CardDescription>{case_.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="before" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="before">Antes</TabsTrigger>
                    <TabsTrigger value="after">Después</TabsTrigger>
                    <TabsTrigger value="collage">Collage</TabsTrigger>
                  </TabsList>
                  <TabsContent value="before">
                    <img
                      src={`/${case_.beforeImage}`}
                      alt="Antes del tratamiento"
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </TabsContent>
                  <TabsContent value="after">
                    <img
                      src={`/${case_.afterImage}`}
                      alt="Después del tratamiento"
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </TabsContent>
                  <TabsContent value="collage">
                    <img
                      src={`/${case_.collageImage}`}
                      alt="Collage del proceso"
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-6">
          ¿Lista para transformar tus uñas?
        </h2>
        <a
          href="https://booksy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <Button size="lg" className="text-lg">
            ¡Reserva tu Cita Ahora!
          </Button>
        </a>
      </section>
    </div>
  );
}