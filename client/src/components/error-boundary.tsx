import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QueryError } from "@/lib/queryClient";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private getErrorMessage(error: Error): string {
    if (error instanceof QueryError) {
      if (error.status === 404) {
        return "No se encontró el recurso solicitado";
      }
      if (error.status === 429) {
        return "Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde";
      }
      if (error.status >= 500) {
        return "Error del servidor. Por favor, inténtalo de nuevo más tarde";
      }
      return error.message;
    }
    return error.message || "Ha ocurrido un error inesperado";
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6">
              <div className="flex mb-4 gap-2">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <h2 className="text-2xl font-bold text-destructive">
                  {this.state.error instanceof QueryError ? "Error de Conexión" : "Error Inesperado"}
                </h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {this.getErrorMessage(this.state.error!)}
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
              >
                Intentar de nuevo
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}