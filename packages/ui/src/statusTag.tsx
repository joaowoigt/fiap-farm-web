export interface StatusTagProps {
  status: string;
}

export default function StatusTag({ status }: StatusTagProps) {
  const statusColor: { [key: string]: string } = {
    done: "ui-bg-primary",
    "in Progress": "ui-bg-secondary",
    livestock: "ui-bg-primary",
    crops: "ui-bg-secondary",
    dairy: "ui-bg-primary-light",
    waiting: "ui-bg-error",
    Concluído: "ui-bg-primary",
    "Em Progresso": "ui-bg-secondary",
    Pecuária: "ui-bg-primary",
    Cultura: "ui-bg-secondary",
    Laticínios: "ui-bg-primary-light",
    Aguardando: "ui-bg-error",
  };
  const statusTranslation: { [key: string]: string } = {
    done: "Concluído",
    "in Progress": "Em Progresso",
    livestock: "Pecuária",
    crops: "Cultura",
    dairy: "Laticínios",
    waiting: "Aguardando",
  };

  const translatedStatus = statusTranslation[status] || status;
  const statusClass =
    statusColor[status] || statusColor[translatedStatus] || "ui-bg-error";

  return (
    <div
      className={`ui-flex ui-items-center ui-w-[100px] ui-justify-center ${statusClass} ui-text-white ui-rounded-md ui-px-3 ui-py-2`}
    >
      <span className="ui-text-xs ui-font-bold">{translatedStatus}</span>
    </div>
  );
}
