export interface StatusTagProps {
  status: string;
}

export default function StatusTag({ status }: StatusTagProps) {
  const statusColor = {
    done: "ui-bg-primary",
    "in Progress": "ui-bg-secondary",
    livestock: "ui-bg-primary",
    crop: "ui-bg-secondary",
    dairy: "ui-bg-secondary-light",
    waiting: "ui-bg-error",
  };
  const statusClass = statusColor[status] || "ui-bg-error";
  return (
    <div
      className={`ui-flex ui-items-center ui-w-[100px] ui-justify-center ${statusClass} ui-text-white ui-rounded-md ui-px-3 ui-py-2`}
    >
      <span className="ui-text-xs ui-font-bold">{status}</span>
    </div>
  );
}
