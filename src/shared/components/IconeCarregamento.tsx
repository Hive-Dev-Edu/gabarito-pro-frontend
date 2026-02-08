import { LoaderCircle } from "lucide-react";

interface IconeCarregamentoProps {
    w?: number;
    h?: number;
    color?: "white" | "black";
}

export default function IconeCarregamento({ w = 24, h = 24, color = "white" } : IconeCarregamentoProps) {
    return (
        <LoaderCircle className={`animate-spin w-${w} h-${h} text-${color}`} />
    );
}
