export default function InfoItem({
  label,
  value,
  compact,
}: {
  label: string;
  value?: string | number | null;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-default-200/60 bg-default-50/40 px-4 ${
        compact ? "py-3" : "py-4"
      }`}
    >
      <p className="text-xs font-medium text-default-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">
        {value ? String(value) : "Not provided"}
      </p>
    </div>
  );
}
